package com.learnhub.repository;

import com.learnhub.model.MultiplayerParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MultiplayerParticipantRepository extends JpaRepository<MultiplayerParticipant, Long> {
    
    List<MultiplayerParticipant> findByGameRoomId(Long gameRoomId);
    
    Optional<MultiplayerParticipant> findByGameRoomIdAndUserId(Long gameRoomId, Long userId);
    
    List<MultiplayerParticipant> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    List<MultiplayerParticipant> findByGameRoomIdAndIsConnectedTrue(Long gameRoomId);
    
    @Query("SELECT COUNT(mp) FROM MultiplayerParticipant mp WHERE mp.gameRoom.id = :roomId AND mp.isReady = true")
    Long countReadyParticipants(@Param("roomId") Long roomId);
    
    @Query("SELECT mp FROM MultiplayerParticipant mp WHERE mp.gameRoom.id = :roomId ORDER BY mp.finalScore DESC")
    List<MultiplayerParticipant> findByGameRoomIdOrderByFinalScoreDesc(@Param("roomId") Long roomId);
}