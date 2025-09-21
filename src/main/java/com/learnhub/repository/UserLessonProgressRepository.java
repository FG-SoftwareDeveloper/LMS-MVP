package com.learnhub.repository;

import com.learnhub.model.UserLessonProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserLessonProgressRepository extends JpaRepository<UserLessonProgress, Long> {
    
    Optional<UserLessonProgress> findByUserIdAndLessonId(Long userId, Long lessonId);
    
    List<UserLessonProgress> findByUserIdAndLessonModuleCourseId(Long userId, Long courseId);
    
    @Query("SELECT COUNT(ulp) FROM UserLessonProgress ulp WHERE ulp.user.id = :userId AND ulp.lesson.module.course.id = :courseId AND ulp.isCompleted = true")
    Long countCompletedLessonsByUserAndCourse(@Param("userId") Long userId, @Param("courseId") Long courseId);
    
    @Query("SELECT ulp FROM UserLessonProgress ulp WHERE ulp.user.id = :userId AND ulp.lesson.module.course.id = :courseId ORDER BY ulp.lastAccessedAt DESC")
    List<UserLessonProgress> findUserLessonProgressByCourse(@Param("userId") Long userId, @Param("courseId") Long courseId);
}