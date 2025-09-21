package com.learnhub.repository;

import com.learnhub.model.StudentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentAnswerRepository extends JpaRepository<StudentAnswer, Long> {
    
    List<StudentAnswer> findByAttemptId(Long attemptId);
    
    Optional<StudentAnswer> findByAttemptIdAndQuestionId(Long attemptId, Long questionId);
    
    List<StudentAnswer> findByQuestionId(Long questionId);
    
    List<StudentAnswer> findByAttemptIdAndIsCorrectTrue(Long attemptId);
    
    List<StudentAnswer> findByAttemptIdAndIsCorrectFalse(Long attemptId);
}