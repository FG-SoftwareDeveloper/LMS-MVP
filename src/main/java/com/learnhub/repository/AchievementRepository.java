package com.learnhub.repository;

import com.learnhub.model.Achievement;
import com.learnhub.model.AchievementType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    
    List<Achievement> findByIsActiveTrue();
    
    List<Achievement> findByTypeAndIsActive(AchievementType type, Boolean isActive);
    
    List<Achievement> findByTypeOrderByPointsAsc(AchievementType type);
    
    List<Achievement> findByIsActiveTrueOrderByCreatedAtDesc();
    
    @Query("SELECT a FROM Achievement a WHERE a.name = :name")
    java.util.Optional<Achievement> findByName(@Param("name") String name);
    
    @Query("SELECT a FROM Achievement a WHERE a.type = :type AND a.isActive = true AND JSON_EXTRACT(a.criteria, '$.hidden') = true")
    List<Achievement> findHiddenAchievementsByType(@Param("type") AchievementType type);
    
    @Query("SELECT COUNT(a) FROM Achievement a WHERE a.isActive = true")
    Long countActiveAchievements();
}