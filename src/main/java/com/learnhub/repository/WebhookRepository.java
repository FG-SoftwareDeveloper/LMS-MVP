package com.learnhub.repository;

import com.learnhub.model.Webhook;
import com.learnhub.model.WebhookEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WebhookRepository extends JpaRepository<Webhook, Long> {
    
    List<Webhook> findByEventAndIsActiveTrue(WebhookEvent event);
    
    List<Webhook> findByCreatedByIdOrderByCreatedAtDesc(Long createdById);
    
    List<Webhook> findByIsActiveTrueOrderByCreatedAtDesc();
    
    @Query("SELECT w FROM Webhook w WHERE w.failureCount >= :maxFailures")
    List<Webhook> findFailedWebhooks(@Param("maxFailures") Integer maxFailures);
    
    @Query("SELECT COUNT(w) FROM Webhook w WHERE w.isActive = true")
    Long countActiveWebhooks();
    
    @Query("SELECT w FROM Webhook w WHERE w.lastTriggeredAt < :cutoffDate AND w.isActive = true")
    List<Webhook> findStaleWebhooks(@Param("cutoffDate") LocalDateTime cutoffDate);
}