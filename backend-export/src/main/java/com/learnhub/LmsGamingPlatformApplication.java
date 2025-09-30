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
    
    @Autowired
    private javax.sql.DataSource dataSource;

    @GetMapping("/api/v1/db-test")
    public String dbTest() {
        try (java.sql.Connection conn = dataSource.getConnection();
             java.sql.Statement stmt = conn.createStatement();
             java.sql.ResultSet rs = stmt.executeQuery("SELECT 1")) {
            if (rs.next() && rs.getInt(1) == 1) {
                return "Database connection successful";
            } else {
                return "Database connection failed: Unexpected result";
            }
        } catch (Exception e) {
            return "Database connection failed: " + e.getMessage();
        }
    }
}