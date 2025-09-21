package com.learnhub.repository;

import com.learnhub.model.CustomReport;
import com.learnhub.model.ReportType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomReportRepository extends JpaRepository<CustomReport, Long> {
    
    List<CustomReport> findByCreatedByIdOrderByCreatedAtDesc(Long createdById);
    
    List<CustomReport> findByTypeOrderByCreatedAtDesc(ReportType type);
    
    List<CustomReport> findByIsPublicTrueOrderByCreatedAtDesc();
    
    List<CustomReport> findByIsScheduledTrueOrderByCreatedAtDesc();
    
    @Query("SELECT cr FROM CustomReport cr WHERE cr.name LIKE %:keyword% OR cr.description LIKE %:keyword%")
    List<CustomReport> searchReports(@Param("keyword") String keyword);
    
    @Query("SELECT COUNT(cr) FROM CustomReport cr WHERE cr.createdBy.id = :userId")
    Long countByCreatedById(@Param("userId") Long userId);
}