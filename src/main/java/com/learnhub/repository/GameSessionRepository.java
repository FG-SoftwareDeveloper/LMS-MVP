package com.learnhub.repository;

import com.learnhub.model.GameSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameSessionRepository extends JpaRepository<GameSession, Long> {
    
    List<GameSession> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    List<GameSession> findByGameIdOrderByScoreDesc(Long gameId);
    
    Optional<GameSession> findByUserIdAndGameIdAndStatus(Long userId, Long gameId, String status);
    
    @Query("SELECT gs FROM GameSession gs WHERE gs.user.id = :userId AND gs.game.id = :gameId ORDER BY gs.score DESC")
    List<GameSession> findUserGameSessions(@Param("userId") Long userId, @Param("gameId") Long gameId);
    
    @Query("SELECT MAX(gs.score) FROM GameSession gs WHERE gs.user.id = :userId AND gs.game.id = :gameId")
    Integer findMaxScoreByUserAndGame(@Param("userId") Long userId, @Param("gameId") Long gameId);
}