// Content types for lesson content
export interface LessonContent {
  id: string;
  title: string;
  type: 'text' | 'video' | 'interactive' | 'quiz';
  duration: number; // in minutes
  content: ContentSection[];
}

export interface ContentSection {
  id: string;
  type: 'text' | 'code' | 'image' | 'video' | 'exercise';
  title?: string;
  content: string;
  language?: string; // for code blocks
  hint?: string; // for exercises
}

export interface ModuleContent {
  id: string;
  title: string;
  description: string;
  lessons: LessonContent[];
}

export interface CourseContent {
  id: string;
  title: string;
  description: string;
  modules: ModuleContent[];
}