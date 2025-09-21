package com.learnhub.repository;

import com.learnhub.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    
    List<Lesson> findByModuleIdOrderByOrderIndexAsc(Long moduleId);
    
    @Query("SELECT l FROM Lesson l WHERE l.module.course.id = :courseId ORDER BY l.module.orderIndex, l.orderIndex")
    List<Lesson> findLessonsByCourseId(@Param("courseId") Long courseId);
    
    @Query("SELECT COUNT(l) FROM Lesson l WHERE l.module.id = :moduleId")
    Long countLessonsByModuleId(@Param("moduleId") Long moduleId);
    
    @Query("SELECT COUNT(l) FROM Lesson l WHERE l.module.course.id = :courseId")
    Long countLessonsByCourseId(@Param("courseId") Long courseId);
}