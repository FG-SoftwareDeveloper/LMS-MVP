package com.learnhub.service;

import com.learnhub.model.Course;
import com.learnhub.model.User;
import com.learnhub.model.UserCourseProgress;
import com.learnhub.repository.CourseRepository;
import com.learnhub.repository.UserCourseProgressRepository;
import com.learnhub.repository.UserRepository;
import com.learnhub.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserCourseProgressRepository progressRepository;

    public Page<Course> getAllPublishedCourses(Pageable pageable) {
        return courseRepository.findByIsPublishedTrue(pageable);
    }

    public Page<Course> getCoursesByCategory(String category, Pageable pageable) {
        return courseRepository.findByCategoryAndIsPublishedTrue(category, pageable);
    }

    public Page<Course> searchCourses(String keyword, Pageable pageable) {
        return courseRepository.searchPublishedCourses(keyword, pageable);
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
    }

    public List<String> getAllCategories() {
        return courseRepository.findAllCategories();
    }

    public List<Course> getEnrolledCourses() {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        return courseRepository.findEnrolledCoursesByUserId(userPrincipal.getId());
    }

    public void enrollUserInCourse(Long courseId) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Course course = getCourseById(courseId);
        
        // Check if already enrolled
        if (progressRepository.findByUserIdAndCourseId(user.getId(), courseId).isPresent()) {
            throw new RuntimeException("User is already enrolled in this course");
        }
        
        // Create enrollment record
        UserCourseProgress progress = new UserCourseProgress(user, course);
        progressRepository.save(progress);
        
        // Update enrollment count
        course.setEnrollmentCount(course.getEnrollmentCount() + 1);
        courseRepository.save(course);
    }

    public Course createCourse(Course course) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        
        User instructor = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("Instructor not found"));
        
        course.setInstructor(instructor);
        course.setCreatedAt(LocalDateTime.now());
        course.setUpdatedAt(LocalDateTime.now());
        
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course courseDetails) {
        Course course = getCourseById(id);
        
        // Check if user is the instructor or admin
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        
        if (!course.getInstructor().getId().equals(userPrincipal.getId()) && 
            !userPrincipal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            throw new RuntimeException("You don't have permission to update this course");
        }
        
        course.setTitle(courseDetails.getTitle());
        course.setDescription(courseDetails.getDescription());
        course.setShortDescription(courseDetails.getShortDescription());
        course.setCategory(courseDetails.getCategory());
        course.setLevel(courseDetails.getLevel());
        course.setPrice(courseDetails.getPrice());
        course.setEstimatedDuration(courseDetails.getEstimatedDuration());
        course.setIsPublished(courseDetails.getIsPublished());
        course.setUpdatedAt(LocalDateTime.now());
        
        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {
        Course course = getCourseById(id);
        courseRepository.delete(course);
    }
}