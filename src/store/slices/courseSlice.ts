import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  category: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  duration: number; // in minutes
  enrollmentCount: number;
  rating: number;
  price: number;
  isEnrolled: boolean;
  progress?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'VIDEO' | 'TEXT' | 'INTERACTIVE' | 'GAME' | 'ASSESSMENT';
  content?: string;
  videoUrl?: string;
  gameId?: string;
  assessmentId?: string;
  duration: number;
  order: number;
  isCompleted: boolean;
}

interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  modules: Module[];
  enrolledCourses: Course[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  modules: [],
  enrolledCourses: [],
  isLoading: false,
  error: null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    setCurrentCourse: (state, action: PayloadAction<Course | null>) => {
      state.currentCourse = action.payload;
    },
    setModules: (state, action: PayloadAction<Module[]>) => {
      state.modules = action.payload;
    },
    setEnrolledCourses: (state, action: PayloadAction<Course[]>) => {
      state.enrolledCourses = action.payload;
    },
    updateCourseProgress: (state, action: PayloadAction<{ courseId: string; progress: number }>) => {
      const course = state.courses.find(c => c.id === action.payload.courseId);
      if (course) {
        course.progress = action.payload.progress;
      }
      const enrolledCourse = state.enrolledCourses.find(c => c.id === action.payload.courseId);
      if (enrolledCourse) {
        enrolledCourse.progress = action.payload.progress;
      }
    },
    markLessonComplete: (state, action: PayloadAction<string>) => {
      state.modules.forEach(module => {
        const lesson = module.lessons.find(l => l.id === action.payload);
        if (lesson) {
          lesson.isCompleted = true;
        }
      });
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setCourses,
  setCurrentCourse,
  setModules,
  setEnrolledCourses,
  updateCourseProgress,
  markLessonComplete,
  setError,
} = courseSlice.actions;

export default courseSlice.reducer;