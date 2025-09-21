package com.learnhub.service;

import com.learnhub.model.*;
import com.learnhub.repository.LiveSessionRepository;
import com.learnhub.repository.SessionParticipantRepository;
import com.learnhub.repository.UserRepository;
import com.learnhub.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class LiveSessionService {

    @Autowired
    private LiveSessionRepository liveSessionRepository;

    @Autowired
    private SessionParticipantRepository participantRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${zoom.api.key}")
    private String zoomApiKey;

    @Value("${zoom.api.secret}")
    private String zoomApiSecret;

    public LiveSession createLiveSession(LiveSession sessionRequest) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        
        User instructor = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("Instructor not found"));
        
        sessionRequest.setInstructor(instructor);
        
        // Create external meeting based on provider
        switch (sessionRequest.getProvider()) {
            case ZOOM:
                createZoomMeeting(sessionRequest);
                break;
            case TEAMS:
                createTeamsMeeting(sessionRequest);
                break;
            case GOOGLE_MEET:
                createGoogleMeeting(sessionRequest);
                break;
        }
        
        return liveSessionRepository.save(sessionRequest);
    }

    private void createZoomMeeting(LiveSession session) {
        try {
            // Zoom API integration would go here
            // For now, we'll create mock data
            session.setExternalSessionId("zoom_" + UUID.randomUUID().toString());
            session.setJoinUrl("https://zoom.us/j/123456789");
            session.setHostUrl("https://zoom.us/s/123456789?role=1");
            session.setMeetingPassword("password123");
        } catch (Exception e) {
            throw new RuntimeException("Failed to create Zoom meeting: " + e.getMessage());
        }
    }

    private void createTeamsMeeting(LiveSession session) {
        try {
            // Microsoft Teams API integration would go here
            session.setExternalSessionId("teams_" + UUID.randomUUID().toString());
            session.setJoinUrl("https://teams.microsoft.com/l/meetup-join/...");
            session.setHostUrl("https://teams.microsoft.com/l/meetup-join/...");
        } catch (Exception e) {
            throw new RuntimeException("Failed to create Teams meeting: " + e.getMessage());
        }
    }

    private void createGoogleMeeting(LiveSession session) {
        try {
            // Google Meet API integration would go here
            session.setExternalSessionId("meet_" + UUID.randomUUID().toString());
            session.setJoinUrl("https://meet.google.com/abc-defg-hij");
            session.setHostUrl("https://meet.google.com/abc-defg-hij");
        } catch (Exception e) {
            throw new RuntimeException("Failed to create Google Meet: " + e.getMessage());
        }
    }

    public LiveSession startSession(Long sessionId) {
        LiveSession session = liveSessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));
        
        session.setStatus(SessionStatus.LIVE);
        session.setActualStart(LocalDateTime.now());
        
        return liveSessionRepository.save(session);
    }

    public LiveSession endSession(Long sessionId) {
        LiveSession session = liveSessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));
        
        session.setStatus(SessionStatus.ENDED);
        session.setActualEnd(LocalDateTime.now());
        
        // Update participant attendance duration
        List<SessionParticipant> participants = participantRepository.findByLiveSessionId(sessionId);
        for (SessionParticipant participant : participants) {
            if (participant.getJoinedAt() != null && participant.getLeftAt() == null) {
                participant.setLeftAt(LocalDateTime.now());
                // Calculate attendance duration
                long duration = java.time.Duration.between(
                    participant.getJoinedAt(), participant.getLeftAt()).toMinutes();
                participant.setAttendanceDuration((int) duration);
                participantRepository.save(participant);
            }
        }
        
        return liveSessionRepository.save(session);
    }

    public SessionParticipant joinSession(Long sessionId) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        LiveSession session = liveSessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));
        
        // Check if user is already a participant
        SessionParticipant existingParticipant = participantRepository
                .findByLiveSessionIdAndUserId(sessionId, user.getId())
                .orElse(null);
        
        if (existingParticipant != null) {
            existingParticipant.setJoinedAt(LocalDateTime.now());
            existingParticipant.setIsPresent(true);
            return participantRepository.save(existingParticipant);
        }
        
        // Create new participant
        SessionParticipant participant = new SessionParticipant(session, user);
        participant.setJoinedAt(LocalDateTime.now());
        participant.setIsPresent(true);
        
        // Update session participant count
        session.setCurrentParticipants(session.getCurrentParticipants() + 1);
        liveSessionRepository.save(session);
        
        return participantRepository.save(participant);
    }

    public List<LiveSession> getUpcomingSessions() {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        
        return liveSessionRepository.findUpcomingSessionsForUser(userPrincipal.getId());
    }

    public List<LiveSession> getInstructorSessions(Long instructorId) {
        return liveSessionRepository.findByInstructorIdOrderByScheduledStartDesc(instructorId);
    }
}