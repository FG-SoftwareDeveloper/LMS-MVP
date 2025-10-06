package com.learnhub.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.sql.DataSource;
import java.sql.SQLException;

@Controller
public class HealthController {
    private final DataSource dataSource;

    public HealthController(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @GetMapping("/health")
    public String health(Model model) {
        boolean dbOk = false;
        String message = "";
        try (var conn = dataSource.getConnection(); var stmt = conn.createStatement()) {
            stmt.execute("SELECT 1");
            dbOk = true;
            message = "Database connection successful";
        } catch (SQLException ex) {
            message = "Database connection failed: " + ex.getMessage();
        }
        model.addAttribute("dbOk", dbOk);
        model.addAttribute("message", message);
        return "health";
    }
}
