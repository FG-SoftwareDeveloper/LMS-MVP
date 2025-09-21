package com.learnhub.service;

import com.learnhub.model.*;
import com.learnhub.repository.*;
import com.learnhub.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
@Transactional
public class MultiplayerService {

    @Autowired
    private MultiplayerGameRoomRepository roomRepository;

    @Autowired
    private MultiplayerParticipantRepository participantRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserRepository userRepository;

    public MultiplayerGameRoom createGameRoom(MultiplayerGameRoom roomRequest) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        
        User host = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Game game = gameRepository.findById(roomRequest.getGame().getId())
                .orElseThrow(() -> new RuntimeException("Game not found"));
        
        if (!game.getIsMultiplayer()) {
            throw new RuntimeException("Game does not support multiplayer");
        }
        
        // Generate unique room code
        String roomCode = generateRoomCode();
        
        MultiplayerGameRoom room = new MultiplayerGameRoom(
                roomRequest.getRoomName(), game, host, roomCode);
        room.setMaxPlayers(roomRequest.getMaxPlayers());
        room.setIsPrivate(roomRequest.getIsPrivate());
        room.setPassword(roomRequest.getPassword());
        room.setGameSettings(roomRequest.getGameSettings());
        
        room = roomRepository.save(room);
        
        // Add host as first participant
        MultiplayerParticipant hostParticipant = new MultiplayerParticipant(room, host);
        hostParticipant.setIsReady(true);
        participantRepository.save(hostParticipant);
        
        room.setCurrentPlayers(1);
        return roomRepository.save(room);
    }

    public MultiplayerGameRoom joinGameRoom(String roomCode, String password) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        MultiplayerGameRoom room = roomRepository.findByRoomCode(roomCode)
                .orElseThrow(() -> new RuntimeException("Game room not found"));
        
        // Check room capacity
        if (room.getCurrentPlayers() >= room.getMaxPlayers()) {
            throw new RuntimeException("Game room is full");
        }
        
        // Check password for private rooms
        if (room.getIsPrivate() && !room.getPassword().equals(password)) {
            throw new RuntimeException("Invalid room password");
        }
        
        // Check if user is already in room
        if (participantRepository.findByGameRoomIdAndUserId(room.getId(), user.getId()).isPresent()) {
            throw new RuntimeException("User is already in this room");
        }
        
        // Add participant
        MultiplayerParticipant participant = new MultiplayerParticipant(room, user);
        participantRepository.save(participant);
        
        // Update room player count
        room.setCurrentPlayers(room.getCurrentPlayers() + 1);
        return roomRepository.save(room);
    }

    public List<MultiplayerGameRoom> getActiveRooms() {
        return roomRepository.findByStatusAndIsPrivateFalse(RoomStatus.WAITING);
    }

    public MultiplayerGameRoom startGameSession(Long roomId) {
        MultiplayerGameRoom room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Game room not found"));
        
        // Check if user is the host
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        
        if (!room.getHost().getId().equals(userPrincipal.getId())) {
            throw new RuntimeException("Only the host can start the game");
        }
        
        // Check if all players are ready
        List<MultiplayerParticipant> participants = participantRepository.findByGameRoomId(roomId);
        boolean allReady = participants.stream().allMatch(MultiplayerParticipant::getIsReady);
        
        if (!allReady) {
            throw new RuntimeException("Not all players are ready");
        }
        
        room.setStatus(RoomStatus.IN_PROGRESS);
        room.setStartedAt(LocalDateTime.now());
        
        return roomRepository.save(room);
    }

    public void leaveGameRoom(Long roomId) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        
        MultiplayerParticipant participant = participantRepository
                .findByGameRoomIdAndUserId(roomId, userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("Participant not found"));
        
        participant.setLeftAt(LocalDateTime.now());
        participant.setIsConnected(false);
        participantRepository.save(participant);
        
        // Update room player count
        MultiplayerGameRoom room = participant.getGameRoom();
        room.setCurrentPlayers(room.getCurrentPlayers() - 1);
        
        // If host leaves, transfer host to another player or close room
        if (room.getHost().getId().equals(userPrincipal.getId())) {
            List<MultiplayerParticipant> remainingParticipants = participantRepository
                    .findByGameRoomIdAndIsConnectedTrue(roomId);
            
            if (remainingParticipants.isEmpty()) {
                room.setStatus(RoomStatus.CANCELLED);
            } else {
                room.setHost(remainingParticipants.get(0).getUser());
            }
        }
        
        roomRepository.save(room);
    }

    private String generateRoomCode() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder code = new StringBuilder();
        Random random = new Random();
        
        for (int i = 0; i < 6; i++) {
            code.append(chars.charAt(random.nextInt(chars.length())));
        }
        
        // Ensure uniqueness
        if (roomRepository.findByRoomCode(code.toString()).isPresent()) {
            return generateRoomCode(); // Recursive call if code exists
        }
        
        return code.toString();
    }
}