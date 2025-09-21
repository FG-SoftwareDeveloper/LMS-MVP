package com.learnhub.repository;

import com.learnhub.model.ForumPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ForumPostRepository extends JpaRepository<ForumPost, Long> {
    
    Page<ForumPost> findByForumIdAndParentPostIsNullOrderByIsPinnedDescCreatedAtDesc(Long forumId, Pageable pageable);
    
    List<ForumPost> findByParentPostIdOrderByCreatedAtAsc(Long parentPostId);
    
    List<ForumPost> findByAuthorIdOrderByCreatedAtDesc(Long authorId);
    
    @Query("SELECT fp FROM ForumPost fp WHERE fp.forum.id = :forumId AND fp.isApproved = true AND fp.parentPost IS NULL ORDER BY fp.isPinned DESC, fp.createdAt DESC")
    Page<ForumPost> findApprovedTopLevelPosts(@Param("forumId") Long forumId, Pageable pageable);
    
    @Query("SELECT COUNT(fp) FROM ForumPost fp WHERE fp.forum.id = :forumId AND fp.parentPost IS NULL")
    Long countTopLevelPostsByForumId(@Param("forumId") Long forumId);
    
    @Query("SELECT fp FROM ForumPost fp WHERE LOWER(fp.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(fp.content) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<ForumPost> searchPosts(@Param("keyword") String keyword, Pageable pageable);
}