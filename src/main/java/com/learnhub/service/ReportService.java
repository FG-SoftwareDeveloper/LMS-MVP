package com.learnhub.service;

import com.learnhub.model.CustomReport;
import com.learnhub.model.ReportType;
import com.learnhub.repository.CustomReportRepository;
import com.opencsv.CSVWriter;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.StringWriter;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    @Autowired
    private CustomReportRepository reportRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public CustomReport createCustomReport(CustomReport report) {
        report.setLastGeneratedAt(LocalDateTime.now());
        return reportRepository.save(report);
    }

    public byte[] generateExcelReport(Long reportId) {
        CustomReport report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found"));
        
        List<Map<String, Object>> data = executeReportQuery(report);
        
        try (Workbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            
            Sheet sheet = workbook.createSheet(report.getName());
            
            if (!data.isEmpty()) {
                // Create header row
                Row headerRow = sheet.createRow(0);
                List<String> headers = new ArrayList<>(data.get(0).keySet());
                for (int i = 0; i < headers.size(); i++) {
                    Cell cell = headerRow.createCell(i);
                    cell.setCellValue(headers.get(i));
                    
                    // Style header
                    CellStyle headerStyle = workbook.createCellStyle();
                    Font headerFont = workbook.createFont();
                    headerFont.setBold(true);
                    headerStyle.setFont(headerFont);
                    cell.setCellStyle(headerStyle);
                }
                
                // Create data rows
                for (int i = 0; i < data.size(); i++) {
                    Row row = sheet.createRow(i + 1);
                    Map<String, Object> rowData = data.get(i);
                    
                    for (int j = 0; j < headers.size(); j++) {
                        Cell cell = row.createCell(j);
                        Object value = rowData.get(headers.get(j));
                        
                        if (value instanceof String) {
                            cell.setCellValue((String) value);
                        } else if (value instanceof Number) {
                            cell.setCellValue(((Number) value).doubleValue());
                        } else if (value instanceof LocalDateTime) {
                            cell.setCellValue(value.toString());
                        } else {
                            cell.setCellValue(value != null ? value.toString() : "");
                        }
                    }
                }
                
                // Auto-size columns
                for (int i = 0; i < headers.size(); i++) {
                    sheet.autoSizeColumn(i);
                }
            }
            
            workbook.write(outputStream);
            
            // Update report generation stats
            report.setLastGeneratedAt(LocalDateTime.now());
            report.setGenerationCount(report.getGenerationCount() + 1);
            reportRepository.save(report);
            
            return outputStream.toByteArray();
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate Excel report: " + e.getMessage());
        }
    }

    public String generateCSVReport(Long reportId) {
        CustomReport report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found"));
        
        List<Map<String, Object>> data = executeReportQuery(report);
        
        try (StringWriter stringWriter = new StringWriter();
             CSVWriter csvWriter = new CSVWriter(stringWriter)) {
            
            if (!data.isEmpty()) {
                // Write header
                List<String> headers = new ArrayList<>(data.get(0).keySet());
                csvWriter.writeNext(headers.toArray(new String[0]));
                
                // Write data rows
                for (Map<String, Object> rowData : data) {
                    String[] row = new String[headers.size()];
                    for (int i = 0; i < headers.size(); i++) {
                        Object value = rowData.get(headers.get(i));
                        row[i] = value != null ? value.toString() : "";
                    }
                    csvWriter.writeNext(row);
                }
            }
            
            // Update report generation stats
            report.setLastGeneratedAt(LocalDateTime.now());
            report.setGenerationCount(report.getGenerationCount() + 1);
            reportRepository.save(report);
            
            return stringWriter.toString();
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate CSV report: " + e.getMessage());
        }
    }

    private List<Map<String, Object>> executeReportQuery(CustomReport report) {
        try {
            // Execute the custom SQL query
            return jdbcTemplate.queryForList(report.getSqlQuery());
        } catch (Exception e) {
            throw new RuntimeException("Failed to execute report query: " + e.getMessage());
        }
    }

    public Map<String, Object> getABTestResults(Long testId) {
        Map<String, Object> results = new HashMap<>();
        
        // Implementation for A/B test statistical analysis
        // This would include conversion rates, statistical significance, etc.
        
        return results;
    }

    // Predefined report templates
    public List<Map<String, Object>> getStudentProgressReport(Long courseId) {
        String sql = """
            SELECT 
                u.first_name, u.last_name, u.email,
                ucp.completion_percentage, ucp.time_spent,
                ucp.enrollment_date, ucp.last_accessed_at,
                ul.current_level, ul.total_points
            FROM users u
            JOIN user_course_progress ucp ON u.id = ucp.user_id
            LEFT JOIN user_levels ul ON u.id = ul.user_id
            WHERE ucp.course_id = ?
            ORDER BY ucp.completion_percentage DESC
            """;
        
        return jdbcTemplate.queryForList(sql, courseId);
    }

    public List<Map<String, Object>> getGamePerformanceReport() {
        String sql = """
            SELECT 
                g.title as game_title,
                COUNT(gs.id) as total_sessions,
                COUNT(DISTINCT gs.user_id) as unique_players,
                AVG(gs.score) as average_score,
                MAX(gs.score) as highest_score,
                AVG(gs.time_spent) as average_duration
            FROM games g
            LEFT JOIN game_sessions gs ON g.id = gs.game_id
            GROUP BY g.id, g.title
            ORDER BY total_sessions DESC
            """;
        
        return jdbcTemplate.queryForList(sql);
    }

    public List<Map<String, Object>> getAssessmentAnalyticsReport(Long courseId) {
        String sql = """
            SELECT 
                a.title as assessment_title,
                COUNT(aa.id) as total_attempts,
                COUNT(DISTINCT aa.student_id) as unique_students,
                AVG(aa.score) as average_score,
                COUNT(CASE WHEN aa.is_passed = true THEN 1 END) as passed_count,
                (COUNT(CASE WHEN aa.is_passed = true THEN 1 END) * 100.0 / COUNT(aa.id)) as pass_rate
            FROM assessments a
            LEFT JOIN assessment_attempts aa ON a.id = aa.assessment_id
            WHERE a.course_id = ?
            GROUP BY a.id, a.title
            ORDER BY total_attempts DESC
            """;
        
        return jdbcTemplate.queryForList(sql, courseId);
    }

    // Additional helper methods would be implemented here...
    private Double getCompletionRate(Long courseId) { return 0.0; }
    private Map<String, Object> getEngagementMetrics(Long courseId) { return new HashMap<>(); }
    private List<Map<String, Object>> getDropoffPoints(Long courseId) { return new ArrayList<>(); }
    private Map<String, Object> getTimeSpentDistribution(Long courseId) { return new HashMap<>(); }
    private Map<String, Object> getAssessmentAnalytics(Long courseId) { return new HashMap<>(); }
    private List<Map<String, Object>> getQuestionPerformance(Long courseId) { return new ArrayList<>(); }
    private Map<String, Object> getRevenueMetrics(Long courseId) { return new HashMap<>(); }
    private Double getAverageSessionDuration(Long gameId) { return 0.0; }
    private Double getGameCompletionRate(Long gameId) { return 0.0; }
    private Double getGameRetryRate(Long gameId) { return 0.0; }
    private Map<String, Object> getScoreDistribution(Long gameId) { return new HashMap<>(); }
    private Map<String, Object> getDifficultyAnalysis(Long gameId) { return new HashMap<>(); }
    private List<Map<String, Object>> getDailyPlayers(Long gameId) { return new ArrayList<>(); }
    private Map<String, Object> getPeakPlayTimes(Long gameId) { return new HashMap<>(); }
    private Long getNewUsersThisMonth() { return 0L; }
    private Double getUserGrowthRate() { return 0.0; }
    private Double getOverallCompletionRate() { return 0.0; }
    private Map<String, Object> getDailyActiveUsers() { return new HashMap<>(); }
    private Double getAverageSessionDuration() { return 0.0; }
    private Map<String, Object> getContentEngagement() { return new HashMap<>(); }
    private Double getTotalRevenue() { return 0.0; }
    private Double getMonthlyRevenue() { return 0.0; }
    private Double getRevenueGrowth() { return 0.0; }
}