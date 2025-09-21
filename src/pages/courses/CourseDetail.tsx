import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Award, 
  CheckCircle,
  Lock,
  ArrowLeft,
  Download,
  Share2
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setCurrentCourse, setModules } from '../../store/slices/courseSlice';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { currentCourse, modules } = useSelector((state: RootState) => state.course);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockCourse = {
      id: id!,
      title: 'JavaScript Fundamentals',
      description: 'Master the fundamentals of JavaScript programming with comprehensive lessons, hands-on exercises, and real-world projects. This course covers everything from basic syntax to advanced concepts like closures, promises, and async/await.',
      thumbnail: 'https://images.pexels.com/photos/11035386/pexels-photo-11035386.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
      instructor: { 
        id: '1', 
        firstName: 'John', 
        lastName: 'Doe', 
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' 
      },
      category: 'Programming',
      level: 'BEGINNER' as const,
      duration: 120,
      enrollmentCount: 1520,
      rating: 4.8,
      price: 0,
      isEnrolled: false,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
    };

    const mockModules = [
      {
        id: '1',
        title: 'Getting Started with JavaScript',
        description: 'Introduction to JavaScript and setting up your development environment',
        order: 1,
        lessons: [
          {
            id: '1',
            title: 'What is JavaScript?',
            description: 'Understanding JavaScript and its role in web development',
            type: 'VIDEO' as const,
            videoUrl: 'https://example.com/video1',
            duration: 15,
            order: 1,
            isCompleted: true,
          },
          {
            id: '2',
            title: 'Setting up Development Environment',
            description: 'Installing Node.js, VS Code, and essential extensions',
            type: 'VIDEO' as const,
            videoUrl: 'https://example.com/video2',
            duration: 20,
            order: 2,
            isCompleted: true,
          },
          {
            id: '3',
            title: 'Your First JavaScript Program',
            description: 'Writing and running your first JavaScript code',
            type: 'INTERACTIVE' as const,
            duration: 25,
            order: 3,
            isCompleted: false,
          },
        ],
      },
      {
        id: '2',
        title: 'Variables and Data Types',
        description: 'Learn about JavaScript variables, data types, and operators',
        order: 2,
        lessons: [
          {
            id: '4',
            title: 'Variables and Constants',
            description: 'Understanding var, let, and const declarations',
            type: 'VIDEO' as const,
            videoUrl: 'https://example.com/video4',
            duration: 18,
            order: 1,
            isCompleted: false,
          },
          {
            id: '5',
            title: 'Data Types in JavaScript',
            description: 'Exploring primitive and reference data types',
            type: 'VIDEO' as const,
            videoUrl: 'https://example.com/video5',
            duration: 22,
            order: 2,
            isCompleted: false,
          },
          {
            id: '6',
            title: 'Practice: Working with Variables',
            description: 'Hands-on exercises with variables and data types',
            type: 'GAME' as const,
            gameId: 'js-variables-game',
            duration: 30,
            order: 3,
            isCompleted: false,
          },
        ],
      },
      {
        id: '3',
        title: 'Control Structures',
        description: 'Master conditional statements and loops in JavaScript',
        order: 3,
        lessons: [
          {
            id: '7',
            title: 'If Statements and Conditionals',
            description: 'Making decisions in your code with if/else statements',
            type: 'VIDEO' as const,
            videoUrl: 'https://example.com/video7',
            duration: 20,
            order: 1,
            isCompleted: false,
          },
          {
            id: '8',
            title: 'Loops and Iteration',
            description: 'Using for, while, and do-while loops effectively',
            type: 'VIDEO' as const,
            videoUrl: 'https://example.com/video8',
            duration: 25,
            order: 2,
            isCompleted: false,
          },
          {
            id: '9',
            title: 'Assessment: Control Structures',
            description: 'Test your understanding of conditional statements and loops',
            type: 'ASSESSMENT' as const,
            assessmentId: 'control-structures-quiz',
            duration: 15,
            order: 3,
            isCompleted: false,
          },
        ],
      },
    ];

    dispatch(setCurrentCourse(mockCourse));
    dispatch(setModules(mockModules));
  }, [id, dispatch]);

  if (!currentCourse) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'VIDEO':
        return Play;
      case 'TEXT':
        return BookOpen;
      case 'INTERACTIVE':
        return Award;
      case 'GAME':
        return Award;
      case 'ASSESSMENT':
        return CheckCircle;
      default:
        return BookOpen;
    }
  };

  const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = modules.reduce((acc, module) => 
    acc + module.lessons.filter(lesson => lesson.isCompleted).length, 0
  );
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        to="/courses"
        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Courses</span>
      </Link>

      {/* Course Header */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="relative h-64 md:h-80">
          <img
            src={currentCourse.thumbnail}
            alt={currentCourse.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{currentCourse.title}</h1>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span>{currentCourse.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{currentCourse.enrollmentCount.toLocaleString()} students</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(currentCourse.duration)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {currentCourse.instructor.avatar ? (
                <img
                  src={currentCourse.instructor.avatar}
                  alt={`${currentCourse.instructor.firstName} ${currentCourse.instructor.lastName}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
              )}
              <div>
                <p className="font-medium text-gray-900">
                  {currentCourse.instructor.firstName} {currentCourse.instructor.lastName}
                </p>
                <p className="text-sm text-gray-500">Instructor</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>

          {currentCourse.isEnrolled && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Your Progress</span>
                <span>{progressPercentage}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              {currentCourse.price === 0 ? 'Free' : `$${currentCourse.price}`}
            </div>
            {!currentCourse.isEnrolled ? (
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Enroll Now</span>
              </button>
            ) : (
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Continue Learning</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'curriculum', 'reviews', 'instructor'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Course</h3>
                <p className="text-gray-600 leading-relaxed">{currentCourse.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What You'll Learn</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Master JavaScript fundamentals and syntax</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Build interactive web applications</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Understand asynchronous programming</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Work with APIs and external data</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'curriculum' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Course Curriculum</h3>
                <div className="text-sm text-gray-500">
                  {totalLessons} lessons • {formatDuration(currentCourse.duration)}
                </div>
              </div>
              
              {modules.map((module) => (
                <div key={module.id} className="border border-gray-200 rounded-lg">
                  <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <h4 className="font-medium text-gray-900">{module.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {module.lessons.map((lesson) => {
                      const LessonIcon = getLessonIcon(lesson.type);
                      return (
                        <div key={lesson.id} className="p-4 flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            lesson.isCompleted 
                              ? 'bg-green-100 text-green-600' 
                              : currentCourse.isEnrolled 
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-100 text-gray-400'
                          }`}>
                            {lesson.isCompleted ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : currentCourse.isEnrolled ? (
                              <LessonIcon className="h-4 w-4" />
                            ) : (
                              <Lock className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900">{lesson.title}</h5>
                            <p className="text-sm text-gray-600">{lesson.description}</p>
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDuration(lesson.duration)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">{currentCourse.rating}</div>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Course Rating</div>
                </div>
                <div className="flex-1">
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 w-8">{rating}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500 w-8">
                          {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '7%' : rating === 2 ? '2%' : '1%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Recent Reviews</h4>
                {/* Mock reviews */}
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1"
                        alt="Reviewer"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">Sarah Chen</span>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">2 days ago</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Excellent course! The instructor explains concepts clearly and the hands-on exercises really help solidify the learning.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'instructor' && (
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <img
                  src={currentCourse.instructor.avatar}
                  alt={`${currentCourse.instructor.firstName} ${currentCourse.instructor.lastName}`}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {currentCourse.instructor.firstName} {currentCourse.instructor.lastName}
                  </h3>
                  <p className="text-gray-600 mb-3">Senior JavaScript Developer & Instructor</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>4.9 Instructor Rating</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>15,420 Students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>12 Courses</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">About the Instructor</h4>
                <p className="text-gray-600 leading-relaxed">
                  John is a seasoned JavaScript developer with over 8 years of experience building web applications. 
                  He has worked with companies ranging from startups to Fortune 500 companies and is passionate about 
                  teaching others the art of programming. His teaching style focuses on practical, hands-on learning 
                  that prepares students for real-world development challenges.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;