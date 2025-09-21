package com.learnhub.repository;

import com.learnhub.model.Payment;
import com.learnhub.model.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
    List<Payment> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    List<Payment> findByCourseIdOrderByCreatedAtDesc(Long courseId);
    
    Optional<Payment> findByExternalSessionId(String externalSessionId);
    
    Optional<Payment> findByPaymentIntentId(String paymentIntentId);
    
    List<Payment> findByStatus(PaymentStatus status);
    
    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.status = 'COMPLETED'")
    BigDecimal getTotalRevenue();
    
    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.status = 'COMPLETED' AND p.createdAt >= :startDate")
    BigDecimal getRevenueAfterDate(@Param("startDate") LocalDateTime startDate);
    
    @Query("SELECT COUNT(p) FROM Payment p WHERE p.status = 'COMPLETED' AND p.createdAt >= :startDate")
    Long countCompletedPaymentsAfterDate(@Param("startDate") LocalDateTime startDate);
}