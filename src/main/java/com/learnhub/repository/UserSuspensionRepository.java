package com.learnhub.repository;

import com.learnhub.model.UserSuspension;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserSuspensionRepository extends JpaRepository<UserSuspension, Long> {
    
    List<UserSuspension> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    List<UserSuspension> findByUserIdAndIsActiveTrue(Long userId);
    
    List<UserSuspension> findBySuspendedByIdOrderByCreatedAtDesc(Long suspendedById);
    
    @Query("SELECT us FROM UserSuspension us WHERE us.isActive = true AND us.suspendedUntil < :now")
    List<UserSuspension> findExpiredSuspensions(@Param("now") LocalDateTime now);
    
    @Query("SELECT COUNT(us) FROM UserSuspension us WHERE us.isActive = true")
    Long countActiveSuspensions();
    
    @Query("SELECT COUNT(us) FROM UserSuspension us WHERE us.createdAt >= :startDate")
    Long countSuspensionsAfterDate(@Param("startDate") LocalDateTime startDate);
}