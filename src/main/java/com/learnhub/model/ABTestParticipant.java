package com.learnhub.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "ab_test_participants")
public class ABTestParticipant {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ab_test_id", nullable = false)
    private ABTest abTest;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "assigned_variant", nullable = false)
    private String assignedVariant; // 'A' or 'B'
    
    @Column(name = "conversion_achieved", nullable = false)
    private Boolean conversionAchieved = false;
    
    @Column(name = "conversion_value")
    private Double conversionValue;
    
    @Column(name = "session_duration")
    private Integer sessionDuration; // in seconds
    
    @Column(name = "interactions_count")
    private Integer interactionsCount = 0;
    
    @Column(columnDefinition = "JSON")
    private String metadata;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    // Constructors
    public ABTestParticipant() {}
    
    public ABTestParticipant(ABTest abTest, User user, String assignedVariant) {
        this.abTest = abTest;
        this.user = user;
        this.assignedVariant = assignedVariant;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public ABTest getAbTest() { return abTest; }
    public void setAbTest(ABTest abTest) { this.abTest = abTest; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public String getAssignedVariant() { return assignedVariant; }
    public void setAssignedVariant(String assignedVariant) { this.assignedVariant = assignedVariant; }
    
    public Boolean getConversionAchieved() { return conversionAchieved; }
    public void setConversionAchieved(Boolean conversionAchieved) { this.conversionAchieved = conversionAchieved; }
    
    public Double getConversionValue() { return conversionValue; }
    public void setConversionValue(Double conversionValue) { this.conversionValue = conversionValue; }
    
    public Integer getSessionDuration() { return sessionDuration; }
    public void setSessionDuration(Integer sessionDuration) { this.sessionDuration = sessionDuration; }
    
    public Integer getInteractionsCount() { return interactionsCount; }
    public void setInteractionsCount(Integer interactionsCount) { this.interactionsCount = interactionsCount; }
    
    public String getMetadata() { return metadata; }
    public void setMetadata(String metadata) { this.metadata = metadata; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}