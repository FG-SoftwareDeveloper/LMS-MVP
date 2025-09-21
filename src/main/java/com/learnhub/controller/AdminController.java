package com.learnhub.controller;

import com.learnhub.dto.ApiResponse;
import com.learnhub.model.*;
import com.learnhub.service.ModerationService;
import com.learnhub.service.AnalyticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Administration", description = "Administrative endpoints")
public class AdminController {

    @Autowired
    private ModerationService moderationService;

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/moderation/queue")
    @Operation(summary = "Get content moderation queue")
    public ResponseEntity<Page<ContentModerationQueue>> getModerationQueue(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<ContentModerationQueue> queue = moderationService.getPendingModerations(pageable);
        return ResponseEntity.ok(queue);
    }

    @PostMapping("/moderation/{moderationId}/review")
    @Operation(summary = "Review and action moderation request")
    public ResponseEntity<?> reviewModeration(@PathVariable Long moderationId,
                                            @RequestParam ModerationAction action,
                                            @RequestParam(required = false) String notes) {
        try {
            ContentModerationQueue reviewed = moderationService.reviewContent(moderationId, action, notes);
            return ResponseEntity.ok(new ApiResponse(true, "Moderation reviewed successfully", reviewed));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("/users/{userId}/suspend")
    @Operation(summary = "Suspend user account")
    public ResponseEntity<?> suspendUser(@PathVariable Long userId,
                                       @RequestParam String reason,
                                       @RequestParam(required = false) String suspendedUntil) {
        try {
            LocalDateTime until = suspendedUntil != null ? LocalDateTime.parse(suspendedUntil) : null;
            UserSuspension suspension = moderationService.suspendUser(userId, reason, until);
            return ResponseEntity.ok(new ApiResponse(true, "User suspended successfully", suspension));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("/users/{userId}/reactivate")
    @Operation(summary = "Reactivate suspended user account")
    public ResponseEntity<?> reactivateUser(@PathVariable Long userId,
                                          @RequestParam String reason) {
        try {
            UserSuspension reactivation = moderationService.reactivateUser(userId, reason);
            return ResponseEntity.ok(new ApiResponse(true, "User reactivated successfully", reactivation));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/analytics/system")
    @Operation(summary = "Get comprehensive system analytics")
    public ResponseEntity<Map<String, Object>> getSystemAnalytics() {
        Map<String, Object> analytics = analyticsService.getSystemAnalytics();
        return ResponseEntity.ok(analytics);
    }

    @PostMapping("/impersonate/{userId}")
    @Operation(summary = "Impersonate user for support purposes")
    public ResponseEntity<?> impersonateUser(@PathVariable Long userId) {
        try {
            // Implementation for user impersonation
            // This would create a special JWT token for impersonation
            Map<String, Object> response = new HashMap<>();
            response.put("impersonationToken", "temp_token_for_user_" + userId);
            response.put("originalAdminId", getCurrentUserId());
            
            return ResponseEntity.ok(new ApiResponse(true, "Impersonation started", response));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("/backup/schedule")
    @Operation(summary = "Schedule database backup")
    public ResponseEntity<?> scheduleBackup(@RequestParam String schedule,
                                          @RequestParam(required = false) String description) {
        try {
            // Implementation for backup scheduling
            Map<String, Object> response = new HashMap<>();
            response.put("backupId", "backup_" + System.currentTimeMillis());
            response.put("schedule", schedule);
            response.put("nextRun", LocalDateTime.now().plusDays(1));
            
            return ResponseEntity.ok(new ApiResponse(true, "Backup scheduled successfully", response));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    private Long getCurrentUserId() {
        // Implementation to get current user ID from security context
        return 1L; // Placeholder
    }
}