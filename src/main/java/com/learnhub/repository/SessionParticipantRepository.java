package com.learnhub.repository;

import com.learnhub.model.SessionParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SessionParticipantRepository extends JpaRepository<SessionParticipant, Long> {
    
    List<SessionParticipant> findByLiveSessionId(Long liveSessionId);
    
    Optional<SessionParticipant> findByLiveSessionIdAndUserId(Long liveSessionId, Long userId);
    
    List<SessionParticipant> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    @Query("SELECT AVG(sp.attendanceDuration) FROM SessionParticipant sp WHERE sp.liveSession.id = :sessionId")
    Double getAverageAttendanceDuration(@Param("sessionId") Long sessionId);
    
    @Query("SELECT COUNT(sp) FROM SessionParticipant sp WHERE sp.liveSession.id = :sessionId AND sp.attendanceDuration >= :minDuration")
    Long countParticipantsWithMinAttendance(@Param("sessionId") Long sessionId, @Param("minDuration") Integer minDuration);
}