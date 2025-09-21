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
@Table(name = "live_sessions")
public class LiveSession {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Title is required")
    @Size(max = 200)
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id", nullable = false)
    private User instructor;
    
    @Column(name = "scheduled_start", nullable = false)
    private LocalDateTime scheduledStart;
    
    @Column(name = "scheduled_end", nullable = false)
    private LocalDateTime scheduledEnd;
    
    @Column(name = "actual_start")
    private LocalDateTime actualStart;
    
    @Column(name = "actual_end")
    private LocalDateTime actualEnd;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SessionProvider provider = SessionProvider.ZOOM;
    
    @Column(name = "external_session_id")
    private String externalSessionId;
    
    @Column(name = "join_url")
    private String joinUrl;
    
    @Column(name = "host_url")
    private String hostUrl;
    
    @Column(name = "meeting_password")
    private String meetingPassword;
    
    @Column(name = "max_participants")
    private Integer maxParticipants = 100;
    
    @Column(name = "current_participants", nullable = false)
    private Integer currentParticipants = 0;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SessionStatus status = SessionStatus.SCHEDULED;
    
    @Column(name = "recording_url")
    private String recordingUrl;
    
    @Column(name = "is_recorded", nullable = false)
    private Boolean isRecorded = false;
    
    @Column(name = "is_public", nullable = false)
    private Boolean isPublic = false;
    
    @Column(columnDefinition = "JSON")
    private String settings;
    
    @OneToMany(mappedBy = "liveSession", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<SessionParticipant> participants = new HashSet<>();
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public LiveSession() {}
    
    public LiveSession(String title, User instructor, LocalDateTime scheduledStart, LocalDateTime scheduledEnd) {
        this.title = title;
        this.instructor = instructor;
        this.scheduledStart = scheduledStart;
        this.scheduledEnd = scheduledEnd;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    
    public User getInstructor() { return instructor; }
    public void setInstructor(User instructor) { this.instructor = instructor; }
    
    public LocalDateTime getScheduledStart() { return scheduledStart; }
    public void setScheduledStart(LocalDateTime scheduledStart) { this.scheduledStart = scheduledStart; }
    
    public LocalDateTime getScheduledEnd() { return scheduledEnd; }
    public void setScheduledEnd(LocalDateTime scheduledEnd) { this.scheduledEnd = scheduledEnd; }
    
    public LocalDateTime getActualStart() { return actualStart; }
    public void setActualStart(LocalDateTime actualStart) { this.actualStart = actualStart; }
    
    public LocalDateTime getActualEnd() { return actualEnd; }
    public void setActualEnd(LocalDateTime actualEnd) { this.actualEnd = actualEnd; }
    
    public SessionProvider getProvider() { return provider; }
    public void setProvider(SessionProvider provider) { this.provider = provider; }
    
    public String getExternalSessionId() { return externalSessionId; }
    public void setExternalSessionId(String externalSessionId) { this.externalSessionId = externalSessionId; }
    
    public String getJoinUrl() { return joinUrl; }
    public void setJoinUrl(String joinUrl) { this.joinUrl = joinUrl; }
    
    public String getHostUrl() { return hostUrl; }
    public void setHostUrl(String hostUrl) { this.hostUrl = hostUrl; }
    
    public String getMeetingPassword() { return meetingPassword; }
    public void setMeetingPassword(String meetingPassword) { this.meetingPassword = meetingPassword; }
    
    public Integer getMaxParticipants() { return maxParticipants; }
    public void setMaxParticipants(Integer maxParticipants) { this.maxParticipants = maxParticipants; }
    
    public Integer getCurrentParticipants() { return currentParticipants; }
    public void setCurrentParticipants(Integer currentParticipants) { this.currentParticipants = currentParticipants; }
    
    public SessionStatus getStatus() { return status; }
    public void setStatus(SessionStatus status) { this.status = status; }
    
    public String getRecordingUrl() { return recordingUrl; }
    public void setRecordingUrl(String recordingUrl) { this.recordingUrl = recordingUrl; }
    
    public Boolean getIsRecorded() { return isRecorded; }
    public void setIsRecorded(Boolean isRecorded) { this.isRecorded = isRecorded; }
    
    public Boolean getIsPublic() { return isPublic; }
    public void setIsPublic(Boolean isPublic) { this.isPublic = isPublic; }
    
    public String getSettings() { return settings; }
    public void setSettings(String settings) { this.settings = settings; }
    
    public Set<SessionParticipant> getParticipants() { return participants; }
    public void setParticipants(Set<SessionParticipant> participants) { this.participants = participants; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

enum SessionProvider {
    ZOOM, TEAMS, GOOGLE_MEET
}

enum SessionStatus {
    SCHEDULED, LIVE, ENDED, CANCELLED
}