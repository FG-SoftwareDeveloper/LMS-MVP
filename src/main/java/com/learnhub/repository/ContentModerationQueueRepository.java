package com.learnhub.repository;

import com.learnhub.model.ContentModerationQueue;
import com.learnhub.model.ModerationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ContentModerationQueueRepository extends JpaRepository<ContentModerationQueue, Long> {
    
    Page<ContentModerationQueue> findByStatus(ModerationStatus status, Pageable pageable);
    
    List<ContentModerationQueue> findByReviewedByIdOrderByReviewedAtDesc(Long reviewerId);
    
    List<ContentModerationQueue> findByContentAuthorIdOrderByCreatedAtDesc(Long authorId);
    
    @Query("SELECT COUNT(cmq) FROM ContentModerationQueue cmq WHERE cmq.status = :status")
    Long countByStatus(@Param("status") ModerationStatus status);
    
    @Query("SELECT COUNT(cmq) FROM ContentModerationQueue cmq WHERE cmq.status = :status AND cmq.createdAt >= :date")
    Long countByStatusAndCreatedAtAfter(@Param("status") ModerationStatus status, @Param("date") LocalDateTime date);
    
    @Query("SELECT cmq FROM ContentModerationQueue cmq WHERE cmq.contentType = :contentType AND cmq.contentId = :contentId")
    List<ContentModerationQueue> findByContentTypeAndContentId(@Param("contentType") String contentType, @Param("contentId") Long contentId);
}