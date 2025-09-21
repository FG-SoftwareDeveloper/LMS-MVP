package com.learnhub.repository;

import com.learnhub.model.UserCourseProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserCourseProgressRepository extends JpaRepository<UserCourseProgress, Long> {
    
    Optional<UserCourseProgress> findByUserIdAndCourseId(Long userId, Long courseId);
    
    List<UserCourseProgress> findByUserIdOrderByLastAccessedAtDesc(Long userId);
    
    List<UserCourseProgress> findByCourseId(Long courseId);
    
    @Query("SELECT COUNT(ucp) FROM UserCourseProgress ucp WHERE ucp.course.id = :courseId")
    Long countEnrollmentsByCourseId(@Param("courseId") Long courseId);
    
    @Query("SELECT AVG(ucp.completionPercentage) FROM UserCourseProgress ucp WHERE ucp.course.id = :courseId")
    Double getAverageProgressByCourseId(@Param("courseId") Long courseId);
    
    @Query("SELECT ucp FROM UserCourseProgress ucp WHERE ucp.user.id = :userId AND ucp.isCompleted = false ORDER BY ucp.lastAccessedAt DESC")
    List<UserCourseProgress> findInProgressCoursesByUserId(@Param("userId") Long userId);
}