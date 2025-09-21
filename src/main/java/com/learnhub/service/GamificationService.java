package com.learnhub.service;

import com.learnhub.model.*;
import com.learnhub.repository.*;
import com.learnhub.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class GamificationService {

    @Autowired
    private UserLevelRepository userLevelRepository;

    @Autowired
    private AchievementRepository achievementRepository;

    @Autowired
    private UserAchievementRepository userAchievementRepository;

    @Autowired
    private UserRepository userRepository;

    public UserLevel getUserLevel(Long userId) {
        return userLevelRepository.findByUserId(userId)
                .orElseGet(() -> createUserLevel(userId));
    }

    public UserLevel getCurrentUserLevel() {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        return getUserLevel(userPrincipal.getId());
    }

    private UserLevel createUserLevel(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        UserLevel userLevel = new UserLevel(user);
        return userLevelRepository.save(userLevel);
    }

    public void addPoints(Long userId, Integer points, String reason) {
        UserLevel userLevel = getUserLevel(userId);
        Integer oldLevel = userLevel.getCurrentLevel();
        
        userLevel.addPoints(points);
        userLevel.setLastActivityDate(LocalDateTime.now());
        
        // Update streak
        updateLearningStreak(userLevel);
        
        userLevelRepository.save(userLevel);
        
        // Check for level up achievements
        if (userLevel.getCurrentLevel() > oldLevel) {
            checkLevelUpAchievements(userId, userLevel.getCurrentLevel());
        }
        
        // Check for point-based achievements
        checkPointAchievements(userId, userLevel.getTotalPoints());
    }

    private void updateLearningStreak(UserLevel userLevel) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime lastActivity = userLevel.getLastActivityDate();
        
        if (lastActivity == null) {
            userLevel.setLearningStreak(1);
            userLevel.setLastActivityDate(now);
            return;
        }
        
        long daysBetween = ChronoUnit.DAYS.between(lastActivity.toLocalDate(), now.toLocalDate());
        
        if (daysBetween == 0) {
            // Same day, no change to streak
            return;
        } else if (daysBetween == 1) {
            // Consecutive day, increment streak
            userLevel.setLearningStreak(userLevel.getLearningStreak() + 1);
            if (userLevel.getLearningStreak() > userLevel.getMaxStreak()) {
                userLevel.setMaxStreak(userLevel.getLearningStreak());
            }
        } else {
            // Streak broken, reset to 1
            userLevel.setLearningStreak(1);
        }
        
        // Check streak achievements
        checkStreakAchievements(userLevel.getUser().getId(), userLevel.getLearningStreak());
    }

    public void awardAchievement(Long userId, Long achievementId) {
        // Check if user already has this achievement
        if (userAchievementRepository.findByUserIdAndAchievementId(userId, achievementId).isPresent()) {
            return;
        }
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Achievement achievement = achievementRepository.findById(achievementId)
                .orElseThrow(() -> new RuntimeException("Achievement not found"));
        
        UserAchievement userAchievement = new UserAchievement(user, achievement);
        userAchievementRepository.save(userAchievement);
        
        // Award points for the achievement
        addPoints(userId, achievement.getPoints(), "Achievement: " + achievement.getName());
    }

    private void checkLevelUpAchievements(Long userId, Integer currentLevel) {
        // Check for level-based achievements
        List<Achievement> levelAchievements = achievementRepository.findByTypeAndIsActive(
                AchievementType.GENERAL, true);
        
        for (Achievement achievement : levelAchievements) {
            // Parse criteria to check if level requirement is met
            // This is a simplified example - in practice, you'd have more sophisticated criteria parsing
            if (achievement.getName().contains("Level " + currentLevel)) {
                awardAchievement(userId, achievement.getId());
            }
        }
    }

    private void checkPointAchievements(Long userId, Integer totalPoints) {
        List<Achievement> pointAchievements = achievementRepository.findByTypeAndIsActive(
                AchievementType.GENERAL, true);
        
        for (Achievement achievement : pointAchievements) {
            // Check point-based achievements
            if (achievement.getName().contains("Points") && totalPoints >= 1000) {
                awardAchievement(userId, achievement.getId());
            }
        }
    }

    private void checkStreakAchievements(Long userId, Integer streak) {
        List<Achievement> streakAchievements = achievementRepository.findByTypeAndIsActive(
                AchievementType.STREAK, true);
        
        for (Achievement achievement : streakAchievements) {
            // Check streak-based achievements
            if (streak >= 7 && achievement.getName().contains("Week Streak")) {
                awardAchievement(userId, achievement.getId());
            } else if (streak >= 30 && achievement.getName().contains("Month Streak")) {
                awardAchievement(userId, achievement.getId());
            }
        }
    }

    public List<UserAchievement> getUserAchievements(Long userId) {
        return userAchievementRepository.findByUserIdOrderByEarnedAtDesc(userId);
    }

    public List<UserLevel> getLeaderboard(int limit) {
        return userLevelRepository.findTopByOrderByTotalPointsDesc(limit);
    }

    public void checkCourseCompletionAchievements(Long userId, Long courseId) {
        // Award points for course completion
        addPoints(userId, 500, "Course completion");
        
        // Check for course completion achievements
        List<Achievement> courseAchievements = achievementRepository.findByTypeAndIsActive(
                AchievementType.COURSE_COMPLETION, true);
        
        for (Achievement achievement : courseAchievements) {
            awardAchievement(userId, achievement.getId());
        }
    }

    public void checkGameScoreAchievements(Long userId, Integer score, Long gameId) {
        // Award points based on game score
        Integer points = Math.min(score / 10, 100); // Max 100 points per game
        addPoints(userId, points, "Game score: " + score);
        
        // Check for high score achievements
        List<Achievement> gameAchievements = achievementRepository.findByTypeAndIsActive(
                AchievementType.GAME_SCORE, true);
        
        for (Achievement achievement : gameAchievements) {
            if (score >= 1000 && achievement.getName().contains("High Score")) {
                awardAchievement(userId, achievement.getId());
            }
        }
    }
}