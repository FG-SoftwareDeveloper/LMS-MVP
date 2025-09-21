import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, BookOpen, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setCourses, setLoading } from '../../store/slices/courseSlice';
import CourseCard from '../../components/courses/CourseCard';

const CourseCatalog: React.FC = () => {
  const dispatch = useDispatch();
  const { courses, isLoading } = useSelector((state: RootState) => state.course);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');

  // Mock data - in real app, this would come from API
  const mockCourses = [
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      description: 'Learn the basics of JavaScript programming with hands-on exercises and real-world projects.',
      thumbnail: 'https://images.pexels.com/photos/11035386/pexels-photo-11035386.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      instructor: { id: '1', firstName: 'John', lastName: 'Doe', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
      category: 'Programming',
      level: 'BEGINNER' as const,
      duration: 120,
      enrollmentCount: 1520,
      rating: 4.8,
      price: 0,
      isEnrolled: false,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
    },
    {
      id: '2',
      title: 'React Development Masterclass',
      description: 'Master React.js with advanced concepts, hooks, context, and modern development practices.',
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      instructor: { id: '2', firstName: 'Sarah', lastName: 'Smith', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
      category: 'Web Development',
      level: 'INTERMEDIATE' as const,
      duration: 180,
      enrollmentCount: 980,
      rating: 4.9,
      price: 49,
      isEnrolled: true,
      progress: 45,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18',
    },
    {
      id: '3',
      title: 'Python for Data Science',
      description: 'Comprehensive Python course focusing on data analysis, visualization, and machine learning.',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      instructor: { id: '3', firstName: 'Michael', lastName: 'Johnson', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
      category: 'Data Science',
      level: 'INTERMEDIATE' as const,
      duration: 240,
      enrollmentCount: 756,
      rating: 4.7,
      price: 79,
      isEnrolled: false,
      createdAt: '2024-01-05',
      updatedAt: '2024-01-15',
    },
    {
      id: '4',
      title: 'Advanced Machine Learning',
      description: 'Deep dive into machine learning algorithms, neural networks, and AI applications.',
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      instructor: { id: '4', firstName: 'Emily', lastName: 'Davis', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
      category: 'AI & Machine Learning',
      level: 'ADVANCED' as const,
      duration: 320,
      enrollmentCount: 432,
      rating: 4.9,
      price: 129,
      isEnrolled: false,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-12',
    },
    {
      id: '5',
      title: 'Mobile App Development with Flutter',
      description: 'Build cross-platform mobile applications using Flutter and Dart programming language.',
      thumbnail: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      instructor: { id: '5', firstName: 'David', lastName: 'Wilson', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
      category: 'Mobile Development',
      level: 'INTERMEDIATE' as const,
      duration: 200,
      enrollmentCount: 623,
      rating: 4.6,
      price: 89,
      isEnrolled: true,
      progress: 12,
      createdAt: '2023-12-28',
      updatedAt: '2024-01-08',
    },
    {
      id: '6',
      title: 'Cybersecurity Fundamentals',
      description: 'Learn essential cybersecurity concepts, threat analysis, and protection strategies.',
      thumbnail: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      instructor: { id: '6', firstName: 'Lisa', lastName: 'Anderson', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
      category: 'Cybersecurity',
      level: 'BEGINNER' as const,
      duration: 150,
      enrollmentCount: 892,
      rating: 4.5,
      price: 59,
      isEnrolled: false,
      createdAt: '2023-12-20',
      updatedAt: '2024-01-05',
    },
  ];

  useEffect(() => {
    dispatch(setLoading(true));
    // Simulate API call
    setTimeout(() => {
      dispatch(setCourses(mockCourses));
      dispatch(setLoading(false));
    }, 1000);
  }, [dispatch]);

  const categories = ['all', 'Programming', 'Web Development', 'Data Science', 'AI & Machine Learning', 'Mobile Development', 'Cybersecurity'];
  const levels = ['all', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.enrollmentCount - a.enrollmentCount;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Catalog</h1>
          <p className="text-gray-600 mt-1">Discover and enroll in courses to advance your skills</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {levels.map(level => (
              <option key={level} value={level}>
                {level === 'all' ? 'All Levels' : level}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {sortedCourses.length} of {courses.length} courses
        </p>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <BookOpen className="h-4 w-4" />
          <span>{courses.filter(c => c.isEnrolled).length} enrolled</span>
        </div>
      </div>

      {/* Course Grid */}
      {sortedCourses.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {sortedCourses.map(course => (
            <CourseCard key={course.id} course={course} compact={viewMode === 'list'} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseCatalog;