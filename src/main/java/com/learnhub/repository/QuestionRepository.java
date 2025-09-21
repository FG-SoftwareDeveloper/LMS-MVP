package com.learnhub.repository;

import com.learnhub.model.Question;
import com.learnhub.model.QuestionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    
    List<Question> findByAssessmentIdOrderByOrderIndexAsc(Long assessmentId);
    
    List<Question> findByAssessmentIdAndType(Long assessmentId, QuestionType type);
    
    @Query("SELECT COUNT(q) FROM Question q WHERE q.assessment.id = :assessmentId")
    Long countByAssessmentId(@Param("assessmentId") Long assessmentId);
    
    @Query("SELECT SUM(q.points) FROM Question q WHERE q.assessment.id = :assessmentId")
    Integer getTotalPointsByAssessmentId(@Param("assessmentId") Long assessmentId);
}