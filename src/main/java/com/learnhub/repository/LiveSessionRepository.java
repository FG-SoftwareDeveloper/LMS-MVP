package com.learnhub.repository;

import com.learnhub.model.LiveSession;
import com.learnhub.model.SessionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LiveSessionRepository extends JpaRepository<LiveSession, Long> {
    
    List<LiveSession> findByInstructorIdOrderByScheduledStartDesc(Long instructorId);
    
    List<LiveSession> findByCourseIdOrderByScheduledStartDesc(Long courseId);
    
    List<LiveSession> findByStatus(SessionStatus status);
    
    @Query("SELECT ls FROM LiveSession ls WHERE ls.scheduledStart >= :now AND ls.status = 'SCHEDULED' ORDER BY ls.scheduledStart ASC")
    List<LiveSession> findUpcomingSessions(@Param("now") LocalDateTime now);
    
    @Query("SELECT ls FROM LiveSession ls JOIN ls.participants p WHERE p.user.id = :userId AND ls.scheduledStart >= :now ORDER BY ls.scheduledStart ASC")
    List<LiveSession> findUpcomingSessionsForUser(@Param("userId") Long userId, @Param("now") LocalDateTime now);
    
    @Query("SELECT COUNT(ls) FROM LiveSession ls WHERE ls.instructor.id = :instructorId AND ls.status = 'COMPLETED'")
    Long countCompletedSessionsByInstructor(@Param("instructorId") Long instructorId);
}