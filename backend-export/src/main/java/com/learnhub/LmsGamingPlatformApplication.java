package com.learnhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import javax.sql.DataSource;

@SpringBootApplication
@RestController
@CrossOrigin(origins = "*")
public class LmsGamingPlatformApplication {
    private final DataSource dataSource;
    public LmsGamingPlatformApplication(DataSource dataSource) {
        this.dataSource = dataSource;
    }
    
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
    
    @GetMapping("/api/v1/db-test")
    public String dbTest() {
        try (java.sql.Connection conn = dataSource.getConnection();
             java.sql.Statement stmt = conn.createStatement()) {
            stmt.execute("SELECT 1");
            return "Database connection successful";
        } catch (Exception e) {
            return "Database connection failed: " + e.getMessage();
        }
    }
}