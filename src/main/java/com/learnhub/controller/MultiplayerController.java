package com.learnhub.controller;

import com.learnhub.dto.ApiResponse;
import com.learnhub.model.MultiplayerGameRoom;
import com.learnhub.service.MultiplayerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/multiplayer")
@CrossOrigin(origins = "*", maxAge = 3600)
@Tag(name = "Multiplayer", description = "Multiplayer game session endpoints")
public class MultiplayerController {

    @Autowired
    private MultiplayerService multiplayerService;

    @PostMapping("/rooms")
    @PreAuthorize("hasRole('STUDENT') or hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    @Operation(summary = "Create multiplayer game room")
    public ResponseEntity<?> createGameRoom(@RequestBody MultiplayerGameRoom roomRequest) {
        try {
            MultiplayerGameRoom room = multiplayerService.createGameRoom(roomRequest);
            return ResponseEntity.ok(new ApiResponse(true, "Game room created successfully", room));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("/rooms/{roomCode}/join")
    @PreAuthorize("hasRole('STUDENT') or hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    @Operation(summary = "Join multiplayer game room")
    public ResponseEntity<?> joinGameRoom(@PathVariable String roomCode,
                                        @RequestParam(required = false) String password) {
        try {
            MultiplayerGameRoom room = multiplayerService.joinGameRoom(roomCode, password);
            return ResponseEntity.ok(new ApiResponse(true, "Joined game room successfully", room));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/rooms/active")
    @PreAuthorize("hasRole('STUDENT') or hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    @Operation(summary = "Get active game rooms")
    public ResponseEntity<List<MultiplayerGameRoom>> getActiveRooms() {
        List<MultiplayerGameRoom> rooms = multiplayerService.getActiveRooms();
        return ResponseEntity.ok(rooms);
    }

    @PostMapping("/rooms/{roomId}/start")
    @PreAuthorize("hasRole('STUDENT') or hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    @Operation(summary = "Start multiplayer game session")
    public ResponseEntity<?> startGameSession(@PathVariable Long roomId) {
        try {
            MultiplayerGameRoom room = multiplayerService.startGameSession(roomId);
            return ResponseEntity.ok(new ApiResponse(true, "Game session started", room));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("/rooms/{roomId}/leave")
    @PreAuthorize("hasRole('STUDENT') or hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    @Operation(summary = "Leave multiplayer game room")
    public ResponseEntity<?> leaveGameRoom(@PathVariable Long roomId) {
        try {
            multiplayerService.leaveGameRoom(roomId);
            return ResponseEntity.ok(new ApiResponse(true, "Left game room successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
}