import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, Play, BookOpen } from 'lucide-react';
import { Course } from '../../store/slices/courseSlice';

interface CourseCardProps {
  course: Course;
  compact?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, compact = false }) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'BEGINNER':
        return 'bg-green-100 text-green-800';
      case 'INTERMEDIATE':
        return 'bg-yellow-100 text-yellow-800';
      case 'ADVANCED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (compact) {
    return (
      <Link
        to={`/courses/${course.id}`}
        className="block bg-white rounded-lg border hover:shadow-md transition-shadow"
      >
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                {course.title}
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                {course.instructor.firstName} {course.instructor.lastName}
              </p>
              {course.isEnrolled && course.progress !== undefined && (
                <div className="mb-2">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              )}
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatDuration(course.duration)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span>{course.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
        </div>
        {course.isEnrolled && (
          <div className="absolute top-4 right-4">
            <div className="bg-white rounded-full p-2 shadow-sm">
              <BookOpen className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {course.description}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          {course.instructor.avatar ? (
            <img
              src={course.instructor.avatar}
              alt={`${course.instructor.firstName} ${course.instructor.lastName}`}
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 bg-gray-300 rounded-full" />
          )}
          <span className="text-sm text-gray-600">
            {course.instructor.firstName} {course.instructor.lastName}
          </span>
        </div>
        
        {course.isEnrolled && course.progress !== undefined && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatDuration(course.duration)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{course.enrollmentCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>{course.rating}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-gray-900">
            {course.price === 0 ? 'Free' : `$${course.price}`}
          </div>
          <Link
            to={`/courses/${course.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            {course.isEnrolled ? (
              <>
                <Play className="h-4 w-4" />
                <span>Continue</span>
              </>
            ) : (
              <>
                <BookOpen className="h-4 w-4" />
                <span>Enroll</span>
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;