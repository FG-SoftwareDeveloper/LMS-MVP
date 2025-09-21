package com.learnhub.repository;

import com.learnhub.model.UserLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserLevelRepository extends JpaRepository<UserLevel, Long> {
    
    Optional<UserLevel> findByUserId(Long userId);
    
    @Query("SELECT ul FROM UserLevel ul ORDER BY ul.totalPoints DESC")
    List<UserLevel> findTopByOrderByTotalPointsDesc(int limit);
    
    @Query("SELECT ul FROM UserLevel ul WHERE ul.currentLevel >= :minLevel ORDER BY ul.totalPoints DESC")
    List<UserLevel> findByMinLevel(@Param("minLevel") Integer minLevel);
    
    @Query("SELECT AVG(ul.totalPoints) FROM UserLevel ul")
    Double getAveragePoints();
    
    @Query("SELECT ul FROM UserLevel ul ORDER BY ul.learningStreak DESC")
    List<UserLevel> findTopByStreak(int limit);
}