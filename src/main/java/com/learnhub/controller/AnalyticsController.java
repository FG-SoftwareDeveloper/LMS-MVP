package com.learnhub.controller;

import com.learnhub.service.AnalyticsService;
import com.learnhub.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/analytics")
@CrossOrigin(origins = "*", maxAge = 3600)
@Tag(name = "Analytics", description = "Analytics and reporting endpoints")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @Autowired
    private ReportService reportService;

    @GetMapping("/student/dashboard")
    @PreAuthorize("hasRole('STUDENT') or hasRole('ADMIN')")
    @Operation(summary = "Get student dashboard analytics")
    public ResponseEntity<Map<String, Object>> getStudentDashboard() {
        Map<String, Object> data = analyticsService.getStudentDashboardData(getCurrentUserId());
        return ResponseEntity.ok(data);
    }

    @GetMapping("/instructor/course/{courseId}")
    @PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    @Operation(summary = "Get instructor course analytics")
    public ResponseEntity<Map<String, Object>> getInstructorCourseAnalytics(@PathVariable Long courseId) {
        Map<String, Object> data = analyticsService.getInstructorCourseAnalytics(getCurrentUserId(), courseId);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/game/{gameId}")
    @PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    @Operation(summary = "Get game performance analytics")
    public ResponseEntity<Map<String, Object>> getGameAnalytics(@PathVariable Long gameId) {
        Map<String, Object> data = analyticsService.getGameAnalytics(gameId);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/system")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get system-wide analytics")
    public ResponseEntity<Map<String, Object>> getSystemAnalytics() {
        Map<String, Object> data = analyticsService.getSystemAnalytics();
        return ResponseEntity.ok(data);
    }

    @GetMapping("/reports/{reportId}/excel")
    @PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    @Operation(summary = "Export report as Excel file")
    public ResponseEntity<byte[]> exportReportAsExcel(@PathVariable Long reportId) {
        byte[] excelData = reportService.generateExcelReport(reportId);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "report_" + reportId + ".xlsx");
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(excelData);
    }

    @GetMapping("/reports/{reportId}/csv")
    @PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    @Operation(summary = "Export report as CSV file")
    public ResponseEntity<String> exportReportAsCSV(@PathVariable Long reportId) {
        String csvData = reportService.generateCSVReport(reportId);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);
        headers.setContentDispositionFormData("attachment", "report_" + reportId + ".csv");
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(csvData);
    }

    private Long getCurrentUserId() {
        // Implementation to get current user ID from security context
        return 1L; // Placeholder
    }
}