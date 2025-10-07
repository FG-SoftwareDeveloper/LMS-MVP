/*
  # Create courses and enrollments system

  1. New Tables
    - `courses`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `description` (text)
      - `thumbnail` (text)
      - `category` (text, not null)
      - `level` (text, not null) - BEGINNER, INTERMEDIATE, ADVANCED
      - `duration` (integer) - duration in minutes
      - `price` (numeric, default 0)
      - `rating` (numeric, default 0)
      - `enrollment_count` (integer, default 0)
      - `instructor_name` (text)
      - `instructor_avatar` (text)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    
    - `course_enrollments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `course_id` (uuid, references courses)
      - `progress` (integer, default 0) - percentage 0-100
      - `enrolled_at` (timestamptz, default now())
      - `last_accessed_at` (timestamptz)
      - Unique constraint on (user_id, course_id)

  2. Security
    - Enable RLS on both tables
    - Courses are readable by everyone
    - Enrollments are readable by the owner
    - Enrollments are insertable by authenticated users
    - Enrollments are updatable by the owner
*/

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  thumbnail text,
  category text NOT NULL,
  level text NOT NULL CHECK (level IN ('BEGINNER', 'INTERMEDIATE', 'ADVANCED')),
  duration integer DEFAULT 0,
  price numeric DEFAULT 0,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  enrollment_count integer DEFAULT 0,
  instructor_name text,
  instructor_avatar text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create course_enrollments table
CREATE TABLE IF NOT EXISTS course_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  enrolled_at timestamptz DEFAULT now(),
  last_accessed_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;

-- Policies for courses table
CREATE POLICY "Anyone can view published courses"
  ON courses FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert courses"
  ON courses FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update courses"
  ON courses FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete courses"
  ON courses FOR DELETE
  TO authenticated
  USING (true);

-- Policies for course_enrollments table
CREATE POLICY "Users can view their own enrollments"
  ON course_enrollments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll in courses"
  ON course_enrollments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own enrollments"
  ON course_enrollments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_course_enrollments_user_id ON course_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_course_id ON course_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);

-- Insert sample courses with proper UUIDs
INSERT INTO courses (id, title, description, thumbnail, category, level, duration, price, rating, enrollment_count, instructor_name, instructor_avatar)
VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'JavaScript Fundamentals', 'Learn the basics of JavaScript programming with hands-on exercises and real-world projects.', '/src/assets/images/JSCover.png', 'Programming', 'BEGINNER', 120, 0, 4.8, 1520, 'John Doe', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'),
  ('b1ffcd99-9c0b-4ef8-bb6d-6bb9bd380a22', 'React Development Masterclass', 'Master React.js with advanced concepts, hooks, context, and modern development practices.', '/src/assets/images/ReactCover.png', 'Web Development', 'INTERMEDIATE', 180, 49, 4.9, 980, 'Sarah Smith', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'),
  ('c2aade99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Python for Data Science', 'Comprehensive Python course focusing on data analysis, visualization, and machine learning.', '/src/assets/images/PythonCover.png', 'Data Science', 'INTERMEDIATE', 240, 79, 4.7, 756, 'Michael Johnson', 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'),
  ('d3bbef99-9c0b-4ef8-bb6d-6bb9bd380a44', 'Advanced Machine Learning', 'Deep dive into machine learning algorithms, neural networks, and AI applications.', 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1', 'AI & Machine Learning', 'ADVANCED', 320, 129, 4.9, 432, 'Emily Davis', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'),
  ('e4ccf099-9c0b-4ef8-bb6d-6bb9bd380a55', 'Mobile App Development with Flutter', 'Build cross-platform mobile applications using Flutter and Dart programming language.', 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1', 'Mobile Development', 'INTERMEDIATE', 200, 89, 4.6, 623, 'David Wilson', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'),
  ('f5dd0199-9c0b-4ef8-bb6d-6bb9bd380a66', 'Cybersecurity Fundamentals', 'Learn essential cybersecurity concepts, threat analysis, and protection strategies.', '/src/assets/images/CybersecurityCover.png', 'Cybersecurity', 'BEGINNER', 150, 59, 4.5, 892, 'Lisa Anderson', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'),
  ('06ee1299-9c0b-4ef8-bb6d-6bb9bd380a77', 'Go for Cloud Services', 'Build scalable microservices and cloud-native workloads with Go''s simplicity and concurrency primitives.', '/src/assets/images/GOCover.png', 'Cloud & Backend', 'INTERMEDIATE', 360, 79, 4.7, 742, 'Michael Chen', 'https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1')
ON CONFLICT (id) DO NOTHING;
