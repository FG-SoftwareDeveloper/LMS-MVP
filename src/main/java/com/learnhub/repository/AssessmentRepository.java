package com.learnhub.repository;

import com.learnhub.model.Assessment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
    
    Page<Assessment> findByIsPublishedTrue(Pageable pageable);
    
    Page<Assessment> findByInstructorId(Long instructorId, Pageable pageable);
    
    List<Assessment> findByCourseId(Long courseId);
    
    List<Assessment> findByLessonId(Long lessonId);
    
    @Query("SELECT a FROM Assessment a WHERE a.isPublished = true AND " +
           "(LOWER(a.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(a.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Assessment> searchPublishedAssessments(@Param("keyword") String keyword, Pageable pageable);
    
    @Query("SELECT COUNT(a) FROM Assessment a WHERE a.instructor.id = :instructorId")
    Long countByInstructorId(@Param("instructorId") Long instructorId);
}