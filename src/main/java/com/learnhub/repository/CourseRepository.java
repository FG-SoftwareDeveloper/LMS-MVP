package com.learnhub.repository;

import com.learnhub.model.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    
    Page<Course> findByIsPublishedTrue(Pageable pageable);
    
    Page<Course> findByCategoryAndIsPublishedTrue(String category, Pageable pageable);
    
    Page<Course> findByInstructorIdAndIsPublishedTrue(Long instructorId, Pageable pageable);
    
    @Query("SELECT c FROM Course c WHERE c.isPublished = true AND " +
           "(LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(c.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Course> searchPublishedCourses(@Param("keyword") String keyword, Pageable pageable);
    
    @Query("SELECT DISTINCT c.category FROM Course c WHERE c.isPublished = true ORDER BY c.category")
    List<String> findAllCategories();
    
    @Query("SELECT c FROM Course c JOIN c.userProgress up WHERE up.user.id = :userId")
    List<Course> findEnrolledCoursesByUserId(@Param("userId") Long userId);
}