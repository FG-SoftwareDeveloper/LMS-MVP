import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface CourseData {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  category: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  duration: number;
  price: number;
  rating: number;
  enrollment_count: number;
  instructor_name: string | null;
  instructor_avatar: string | null;
  created_at: string;
  updated_at: string;
}

export interface EnrollmentData {
  id: string;
  user_id: string;
  course_id: string;
  progress: number;
  enrolled_at: string;
  last_accessed_at: string;
}

export const courseService = {
  async getAllCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as CourseData[];
  },

  async getCourseById(courseId: string) {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .maybeSingle();

    if (error) throw error;
    return data as CourseData | null;
  },

  async getEnrolledCourses(userId: string) {
    const { data, error } = await supabase
      .from('course_enrollments')
      .select(`
        *,
        courses (*)
      `)
      .eq('user_id', userId)
      .order('enrolled_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async isEnrolled(userId: string, courseId: string) {
    const { data, error } = await supabase
      .from('course_enrollments')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .maybeSingle();

    if (error) throw error;
    return !!data;
  },

  async enrollInCourse(userId: string, courseId: string) {
    const { data, error } = await supabase
      .from('course_enrollments')
      .insert({
        user_id: userId,
        course_id: courseId,
        progress: 0,
      })
      .select()
      .single();

    if (error) throw error;

    await supabase
      .from('courses')
      .update({ enrollment_count: supabase.rpc('increment', { row_id: courseId }) })
      .eq('id', courseId);

    return data as EnrollmentData;
  },

  async updateProgress(userId: string, courseId: string, progress: number) {
    const { data, error } = await supabase
      .from('course_enrollments')
      .update({
        progress,
        last_accessed_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .select()
      .single();

    if (error) throw error;
    return data as EnrollmentData;
  },
};
