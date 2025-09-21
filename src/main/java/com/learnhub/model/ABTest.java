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
@Table(name = "ab_tests")
public class ABTest {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Name is required")
    @Size(max = 200)
    @Column(nullable = false)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TestType type;
    
    @Column(name = "target_entity_type")
    private String targetEntityType; // Course, Lesson, etc.
    
    @Column(name = "target_entity_id")
    private Long targetEntityId;
    
    @Column(name = "variant_a_config", columnDefinition = "JSON")
    private String variantAConfig;
    
    @Column(name = "variant_b_config", columnDefinition = "JSON")
    private String variantBConfig;
    
    @Column(name = "traffic_split", nullable = false)
    private Integer trafficSplit = 50; // Percentage for variant A
    
    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;
    
    @Column(name = "end_date")
    private LocalDateTime endDate;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TestStatus status = TestStatus.DRAFT;
    
    @Column(name = "success_metric")
    private String successMetric;
    
    @Column(name = "minimum_sample_size")
    private Integer minimumSampleSize = 100;
    
    @Column(name = "confidence_level")
    private Double confidenceLevel = 95.0;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;
    
    @OneToMany(mappedBy = "abTest", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ABTestParticipant> participants = new HashSet<>();
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public ABTest() {}
    
    public ABTest(String name, TestType type, User createdBy) {
        this.name = name;
        this.type = type;
        this.createdBy = createdBy;
        this.startDate = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public TestType getType() { return type; }
    public void setType(TestType type) { this.type = type; }
    
    public String getTargetEntityType() { return targetEntityType; }
    public void setTargetEntityType(String targetEntityType) { this.targetEntityType = targetEntityType; }
    
    public Long getTargetEntityId() { return targetEntityId; }
    public void setTargetEntityId(Long targetEntityId) { this.targetEntityId = targetEntityId; }
    
    public String getVariantAConfig() { return variantAConfig; }
    public void setVariantAConfig(String variantAConfig) { this.variantAConfig = variantAConfig; }
    
    public String getVariantBConfig() { return variantBConfig; }
    public void setVariantBConfig(String variantBConfig) { this.variantBConfig = variantBConfig; }
    
    public Integer getTrafficSplit() { return trafficSplit; }
    public void setTrafficSplit(Integer trafficSplit) { this.trafficSplit = trafficSplit; }
    
    public LocalDateTime getStartDate() { return startDate; }
    public void setStartDate(LocalDateTime startDate) { this.startDate = startDate; }
    
    public LocalDateTime getEndDate() { return endDate; }
    public void setEndDate(LocalDateTime endDate) { this.endDate = endDate; }
    
    public TestStatus getStatus() { return status; }
    public void setStatus(TestStatus status) { this.status = status; }
    
    public String getSuccessMetric() { return successMetric; }
    public void setSuccessMetric(String successMetric) { this.successMetric = successMetric; }
    
    public Integer getMinimumSampleSize() { return minimumSampleSize; }
    public void setMinimumSampleSize(Integer minimumSampleSize) { this.minimumSampleSize = minimumSampleSize; }
    
    public Double getConfidenceLevel() { return confidenceLevel; }
    public void setConfidenceLevel(Double confidenceLevel) { this.confidenceLevel = confidenceLevel; }
    
    public User getCreatedBy() { return createdBy; }
    public void setCreatedBy(User createdBy) { this.createdBy = createdBy; }
    
    public Set<ABTestParticipant> getParticipants() { return participants; }
    public void setParticipants(Set<ABTestParticipant> participants) { this.participants = participants; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

enum TestType {
    COURSE_CONTENT, LESSON_FORMAT, UI_LAYOUT, GAME_MECHANICS
}

enum TestStatus {
    DRAFT, ACTIVE, PAUSED, COMPLETED, CANCELLED
}