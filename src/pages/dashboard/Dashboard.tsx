import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  BookOpen, 
  Gamepad2, 
  Trophy, 
  Target,
  TrendingUp,
  Users,
  Star,
  Clock,
  Play,
  Award
} from 'lucide-react';
import { RootState } from '../../store/store';
import { useAuth } from '../../hooks/useAuth';
import StatsCard from '../../components/dashboard/StatsCard';
import CourseCard from '../../components/courses/CourseCard';
import GameCard from '../../components/games/GameCard';
import ActivityFeed from '../../components/dashboard/ActivityFeed';
import ProgressChart from '../../components/dashboard/ProgressChart';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  
  // Mock data - in real app, this would come from API
  const stats = {
    coursesEnrolled: 8,
    coursesCompleted: 5,
    gamesPlayed: 24,
    totalPoints: 2840,
    currentStreak: 7,
    achievements: 18,
  };

  const recentCourses = [
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      thumbnail: 'https://images.pexels.com/photos/11035386/pexels-photo-11035386.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      progress: 75,
      instructor: { firstName: 'John', lastName: 'Doe' },
      category: 'Programming',
      level: 'BEGINNER' as const,
      duration: 120,
      enrollmentCount: 1520,
      rating: 4.8,
      price: 0,
      isEnrolled: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
    },
    {
      id: '2',
      title: 'React Development',
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      progress: 45,
      instructor: { firstName: 'Sarah', lastName: 'Smith' },
      category: 'Web Development',
      level: 'INTERMEDIATE' as const,
      duration: 180,
      enrollmentCount: 980,
      rating: 4.9,
      price: 49,
      isEnrolled: true,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18',
    },
  ];

  const recentGames = [
    {
      id: '1',
      title: 'Code Quest',
      description: 'Learn programming concepts through adventure',
      thumbnail: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      category: 'Programming',
      difficulty: 'MEDIUM' as const,
      maxScore: 1000,
      timeLimit: 1800,
      isMultiplayer: false,
      gameUrl: '/games/code-quest',
      instructions: 'Complete coding challenges to advance',
      createdAt: '2024-01-12',
    },
    {
      id: '2',
      title: 'Algorithm Arena',
      description: 'Master algorithms in competitive battles',
      thumbnail: 'https://images.pexels.com/photos/301599/pexels-photo-301599.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      category: 'Algorithms',
      difficulty: 'HARD' as const,
      maxScore: 2000,
      isMultiplayer: true,
      gameUrl: '/games/algorithm-arena',
      instructions: 'Compete against other players',
      createdAt: '2024-01-08',
    },
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'course_completed' as const,
      title: 'Completed "Python Basics"',
      description: 'Earned 150 points and 2 achievements',
      timestamp: '2 hours ago',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      id: '2',
      type: 'achievement' as const,
      title: 'New Achievement Unlocked!',
      description: 'Fast Learner - Complete 5 lessons in one day',
      timestamp: '4 hours ago',
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      id: '3',
      type: 'game_score' as const,
      title: 'High Score in Code Quest!',
      description: 'Achieved 950 points - New personal best!',
      timestamp: '1 day ago',
      icon: Trophy,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {user?.firstName}! 🎯
            </h1>
            <p className="text-blue-100 dark:text-blue-200">
              You're on a {stats.currentStreak}-day learning streak! Keep it up!
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{stats.totalPoints.toLocaleString()}</div>
            <div className="text-blue-100 dark:text-blue-200">Total Points</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Courses Enrolled"
          value={stats.coursesEnrolled}
          icon={BookOpen}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Games Played"
          value={stats.gamesPlayed}
          icon={Gamepad2}
          color="purple"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Achievements"
          value={stats.achievements}
          icon={Trophy}
          color="yellow"
          trend={{ value: 3, isPositive: true }}
        />
        <StatsCard
          title="Learning Streak"
          value={stats.currentStreak}
          icon={Target}
          color="green"
          subtitle="days"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Learning Progress</h2>
              <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
              </select>
            </div>
            <ProgressChart />
          </div>

          {/* Recent Courses */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Continue Learning</h2>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm">
                View all courses
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentCourses.map((course) => (
                <CourseCard key={course.id} course={course} compact />
              ))}
            </div>
          </div>

          {/* Recent Games */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Play & Learn</h2>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm">
                View all games
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentGames.map((game) => (
                <GameCard key={game.id} game={game} compact />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">Browse Courses</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Find new learning paths</div>
                </div>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                  <Gamepad2 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">Play Games</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Learn through gaming</div>
                </div>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">Take Assessment</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Test your knowledge</div>
                </div>
              </button>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Activity</h3>
            <ActivityFeed activities={recentActivity} />
          </div>

          {/* Achievements Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Latest Achievements</h3>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm">
                View all
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full">
                  <Award className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">Fast Learner</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">Course Master</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">1 day ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;