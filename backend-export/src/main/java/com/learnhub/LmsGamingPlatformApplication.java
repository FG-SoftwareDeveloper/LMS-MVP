package com.learnhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@RestController
@CrossOrigin(origins = "*")
public class LmsGamingPlatformApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(LmsGamingPlatformApplication.class, args);
    }
    
    @GetMapping("/")
    public String home() {
        return "LMS Gaming Platform API is running!";
    }
    
    @GetMapping("/api/v1/health")
    public String health() {
        return "OK";
    }
}