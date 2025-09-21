package com.learnhub.service;

import com.learnhub.model.*;
import com.learnhub.repository.*;
import com.learnhub.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class ModerationService {

    @Autowired
    private ContentModerationQueueRepository moderationRepository;

    @Autowired
    private UserSuspensionRepository suspensionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ForumPostRepository forumPostRepository;

    public ContentModerationQueue reportContent(ContentType contentType, Long contentId, 
                                              ModerationReason reason, String details) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        
        User reporter = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Get content author based on content type
        User contentAuthor = getContentAuthor(contentType, contentId);
        
        ContentModerationQueue moderation = new ContentModerationQueue(
                contentType, contentId, reporter, contentAuthor, reason);
        moderation.setReasonDetails(details);
        moderation.setContentTitle(getContentTitle(contentType, contentId));
        moderation.setContentPreview(getContentPreview(contentType, contentId));
        
        return moderationRepository.save(moderation);
    }

    public Page<ContentModerationQueue> getPendingModerations(Pageable pageable) {
        return moderationRepository.findByStatus(ModerationStatus.PENDING, pageable);
    }

    public ContentModerationQueue reviewContent(Long moderationId, ModerationAction action, String notes) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        
        User moderator = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("Moderator not found"));
        
        ContentModerationQueue moderation = moderationRepository.findById(moderationId)
                .orElseThrow(() -> new RuntimeException("Moderation request not found"));
        
        moderation.setReviewedBy(moderator);
        moderation.setReviewedAt(LocalDateTime.now());
        moderation.setModeratorNotes(notes);
        moderation.setAction(action);
        moderation.setStatus(ModerationStatus.APPROVED);
        
        // Execute moderation action
        executeAction(moderation, action);
        
        return moderationRepository.save(moderation);
    }

    public UserSuspension suspendUser(Long userId, String reason, LocalDateTime suspendedUntil) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        
        User admin = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        
        User userToSuspend = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Deactivate any existing suspensions
        List<UserSuspension> activeSuspensions = suspensionRepository
                .findByUserIdAndIsActiveTrue(userId);
        activeSuspensions.forEach(suspension -> {
            suspension.setIsActive(false);
            suspensionRepository.save(suspension);
        });
        
        // Create new suspension
        UserSuspension suspension = new UserSuspension(userToSuspend, admin, reason, suspendedUntil);
        suspension = suspensionRepository.save(suspension);
        
        // Deactivate user account
        userToSuspend.setIsActive(false);
        userRepository.save(userToSuspend);
        
        return suspension;
    }

    public UserSuspension reactivateUser(Long userId, String reason) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        
        User admin = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        
        User userToReactivate = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Find active suspension
        UserSuspension activeSuspension = suspensionRepository
                .findByUserIdAndIsActiveTrue(userId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No active suspension found"));
        
        activeSuspension.setIsActive(false);
        activeSuspension.setReactivatedAt(LocalDateTime.now());
        activeSuspension.setReactivatedBy(admin);
        activeSuspension.setReactivationReason(reason);
        
        // Reactivate user account
        userToReactivate.setIsActive(true);
        userRepository.save(userToReactivate);
        
        return suspensionRepository.save(activeSuspension);
    }

    private User getContentAuthor(ContentType contentType, Long contentId) {
        switch (contentType) {
            case FORUM_POST:
                ForumPost post = forumPostRepository.findById(contentId)
                        .orElseThrow(() -> new RuntimeException("Forum post not found"));
                return post.getAuthor();
            // Add other content types as needed
            default:
                return null;
        }
    }

    private String getContentTitle(ContentType contentType, Long contentId) {
        switch (contentType) {
            case FORUM_POST:
                ForumPost post = forumPostRepository.findById(contentId)
                        .orElse(null);
                return post != null ? post.getTitle() : "Unknown";
            default:
                return "Unknown Content";
        }
    }

    private String getContentPreview(ContentType contentType, Long contentId) {
        switch (contentType) {
            case FORUM_POST:
                ForumPost post = forumPostRepository.findById(contentId)
                        .orElse(null);
                if (post != null) {
                    String content = post.getContent();
                    return content.length() > 200 ? content.substring(0, 200) + "..." : content;
                }
                return "No preview available";
            default:
                return "No preview available";
        }
    }

    private void executeAction(ContentModerationQueue moderation, ModerationAction action) {
        switch (action) {
            case DELETE:
                deleteContent(moderation.getContentType(), moderation.getContentId());
                break;
            case SUSPEND_USER:
                suspendUser(moderation.getContentAuthor().getId(), 
                           "Content violation: " + moderation.getReason(), 
                           LocalDateTime.now().plusDays(7));
                break;
            case WARNING:
                // Send warning notification to user
                break;
            // Other actions...
        }
    }

    private void deleteContent(ContentType contentType, Long contentId) {
        switch (contentType) {
            case FORUM_POST:
                forumPostRepository.deleteById(contentId);
                break;
            // Add other content types as needed
        }
    }
}