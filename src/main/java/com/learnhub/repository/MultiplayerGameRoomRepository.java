package com.learnhub.repository;

import com.learnhub.model.MultiplayerGameRoom;
import com.learnhub.model.RoomStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MultiplayerGameRoomRepository extends JpaRepository<MultiplayerGameRoom, Long> {
    
    Optional<MultiplayerGameRoom> findByRoomCode(String roomCode);
    
    List<MultiplayerGameRoom> findByHostIdOrderByCreatedAtDesc(Long hostId);
    
    List<MultiplayerGameRoom> findByGameIdOrderByCreatedAtDesc(Long gameId);
    
    List<MultiplayerGameRoom> findByStatusAndIsPrivateFalse(RoomStatus status);
    
    List<MultiplayerGameRoom> findByStatus(RoomStatus status);
    
    @Query("SELECT mgr FROM MultiplayerGameRoom mgr WHERE mgr.status = :status AND mgr.currentPlayers < mgr.maxPlayers")
    List<MultiplayerGameRoom> findAvailableRooms(@Param("status") RoomStatus status);
    
    @Query("SELECT COUNT(mgr) FROM MultiplayerGameRoom mgr WHERE mgr.game.id = :gameId AND mgr.status = 'IN_PROGRESS'")
    Long countActiveRoomsByGameId(@Param("gameId") Long gameId);
}