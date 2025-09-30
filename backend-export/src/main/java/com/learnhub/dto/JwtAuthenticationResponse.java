package com.learnhub.dto;

public class JwtAuthenticationResponse {
    
    private String accessToken;
    private String tokenType = "Bearer";
    private String username;
    private String email;
    private String role;
    
    // Constructors
    public JwtAuthenticationResponse() {}
    
    public JwtAuthenticationResponse(String accessToken, String username, String email, String role) {
        this.accessToken = accessToken;
        this.username = username;
        this.email = email;
        this.role = role;
    }
    
    // Getters and Setters
    public String getAccessToken() { return accessToken; }
    public void setAccessToken(String accessToken) { this.accessToken = accessToken; }
    
    public String getTokenType() { return tokenType; }
    public void setTokenType(String tokenType) { this.tokenType = tokenType; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}