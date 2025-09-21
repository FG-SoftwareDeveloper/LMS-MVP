package com.learnhub.service;

import com.learnhub.model.*;
import com.learnhub.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserCourseProgressRepository progressRepository;

    @Autowired
    private GameSessionRepository gameSessionRepository;

    @Autowired
    private AssessmentAttemptRepository attemptRepository;

    @Autowired
    private UserLevelRepository userLevelRepository;

    public Map<String, Object> getStudentDashboardData(Long studentId) {
        Map<String, Object> data = new HashMap<>();
        
        // Basic stats
        data.put("enrolledCourses", progressRepository.countByUserId(studentId));
        data.put("completedCourses", progressRepository.countCompletedByUserId(studentId));
        data.put("totalGameSessions", gameSessionRepository.countByUserId(studentId));
        data.put("totalAssessments", attemptRepository.countByStudentId(studentId));
        
        // Learning progress over time
        data.put("weeklyProgress", getWeeklyProgress(studentId));
        data.put("monthlyProgress", getMonthlyProgress(studentId));
        
        // Recent activity
        data.put("recentCourses", getRecentCourses(studentId));
        data.put("recentGames", getRecentGames(studentId));
        data.put("recentAchievements", getRecentAchievements(studentId));
        
        // Performance metrics
        data.put("averageAssessmentScore", getAverageAssessmentScore(studentId));
        data.put("learningStreak", getLearningStreak(studentId));
        data.put("totalPoints", getTotalPoints(studentId));
        
        return data;
    }

    public Map<String, Object> getInstructorCourseAnalytics(Long instructorId, Long courseId) {
        Map<String, Object> data = new HashMap<>();
        
        // Course overview
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        
        data.put("course", course);
        data.put("totalEnrollments", progressRepository.countByCourseId(courseId));
        data.put("activeStudents", progressRepository.countActiveByCourseId(courseId));
        data.put("completionRate", getCompletionRate(courseId));
        data.put("averageProgress", progressRepository.getAverageProgressByCourseId(courseId));
        
        // Student engagement
        data.put("engagementMetrics", getEngagementMetrics(courseId));
        data.put("dropoffPoints", getDropoffPoints(courseId));
        data.put("timeSpentDistribution", getTimeSpentDistribution(courseId));
        
        // Assessment performance
        data.put("assessmentAnalytics", getAssessmentAnalytics(courseId));
        data.put("questionPerformance", getQuestionPerformance(courseId));
        
        // Revenue analytics (if paid course)
        if (!course.isFree()) {
            data.put("revenueMetrics", getRevenueMetrics(courseId));
        }
        
        return data;
    }

    public Map<String, Object> getGameAnalytics(Long gameId) {
        Map<String, Object> data = new HashMap<>();
        
        // Basic game stats
        data.put("totalSessions", gameSessionRepository.countByGameId(gameId));
        data.put("uniquePlayers", gameSessionRepository.countUniquePlayersByGameId(gameId));
        data.put("averageScore", gameSessionRepository.getAverageScoreByGameId(gameId));
        data.put("highestScore", gameSessionRepository.getHighestScoreByGameId(gameId));
        
        // Performance metrics
        data.put("averageSessionDuration", getAverageSessionDuration(gameId));
        data.put("completionRate", getGameCompletionRate(gameId));
        data.put("retryRate", getGameRetryRate(gameId));
        
        // Score distribution
        data.put("scoreDistribution", getScoreDistribution(gameId));
        data.put("difficultyAnalysis", getDifficultyAnalysis(gameId));
        
        // Time-based analytics
        data.put("dailyPlayers", getDailyPlayers(gameId));
        data.put("peakPlayTimes", getPeakPlayTimes(gameId));
        
        return data;
    }

    public Map<String, Object> getSystemAnalytics() {
        Map<String, Object> data = new HashMap<>();
        
        // User metrics
        data.put("totalUsers", userRepository.count());
        data.put("activeUsers", userRepository.countActiveUsers());
        data.put("newUsersThisMonth", getNewUsersThisMonth());
        data.put("userGrowthRate", getUserGrowthRate());
        
        // Content metrics
        data.put("totalCourses", courseRepository.count());
        data.put("publishedCourses", courseRepository.countByIsPublishedTrue());
        data.put("totalEnrollments", progressRepository.count());
        data.put("courseCompletionRate", getOverallCompletionRate());
        
        // Engagement metrics
        data.put("dailyActiveUsers", getDailyActiveUsers());
        data.put("averageSessionDuration", getAverageSessionDuration());
        data.put("contentEngagement", getContentEngagement());
        
        // Revenue metrics
        data.put("totalRevenue", getTotalRevenue());
        data.put("monthlyRevenue", getMonthlyRevenue());
        data.put("revenueGrowth", getRevenueGrowth());
        
        return data;
    }

    // Helper methods for analytics calculations
    private List<Map<String, Object>> getWeeklyProgress(Long studentId) {
        // Implementation for weekly progress calculation
        return new ArrayList<>();
    }

    private List<Map<String, Object>> getMonthlyProgress(Long studentId) {
        // Implementation for monthly progress calculation
        return new ArrayList<>();
    }

    private List<Course> getRecentCourses(Long studentId) {
        return progressRepository.findRecentByUserId(studentId, 5);
    }

    private List<GameSession> getRecentGames(Long studentId) {
        return gameSessionRepository.findByUserIdOrderByCreatedAtDesc(studentId)
                .stream().limit(5).collect(Collectors.toList());
    }

    private List<UserAchievement> getRecentAchievements(Long studentId) {
        // Implementation would fetch recent achievements
        return new ArrayList<>();
    }

    private Double getAverageAssessmentScore(Long studentId) {
        return attemptRepository.getAverageScoreByStudentId(studentId);
    }

    private Integer getLearningStreak(Long studentId) {
        UserLevel userLevel = userLevelRepository.findByUserId(studentId).orElse(null);
        return userLevel != null ? userLevel.getLearningStreak() : 0;
    }

    private Integer getTotalPoints(Long studentId) {
        UserLevel userLevel = userLevelRepository.findByUserId(studentId).orElse(null);
        return userLevel != null ? userLevel.getTotalPoints() : 0;
    }

    private Double getCompletionRate(Long courseId) {
        Long totalEnrollments = progressRepository.countByCourseId(courseId);
        Long completedEnrollments = progressRepository.countCompletedByCourseId(courseId);
        return totalEnrollments > 0 ? (double) completedEnrollments / totalEnrollments * 100 : 0.0;
    }

    private Map<String, Object> getEngagementMetrics(Long courseId) {
        Map<String, Object> metrics = new HashMap<>();
        // Implementation for engagement calculations
        return metrics;
    }

    private List<Map<String, Object>> getDropoffPoints(Long courseId) {
        // Implementation for identifying where students drop off
        return new ArrayList<>();
    }

    private Map<String, Object> getTimeSpentDistribution(Long courseId) {
        // Implementation for time spent analysis
        return new HashMap<>();
    }

    private Map<String, Object> getAssessmentAnalytics(Long courseId) {
        // Implementation for assessment performance analysis
        return new HashMap<>();
    }

    private List<Map<String, Object>> getQuestionPerformance(Long courseId) {
        // Implementation for question-level analytics
        return new ArrayList<>();
    }

    private Map<String, Object> getRevenueMetrics(Long courseId) {
        // Implementation for revenue analysis
        return new HashMap<>();
    }

    private Double getAverageSessionDuration(Long gameId) {
        return gameSessionRepository.getAverageSessionDurationByGameId(gameId);
    }

    private Double getGameCompletionRate(Long gameId) {
        Long totalSessions = gameSessionRepository.countByGameId(gameId);
        Long completedSessions = gameSessionRepository.countCompletedByGameId(gameId);
        return totalSessions > 0 ? (double) completedSessions / totalSessions * 100 : 0.0;
    }

    private Double getGameRetryRate(Long gameId) {
        // Implementation for retry rate calculation
        return 0.0;
    }

    private Map<String, Object> getScoreDistribution(Long gameId) {
        // Implementation for score distribution analysis
        return new HashMap<>();
    }

    private Map<String, Object> getDifficultyAnalysis(Long gameId) {
        // Implementation for difficulty analysis
        return new HashMap<>();
    }

    private List<Map<String, Object>> getDailyPlayers(Long gameId) {
        // Implementation for daily player count
        return new ArrayList<>();
    }

    private Map<String, Object> getPeakPlayTimes(Long gameId) {
        // Implementation for peak time analysis
        return new HashMap<>();
    }

    private Long getNewUsersThisMonth() {
        LocalDateTime monthStart = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        return userRepository.countByCreatedAtAfter(monthStart);
    }

    private Double getUserGrowthRate() {
        // Implementation for user growth rate calculation
        return 0.0;
    }

    private Double getOverallCompletionRate() {
        Long totalEnrollments = progressRepository.count();
        Long completedEnrollments = progressRepository.countCompleted();
        return totalEnrollments > 0 ? (double) completedEnrollments / totalEnrollments * 100 : 0.0;
    }

    private Map<String, Object> getDailyActiveUsers() {
        // Implementation for DAU calculation
        return new HashMap<>();
    }

    private Double getAverageSessionDuration() {
        // Implementation for overall session duration
        return 0.0;
    }

    private Map<String, Object> getContentEngagement() {
        // Implementation for content engagement metrics
        return new HashMap<>();
    }

    private Double getTotalRevenue() {
        // Implementation for total revenue calculation
        return 0.0;
    }

    private Double getMonthlyRevenue() {
        // Implementation for monthly revenue calculation
        return 0.0;
    }

    private Double getRevenueGrowth() {
        // Implementation for revenue growth calculation
        return 0.0;
    }
}