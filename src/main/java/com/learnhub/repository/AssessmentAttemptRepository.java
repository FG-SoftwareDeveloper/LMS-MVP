package com.learnhub.repository;

import com.learnhub.model.AssessmentAttempt;
import com.learnhub.model.AttemptStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssessmentAttemptRepository extends JpaRepository<AssessmentAttempt, Long> {
    
    List<AssessmentAttempt> findByAssessmentIdAndStudentId(Long assessmentId, Long studentId);
    
    List<AssessmentAttempt> findByStudentIdOrderByStartedAtDesc(Long studentId);
    
    @Query("SELECT aa FROM AssessmentAttempt aa WHERE aa.assessment.instructor.id = :instructorId AND aa.status = :status")
    List<AssessmentAttempt> findByAssessmentInstructorIdAndStatus(@Param("instructorId") Long instructorId, 
                                                                  @Param("status") AttemptStatus status);
    
    @Query("SELECT aa FROM AssessmentAttempt aa WHERE aa.assessment.id = :assessmentId ORDER BY aa.score DESC")
    List<AssessmentAttempt> findTopScoresByAssessmentId(@Param("assessmentId") Long assessmentId);
    
    @Query("SELECT AVG(aa.score) FROM AssessmentAttempt aa WHERE aa.assessment.id = :assessmentId AND aa.status = 'GRADED'")
    Double getAverageScoreByAssessmentId(@Param("assessmentId") Long assessmentId);
}