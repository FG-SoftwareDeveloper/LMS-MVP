import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Play, 
  BookOpen, 
  Clock
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { markLessonComplete, type Lesson, type Module } from '../../store/slices/courseSlice';
import { getJavaScriptContent } from '../../data/lessonContent';
import { getReactContent } from '../../data/reactContent';
import { getPythonDataScienceContent } from '../../data/pythonContent';
import { getCSSContent } from '../../data/cssContent';
import { getMachineLearningContent } from '../../data/machineLearningContent';
import { getFlutterContent } from '../../data/flutterContent';
import { getCybersecurityContent } from '../../data/cybersecurityContent';
import { getGoContent } from '../../data/goContent';
import WorkspaceLaunchPanel from '../../components/courses/WorkspaceLaunchPanel';
import { useAuth } from '../../hooks/useAuth';

const LessonViewer: React.FC = () => {
  const { courseId, moduleId, lessonId } = useParams<{ 
    courseId: string; 
    moduleId: string; 
    lessonId: string; 
  }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { modules } = useSelector((state: RootState) => state.course);

  const { user } = useAuth();

  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);

  // Get course-specific content based on courseId
  const getCourseContent = () => {
    switch (courseId) {
      case 'javascript-fundamentals':
      case '1':
        return getJavaScriptContent();
      case 'react-development':
      case '2':
        return getReactContent();
      case 'python-data-science':
      case '3':
        return getPythonDataScienceContent();
      case 'machine-learning':
      case '4':
        return getMachineLearningContent();
      case 'flutter-mobile':
      case '5':
        return getFlutterContent();
      case 'cybersecurity-fundamentals':
      case '6':
        return getCybersecurityContent();
      case 'go-cloud-services':
      case '7':
        return getGoContent();
      case 'css-mastery':
      case 'css-fundamentals':
        return getCSSContent();
      default:
        return getJavaScriptContent(); // fallback
    }
  };

  useEffect(() => {
    // Find current module and lesson from Redux store
    const module = modules.find(m => m.id === moduleId);
    const lesson = module?.lessons.find(l => l.id === lessonId);
    
    if (module && lesson) {
      setCurrentModule(module);
      setCurrentLesson(lesson);
    }
  }, [moduleId, lessonId, modules]);

  const handleCompleteLesson = () => {
    if (currentLesson) {
      dispatch(markLessonComplete(currentLesson.id));
      
      // Move to next lesson or back to course
      const nextLesson = getNextLesson();
      if (nextLesson) {
        navigate(`/courses/${courseId}/modules/${nextLesson.moduleId}/lessons/${nextLesson.id}`);
      } else {
        // Course completed, go back to course detail
        navigate(`/courses/${courseId}`);
      }
    }
  };

  const getNextLesson = () => {
    const allLessons: Array<Lesson & { moduleId: string }> = [];
    modules.forEach(module => {
      module.lessons.forEach((lesson) => {
        allLessons.push({ ...lesson, moduleId: module.id });
      });
    });

    const currentIndex = allLessons.findIndex(l => l.id === lessonId);
    return currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  };

  const getPreviousLesson = () => {
    const allLessons: Array<Lesson & { moduleId: string }> = [];
    modules.forEach(module => {
      module.lessons.forEach((lesson) => {
        allLessons.push({ ...lesson, moduleId: module.id });
      });
    });

    const currentIndex = allLessons.findIndex(l => l.id === lessonId);
    return currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  };

  const renderLessonContent = () => {
    if (!currentLesson) return null;

    const lessonType = (currentLesson.type || '').toLowerCase();
    const workspacePanel = currentLesson.workspace ? (
      <WorkspaceLaunchPanel workspace={currentLesson.workspace} student={user} />
    ) : null;

    // For now, render basic content based on lesson type
    switch (lessonType) {
      case 'video':
        return (
          <div className="space-y-4">
            <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
              <div className="flex items-center justify-center text-white">
                <div className="text-center">
                  <Play className="h-16 w-16 mx-auto mb-4 opacity-70" />
                  <p>Video Player Placeholder</p>
                  <p className="text-sm opacity-70">Video content will be added here</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'text':
        // Get real lesson content if available
        const courseContent = getCourseContent();
        const contentData = courseContent[lessonId || ''];
        
        if (contentData && contentData.content) {
          return (
            <div className="space-y-8">
              <div className="prose max-w-none space-y-6">
                {contentData.content.map((section: any, index: number) => (
                  <div key={section.id || index} className="bg-white dark:bg-gray-800 rounded-lg p-6 border dark:border-gray-700">
                    {section.title && (
                      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{section.title}</h3>
                    )}
                    {section.type === 'text' && (
                      <div className="prose max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                          {section.content}
                        </p>
                      </div>
                    )}
                    {section.type === 'code' && (
                      <div>
                        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-green-400 text-sm">
                            <code>{section.content}</code>
                          </pre>
                        </div>
                        {section.language && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Language: {section.language}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {workspacePanel}
            </div>
          );
        }

        // Fallback content if no specific content is found
        return (
          <div className="space-y-8">
            <div className="prose max-w-none">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{currentLesson.title}</h3>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p>This is a text-based lesson. In a full implementation, this would contain:</p>
                  <ul className="mt-4 space-y-2">
                    <li>• Rich text content with explanations</li>
                    <li>• Code examples and syntax highlighting</li>
                    <li>• Interactive exercises</li>
                    <li>• Images and diagrams</li>
                  </ul>
                  <p className="mt-4">
                    <strong>Lesson Topic:</strong> {currentLesson.title}
                  </p>
                  <p className="mt-2">
                    <strong>Duration:</strong> {currentLesson.duration} minutes
                  </p>
                </div>
              </div>
            </div>
            {workspacePanel}
          </div>
        );

      default:
        return (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
            <p className="text-gray-600 dark:text-gray-400">This lesson type ({currentLesson.type}) will be implemented soon.</p>
          </div>
        );
    }
  };

  if (!currentLesson || !currentModule) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading lesson...</p>
        </div>
      </div>
    );
  }

  const nextLesson = getNextLesson();
  const previousLesson = getPreviousLesson();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {currentLesson.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {currentLesson.duration} min
                </span>
                <span>{currentModule.title}</span>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                  {currentLesson.type}
                </span>
              </div>
            </div>
            <Link
              to={`/courses/${courseId}`}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Course</span>
            </Link>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="mb-8">
          {renderLessonContent()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t dark:border-gray-700">
          <div>
            {previousLesson && (
              <Link
                to={`/courses/${courseId}/modules/${previousLesson.moduleId}/lessons/${previousLesson.id}`}
                className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous Lesson</span>
              </Link>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleCompleteLesson}
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Mark Complete</span>
            </button>
            {nextLesson && (
              <Link
                to={`/courses/${courseId}/modules/${nextLesson.moduleId}/lessons/${nextLesson.id}`}
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Next Lesson</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;