package com.learnhub.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "content_moderation_queue")
public class ContentModerationQueue {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ContentType contentType;
    
    @Column(name = "content_id", nullable = false)
    private Long contentId;
    
    @Column(name = "content_title")
    private String contentTitle;
    
    @Column(name = "content_preview", columnDefinition = "TEXT")
    private String contentPreview;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reported_by")
    private User reportedBy;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "content_author")
    private User contentAuthor;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ModerationReason reason;
    
    @Column(name = "reason_details", columnDefinition = "TEXT")
    private String reasonDetails;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ModerationStatus status = ModerationStatus.PENDING;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewed_by")
    private User reviewedBy;
    
    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;
    
    @Column(name = "moderator_notes", columnDefinition = "TEXT")
    private String moderatorNotes;
    
    @Enumerated(EnumType.STRING)
    private ModerationAction action;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public ContentModerationQueue() {}
    
    public ContentModerationQueue(ContentType contentType, Long contentId, User reportedBy, 
                                 User contentAuthor, ModerationReason reason) {
        this.contentType = contentType;
        this.contentId = contentId;
        this.reportedBy = reportedBy;
        this.contentAuthor = contentAuthor;
        this.reason = reason;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public ContentType getContentType() { return contentType; }
    public void setContentType(ContentType contentType) { this.contentType = contentType; }
    
    public Long getContentId() { return contentId; }
    public void setContentId(Long contentId) { this.contentId = contentId; }
    
    public String getContentTitle() { return contentTitle; }
    public void setContentTitle(String contentTitle) { this.contentTitle = contentTitle; }
    
    public String getContentPreview() { return contentPreview; }
    public void setContentPreview(String contentPreview) { this.contentPreview = contentPreview; }
    
    public User getReportedBy() { return reportedBy; }
    public void setReportedBy(User reportedBy) { this.reportedBy = reportedBy; }
    
    public User getContentAuthor() { return contentAuthor; }
    public void setContentAuthor(User contentAuthor) { this.contentAuthor = contentAuthor; }
    
    public ModerationReason getReason() { return reason; }
    public void setReason(ModerationReason reason) { this.reason = reason; }
    
    public String getReasonDetails() { return reasonDetails; }
    public void setReasonDetails(String reasonDetails) { this.reasonDetails = reasonDetails; }
    
    public ModerationStatus getStatus() { return status; }
    public void setStatus(ModerationStatus status) { this.status = status; }
    
    public User getReviewedBy() { return reviewedBy; }
    public void setReviewedBy(User reviewedBy) { this.reviewedBy = reviewedBy; }
    
    public LocalDateTime getReviewedAt() { return reviewedAt; }
    public void setReviewedAt(LocalDateTime reviewedAt) { this.reviewedAt = reviewedAt; }
    
    public String getModeratorNotes() { return moderatorNotes; }
    public void setModeratorNotes(String moderatorNotes) { this.moderatorNotes = moderatorNotes; }
    
    public ModerationAction getAction() { return action; }
    public void setAction(ModerationAction action) { this.action = action; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

enum ContentType {
    COURSE, LESSON, FORUM_POST, PRIVATE_MESSAGE, COMMENT
}

enum ModerationReason {
    INAPPROPRIATE_CONTENT, SPAM, HARASSMENT, COPYRIGHT_VIOLATION, OTHER
}

enum ModerationStatus {
    PENDING, UNDER_REVIEW, APPROVED, REJECTED, ESCALATED
}

enum ModerationAction {
    APPROVE, REJECT, EDIT, DELETE, SUSPEND_USER, WARNING
}