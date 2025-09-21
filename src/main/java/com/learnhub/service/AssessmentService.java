package com.learnhub.service;

import com.learnhub.model.*;
import com.learnhub.repository.*;
import com.learnhub.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AssessmentService {

    @Autowired
    private AssessmentRepository assessmentRepository;

    @Autowired
    private AssessmentAttemptRepository attemptRepository;

    @Autowired
    private StudentAnswerRepository answerRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GamificationService gamificationService;

    public Page<Assessment> getAssessmentsForStudent(Pageable pageable) {
        return assessmentRepository.findByIsPublishedTrue(pageable);
    }

    public Page<Assessment> getAssessmentsForInstructor(Long instructorId, Pageable pageable) {
        return assessmentRepository.findByInstructorId(instructorId, pageable);
    }

    public Assessment getAssessmentById(Long id) {
        return assessmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));
    }

    public Assessment createAssessment(Assessment assessment) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        
        User instructor = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("Instructor not found"));
        
        assessment.setInstructor(instructor);
        return assessmentRepository.save(assessment);
    }

    public Assessment updateAssessment(Long id, Assessment assessmentDetails) {
        Assessment assessment = getAssessmentById(id);
        
        // Check if user is the instructor or admin
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        
        if (!assessment.getInstructor().getId().equals(userPrincipal.getId()) && 
            !userPrincipal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            throw new RuntimeException("You don't have permission to update this assessment");
        }
        
        assessment.setTitle(assessmentDetails.getTitle());
        assessment.setDescription(assessmentDetails.getDescription());
        assessment.setType(assessmentDetails.getType());
        assessment.setTimeLimit(assessmentDetails.getTimeLimit());
        assessment.setMaxAttempts(assessmentDetails.getMaxAttempts());
        assessment.setPassingScore(assessmentDetails.getPassingScore());
        assessment.setTotalPoints(assessmentDetails.getTotalPoints());
        assessment.setIsPublished(assessmentDetails.getIsPublished());
        assessment.setAvailableFrom(assessmentDetails.getAvailableFrom());
        assessment.setAvailableUntil(assessmentDetails.getAvailableUntil());
        
        return assessmentRepository.save(assessment);
    }

    public AssessmentAttempt startAssessment(Long assessmentId) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        
        Assessment assessment = getAssessmentById(assessmentId);
        User student = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        
        // Check if assessment is available
        LocalDateTime now = LocalDateTime.now();
        if (assessment.getAvailableFrom() != null && now.isBefore(assessment.getAvailableFrom())) {
            throw new RuntimeException("Assessment is not yet available");
        }
        if (assessment.getAvailableUntil() != null && now.isAfter(assessment.getAvailableUntil())) {
            throw new RuntimeException("Assessment is no longer available");
        }
        
        // Check attempt limit
        List<AssessmentAttempt> previousAttempts = attemptRepository.findByAssessmentIdAndStudentId(
                assessmentId, student.getId());
        
        if (assessment.getMaxAttempts() != null && 
            previousAttempts.size() >= assessment.getMaxAttempts()) {
            throw new RuntimeException("Maximum attempts exceeded");
        }
        
        // Check for existing in-progress attempt
        Optional<AssessmentAttempt> inProgressAttempt = previousAttempts.stream()
                .filter(attempt -> attempt.getStatus() == AttemptStatus.IN_PROGRESS)
                .findFirst();
        
        if (inProgressAttempt.isPresent()) {
            return inProgressAttempt.get();
        }
        
        // Create new attempt
        AssessmentAttempt attempt = new AssessmentAttempt(assessment, student, previousAttempts.size() + 1);
        return attemptRepository.save(attempt);
    }

    public void saveAnswer(Long attemptId, Long questionId, String answer, Long selectedOptionId) {
        AssessmentAttempt attempt = attemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Attempt not found"));
        
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        
        // Find or create student answer
        StudentAnswer studentAnswer = answerRepository.findByAttemptIdAndQuestionId(attemptId, questionId)
                .orElse(new StudentAnswer(attempt, question));
        
        studentAnswer.setTextAnswer(answer);
        if (selectedOptionId != null) {
            QuestionOption selectedOption = question.getOptions().stream()
                    .filter(option -> option.getId().equals(selectedOptionId))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Option not found"));
            studentAnswer.setSelectedOption(selectedOption);
        }
        
        answerRepository.save(studentAnswer);
    }

    public AssessmentAttempt submitAssessment(Long attemptId) {
        AssessmentAttempt attempt = attemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Attempt not found"));
        
        attempt.setSubmittedAt(LocalDateTime.now());
        attempt.setStatus(AttemptStatus.SUBMITTED);
        
        // Calculate time spent
        long timeSpent = ChronoUnit.MINUTES.between(attempt.getStartedAt(), attempt.getSubmittedAt());
        attempt.setTimeSpent((int) timeSpent);
        
        // Auto-grade objective questions
        autoGradeAttempt(attempt);
        
        return attemptRepository.save(attempt);
    }

    private void autoGradeAttempt(AssessmentAttempt attempt) {
        List<StudentAnswer> answers = answerRepository.findByAttemptId(attempt.getId());
        int totalScore = 0;
        int totalPossiblePoints = 0;
        boolean hasSubjectiveQuestions = false;
        
        for (StudentAnswer answer : answers) {
            Question question = answer.getQuestion();
            totalPossiblePoints += question.getPoints();
            
            if (question.getType() == QuestionType.MULTIPLE_CHOICE || 
                question.getType() == QuestionType.TRUE_FALSE) {
                
                // Auto-grade objective questions
                if (answer.getSelectedOption() != null && answer.getSelectedOption().getIsCorrect()) {
                    answer.setIsCorrect(true);
                    answer.setPointsEarned(question.getPoints());
                    totalScore += question.getPoints();
                } else {
                    answer.setIsCorrect(false);
                    answer.setPointsEarned(0);
                }
                answerRepository.save(answer);
                
            } else {
                // Mark subjective questions for manual grading
                hasSubjectiveQuestions = true;
            }
        }
        
        attempt.setScore(totalScore);
        if (!hasSubjectiveQuestions) {
            // Only calculate percentage if all questions are auto-graded
            attempt.setPercentage((double) totalScore / totalPossiblePoints * 100);
            attempt.setIsPassed(attempt.getPercentage() >= attempt.getAssessment().getPassingScore());
            attempt.setStatus(AttemptStatus.GRADED);
            attempt.setGradedAt(LocalDateTime.now());
            
            // Award points for assessment completion
            if (attempt.getIsPassed()) {
                gamificationService.addPoints(attempt.getStudent().getId(), 
                        totalScore, "Assessment passed: " + attempt.getAssessment().getTitle());
            }
        }
    }

    public AssessmentAttempt gradeSubjectiveQuestions(Long attemptId, List<StudentAnswer> gradedAnswers) {
        AssessmentAttempt attempt = attemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Attempt not found"));
        
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        
        User grader = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("Grader not found"));
        
        int totalScore = 0;
        int totalPossiblePoints = 0;
        
        // Update subjective answers and recalculate total score
        List<StudentAnswer> allAnswers = answerRepository.findByAttemptId(attemptId);
        
        for (StudentAnswer answer : allAnswers) {
            totalPossiblePoints += answer.getQuestion().getPoints();
            
            // Find graded answer if it exists
            Optional<StudentAnswer> gradedAnswer = gradedAnswers.stream()
                    .filter(ga -> ga.getId().equals(answer.getId()))
                    .findFirst();
            
            if (gradedAnswer.isPresent()) {
                answer.setPointsEarned(gradedAnswer.get().getPointsEarned());
                answer.setInstructorFeedback(gradedAnswer.get().getInstructorFeedback());
                answerRepository.save(answer);
            }
            
            totalScore += answer.getPointsEarned();
        }
        
        attempt.setScore(totalScore);
        attempt.setPercentage((double) totalScore / totalPossiblePoints * 100);
        attempt.setIsPassed(attempt.getPercentage() >= attempt.getAssessment().getPassingScore());
        attempt.setStatus(AttemptStatus.GRADED);
        attempt.setGradedAt(LocalDateTime.now());
        attempt.setGradedBy(grader);
        
        // Award points for assessment completion
        if (attempt.getIsPassed()) {
            gamificationService.addPoints(attempt.getStudent().getId(), 
                    totalScore, "Assessment passed: " + attempt.getAssessment().getTitle());
        }
        
        return attemptRepository.save(attempt);
    }

    public List<AssessmentAttempt> getStudentAttempts(Long studentId, Long assessmentId) {
        return attemptRepository.findByAssessmentIdAndStudentId(assessmentId, studentId);
    }

    public List<AssessmentAttempt> getAttemptsForGrading(Long instructorId) {
        return attemptRepository.findByAssessmentInstructorIdAndStatus(instructorId, AttemptStatus.SUBMITTED);
    }

    public AssessmentAttempt getAttemptWithAnswers(Long attemptId) {
        AssessmentAttempt attempt = attemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Attempt not found"));
        
        // Load answers
        List<StudentAnswer> answers = answerRepository.findByAttemptId(attemptId);
        attempt.setAnswers(answers.stream().collect(java.util.stream.Collectors.toSet()));
        
        return attempt;
    }
}