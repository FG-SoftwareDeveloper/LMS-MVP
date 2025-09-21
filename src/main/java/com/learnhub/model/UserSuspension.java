package com.learnhub.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_suspensions")
public class UserSuspension {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "suspended_by", nullable = false)
    private User suspendedBy;
    
    @Column(name = "reason", columnDefinition = "TEXT", nullable = false)
    private String reason;
    
    @Column(name = "suspended_at", nullable = false)
    private LocalDateTime suspendedAt;
    
    @Column(name = "suspended_until")
    private LocalDateTime suspendedUntil;
    
    @Column(name = "is_permanent", nullable = false)
    private Boolean isPermanent = false;
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
    
    @Column(name = "reactivated_at")
    private LocalDateTime reactivatedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reactivated_by")
    private User reactivatedBy;
    
    @Column(name = "reactivation_reason", columnDefinition = "TEXT")
    private String reactivationReason;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public UserSuspension() {}
    
    public UserSuspension(User user, User suspendedBy, String reason, LocalDateTime suspendedUntil) {
        this.user = user;
        this.suspendedBy = suspendedBy;
        this.reason = reason;
        this.suspendedAt = LocalDateTime.now();
        this.suspendedUntil = suspendedUntil;
        this.isPermanent = (suspendedUntil == null);
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public User getSuspendedBy() { return suspendedBy; }
    public void setSuspendedBy(User suspendedBy) { this.suspendedBy = suspendedBy; }
    
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    
    public LocalDateTime getSuspendedAt() { return suspendedAt; }
    public void setSuspendedAt(LocalDateTime suspendedAt) { this.suspendedAt = suspendedAt; }
    
    public LocalDateTime getSuspendedUntil() { return suspendedUntil; }
    public void setSuspendedUntil(LocalDateTime suspendedUntil) { this.suspendedUntil = suspendedUntil; }
    
    public Boolean getIsPermanent() { return isPermanent; }
    public void setIsPermanent(Boolean isPermanent) { this.isPermanent = isPermanent; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    
    public LocalDateTime getReactivatedAt() { return reactivatedAt; }
    public void setReactivatedAt(LocalDateTime reactivatedAt) { this.reactivatedAt = reactivatedAt; }
    
    public User getReactivatedBy() { return reactivatedBy; }
    public void setReactivatedBy(User reactivatedBy) { this.reactivatedBy = reactivatedBy; }
    
    public String getReactivationReason() { return reactivationReason; }
    public void setReactivationReason(String reactivationReason) { this.reactivationReason = reactivationReason; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    // Utility methods
    public boolean isCurrentlyActive() {
        if (!isActive) return false;
        if (isPermanent) return true;
        return suspendedUntil == null || LocalDateTime.now().isBefore(suspendedUntil);
    }
}