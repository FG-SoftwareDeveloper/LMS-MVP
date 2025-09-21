package com.learnhub.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "achievements")
public class Achievement {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Name is required")
    @Size(max = 100)
    @Column(nullable = false)
    private String name;
    
    @NotBlank(message = "Description is required")
    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;
    
    @Column(name = "icon_url")
    private String iconUrl;
    
    @Column(name = "badge_color")
    private String badgeColor = "#FFD700";
    
    @Column(nullable = false)
    private Integer points = 0;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AchievementType type = AchievementType.GENERAL;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AchievementRarity rarity = AchievementRarity.COMMON;
    
    @Column(columnDefinition = "JSON")
    private String criteria; // JSON string for achievement criteria
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
    
    @OneToMany(mappedBy = "achievement", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<UserAchievement> userAchievements = new HashSet<>();
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public Achievement() {}
    
    public Achievement(String name, String description, Integer points, AchievementType type) {
        this.name = name;
        this.description = description;
        this.points = points;
        this.type = type;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getIconUrl() { return iconUrl; }
    public void setIconUrl(String iconUrl) { this.iconUrl = iconUrl; }
    
    public String getBadgeColor() { return badgeColor; }
    public void setBadgeColor(String badgeColor) { this.badgeColor = badgeColor; }
    
    public Integer getPoints() { return points; }
    public void setPoints(Integer points) { this.points = points; }
    
    public AchievementType getType() { return type; }
    public void setType(AchievementType type) { this.type = type; }
    
    public AchievementRarity getRarity() { return rarity; }
    public void setRarity(AchievementRarity rarity) { this.rarity = rarity; }
    
    public String getCriteria() { return criteria; }
    public void setCriteria(String criteria) { this.criteria = criteria; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    
    public Set<UserAchievement> getUserAchievements() { return userAchievements; }
    public void setUserAchievements(Set<UserAchievement> userAchievements) { this.userAchievements = userAchievements; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

enum AchievementType {
    GENERAL, COURSE_COMPLETION, GAME_SCORE, STREAK, SOCIAL, ASSESSMENT
}

enum AchievementRarity {
    COMMON, UNCOMMON, RARE, EPIC, LEGENDARY
}