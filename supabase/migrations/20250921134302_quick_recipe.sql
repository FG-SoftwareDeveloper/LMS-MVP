-- Insert default roles
INSERT IGNORE INTO roles (name, description) VALUES 
('ADMIN', 'Administrator role with full access'),
('INSTRUCTOR', 'Instructor role for course management'),
('STUDENT', 'Student role for learning');

-- Sample course categories
INSERT IGNORE INTO courses (title, description, category, level, price, estimated_duration, is_published, enrollment_count, rating, rating_count, instructor_id, created_at, updated_at) VALUES
('JavaScript Fundamentals', 'Learn the basics of JavaScript programming', 'Programming', 'BEGINNER', 0.00, 120, true, 0, 0.00, 0, 2, NOW(), NOW()),
('React Development', 'Master React.js for modern web development', 'Web Development', 'INTERMEDIATE', 49.99, 180, true, 0, 0.00, 0, 2, NOW(), NOW()),
('Python for Data Science', 'Learn Python for data analysis and machine learning', 'Data Science', 'INTERMEDIATE', 79.99, 240, true, 0, 0.00, 0, 2, NOW(), NOW());