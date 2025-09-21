package com.learnhub.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_levels")
public class UserLevel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
    
    @Column(name = "current_level", nullable = false)
    private Integer currentLevel = 1;
    
    @Column(name = "total_points", nullable = false)
    private Integer totalPoints = 0;
    
    @Column(name = "current_level_points", nullable = false)
    private Integer currentLevelPoints = 0;
    
    @Column(name = "points_to_next_level", nullable = false)
    private Integer pointsToNextLevel = 100;
    
    @Column(name = "learning_streak", nullable = false)
    private Integer learningStreak = 0;
    
    @Column(name = "max_streak", nullable = false)
    private Integer maxStreak = 0;
    
    @Column(name = "last_activity_date")
    private LocalDateTime lastActivityDate;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public UserLevel() {}
    
    public UserLevel(User user) {
        this.user = user;
        this.lastActivityDate = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public Integer getCurrentLevel() { return currentLevel; }
    public void setCurrentLevel(Integer currentLevel) { this.currentLevel = currentLevel; }
    
    public Integer getTotalPoints() { return totalPoints; }
    public void setTotalPoints(Integer totalPoints) { this.totalPoints = totalPoints; }
    
    public Integer getCurrentLevelPoints() { return currentLevelPoints; }
    public void setCurrentLevelPoints(Integer currentLevelPoints) { this.currentLevelPoints = currentLevelPoints; }
    
    public Integer getPointsToNextLevel() { return pointsToNextLevel; }
    public void setPointsToNextLevel(Integer pointsToNextLevel) { this.pointsToNextLevel = pointsToNextLevel; }
    
    public Integer getLearningStreak() { return learningStreak; }
    public void setLearningStreak(Integer learningStreak) { this.learningStreak = learningStreak; }
    
    public Integer getMaxStreak() { return maxStreak; }
    public void setMaxStreak(Integer maxStreak) { this.maxStreak = maxStreak; }
    
    public LocalDateTime getLastActivityDate() { return lastActivityDate; }
    public void setLastActivityDate(LocalDateTime lastActivityDate) { this.lastActivityDate = lastActivityDate; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    // Utility methods
    public void addPoints(Integer points) {
        this.totalPoints += points;
        this.currentLevelPoints += points;
        
        // Check for level up
        while (this.currentLevelPoints >= this.pointsToNextLevel) {
            this.currentLevelPoints -= this.pointsToNextLevel;
            this.currentLevel++;
            this.pointsToNextLevel = calculatePointsForNextLevel();
        }
    }
    
    private Integer calculatePointsForNextLevel() {
        // Exponential growth: level * 100 + (level - 1) * 50
        return currentLevel * 100 + (currentLevel - 1) * 50;
    }
}