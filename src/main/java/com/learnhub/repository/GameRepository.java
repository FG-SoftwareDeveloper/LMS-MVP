package com.learnhub.repository;

import com.learnhub.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    
    Optional<Game> findByLessonId(Long lessonId);
    
    List<Game> findByDifficulty(String difficulty);
    
    @Query("SELECT g FROM Game g WHERE g.isMultiplayer = :isMultiplayer")
    List<Game> findByMultiplayerStatus(@Param("isMultiplayer") Boolean isMultiplayer);
    
    @Query("SELECT g FROM Game g WHERE LOWER(g.title) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Game> searchByTitle(@Param("keyword") String keyword);
}