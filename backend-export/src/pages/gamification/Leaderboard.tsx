import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Medal, 
  Award, 
  Crown, 
  TrendingUp, 
  Filter,
  Calendar,
  Users,
  Gamepad2,
  BookOpen
} from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  rank: number;
  userId: string;
  userName: string;
  avatar?: string;
  totalPoints: number;
  coursesCompleted: number;
  gamesPlayed: number;
  achievements: number;
  streak: number;
  level: number;
  change: number; // Position change from last period
}

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [timeframe, setTimeframe] = useState('all-time');
  const [category, setCategory] = useState('overall');
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserRank, setCurrentUserRank] = useState<LeaderboardEntry | null>(null);

  // Mock data
  useEffect(() => {
    const mockLeaderboard: LeaderboardEntry[] = [
      {
        id: '1',
        rank: 1,
        userId: 'user1',
        userName: 'Alex Chen',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        totalPoints: 15420,
        coursesCompleted: 12,
        gamesPlayed: 45,
        achievements: 28,
        streak: 15,
        level: 8,
        change: 0,
      },
      {
        id: '2',
        rank: 2,
        userId: 'user2',
        userName: 'Sarah Kim',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        totalPoints: 14850,
        coursesCompleted: 11,
        gamesPlayed: 42,
        achievements: 25,
        streak: 12,
        level: 7,
        change: 1,
      },
      {
        id: '3',
        rank: 3,
        userId: 'user3',
        userName: 'Mike Johnson',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        totalPoints: 13920,
        coursesCompleted: 10,
        gamesPlayed: 38,
        achievements: 22,
        streak: 8,
        level: 7,
        change: -1,
      },
      {
        id: '4',
        rank: 4,
        userId: 'user4',
        userName: 'Emily Davis',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        totalPoints: 12750,
        coursesCompleted: 9,
        gamesPlayed: 35,
        achievements: 20,
        streak: 6,
        level: 6,
        change: 2,
      },
      {
        id: '5',
        rank: 5,
        userId: 'user5',
        userName: 'David Wilson',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        totalPoints: 11680,
        coursesCompleted: 8,
        gamesPlayed: 32,
        achievements: 18,
        streak: 4,
        level: 6,
        change: -1,
      },
      {
        id: '6',
        rank: 6,
        userId: 'user6',
        userName: 'Lisa Anderson',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        totalPoints: 10920,
        coursesCompleted: 7,
        gamesPlayed: 29,
        achievements: 16,
        streak: 3,
        level: 5,
        change: 0,
      },
      // Add more entries...
      ...Array.from({ length: 14 }, (_, i) => ({
        id: `${i + 7}`,
        rank: i + 7,
        userId: `user${i + 7}`,
        userName: `User ${i + 7}`,
        totalPoints: Math.floor(Math.random() * 10000) + 5000,
        coursesCompleted: Math.floor(Math.random() * 10) + 3,
        gamesPlayed: Math.floor(Math.random() * 30) + 15,
        achievements: Math.floor(Math.random() * 20) + 8,
        streak: Math.floor(Math.random() * 10) + 1,
        level: Math.floor(Math.random() * 5) + 3,
        change: Math.floor(Math.random() * 6) - 3,
      })),
    ];

    // Current user (mock)
    const currentUser: LeaderboardEntry = {
      id: 'current',
      rank: 47,
      userId: 'current-user',
      userName: 'You',
      totalPoints: 2840,
      coursesCompleted: 3,
      gamesPlayed: 12,
      achievements: 8,
      streak: 7,
      level: 3,
      change: 5,
    };

    setTimeout(() => {
      setLeaderboard(mockLeaderboard);
      setCurrentUserRank(currentUser);
      setIsLoading(false);
    }, 1000);
  }, [timeframe, category]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (change < 0) {
      return <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />;
    }
    return <div className="w-4 h-4" />;
  };

  const getRankBackground = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400';
      case 3:
        return 'bg-gradient-to-r from-amber-500 to-amber-600';
      default:
        return 'bg-white';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
          <p className="text-gray-600 mt-1">Compete with learners worldwide</p>
        </div>
        <div className="flex items-center space-x-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <span className="text-lg font-semibold text-gray-900">Global Rankings</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all-time">All Time</option>
              <option value="this-month">This Month</option>
              <option value="this-week">This Week</option>
              <option value="today">Today</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="overall">Overall</option>
              <option value="courses">Courses</option>
              <option value="games">Games</option>
              <option value="achievements">Achievements</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
              <option value="global">Global</option>
              <option value="country">My Country</option>
              <option value="friends">Friends</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-8">
        <h2 className="text-xl font-bold text-center text-gray-900 mb-8">Top Performers</h2>
        <div className="flex items-end justify-center space-x-8">
          {/* 2nd Place */}
          {leaderboard[1] && (
            <div className="text-center">
              <div className="bg-gradient-to-r from-gray-300 to-gray-400 rounded-xl p-6 mb-4 h-32 flex flex-col justify-end">
                <img
                  src={leaderboard[1].avatar}
                  alt={leaderboard[1].userName}
                  className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-white"
                />
              </div>
              <div className="flex items-center justify-center mb-2">
                <Medal className="h-6 w-6 text-gray-400 mr-2" />
                <span className="font-bold text-lg">2nd</span>
              </div>
              <h3 className="font-semibold text-gray-900">{leaderboard[1].userName}</h3>
              <p className="text-sm text-gray-600">{leaderboard[1].totalPoints.toLocaleString()} pts</p>
            </div>
          )}
          
          {/* 1st Place */}
          {leaderboard[0] && (
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 mb-4 h-40 flex flex-col justify-end">
                <img
                  src={leaderboard[0].avatar}
                  alt={leaderboard[0].userName}
                  className="w-20 h-20 rounded-full mx-auto mb-2 border-4 border-white"
                />
              </div>
              <div className="flex items-center justify-center mb-2">
                <Crown className="h-8 w-8 text-yellow-500 mr-2" />
                <span className="font-bold text-xl">1st</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">{leaderboard[0].userName}</h3>
              <p className="text-gray-600">{leaderboard[0].totalPoints.toLocaleString()} pts</p>
            </div>
          )}
          
          {/* 3rd Place */}
          {leaderboard[2] && (
            <div className="text-center">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 mb-4 h-28 flex flex-col justify-end">
                <img
                  src={leaderboard[2].avatar}
                  alt={leaderboard[2].userName}
                  className="w-14 h-14 rounded-full mx-auto mb-2 border-4 border-white"
                />
              </div>
              <div className="flex items-center justify-center mb-2">
                <Award className="h-6 w-6 text-amber-600 mr-2" />
                <span className="font-bold text-lg">3rd</span>
              </div>
              <h3 className="font-semibold text-gray-900">{leaderboard[2].userName}</h3>
              <p className="text-sm text-gray-600">{leaderboard[2].totalPoints.toLocaleString()} pts</p>
            </div>
          )}
        </div>
      </div>

      {/* Current User Rank */}
      {currentUserRank && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-blue-600">#{currentUserRank.rank}</span>
                {getChangeIcon(currentUserRank.change)}
                {currentUserRank.change !== 0 && (
                  <span className={`text-sm font-medium ${
                    currentUserRank.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {Math.abs(currentUserRank.change)}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{currentUserRank.userName}</h3>
                <p className="text-sm text-gray-600">{currentUserRank.totalPoints.toLocaleString()} points</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Level {currentUserRank.level}</p>
              <p className="text-sm text-gray-600">{currentUserRank.streak} day streak</p>
            </div>
          </div>
        </div>
      )}

      {/* Full Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Full Rankings</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {leaderboard.map((entry, index) => (
            <div
              key={entry.id}
              className={`p-6 hover:bg-gray-50 transition-colors ${
                index < 3 ? getRankBackground(entry.rank) + ' text-white' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 w-16">
                    {getRankIcon(entry.rank)}
                    {getChangeIcon(entry.change)}
                    {entry.change !== 0 && (
                      <span className={`text-xs font-medium ${
                        index < 3 ? 'text-white' : 
                        entry.change > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {Math.abs(entry.change)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {entry.avatar ? (
                      <img
                        src={entry.avatar}
                        alt={entry.userName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-gray-600" />
                      </div>
                    )}
                    <div>
                      <h3 className={`font-semibold ${index < 3 ? 'text-white' : 'text-gray-900'}`}>
                        {entry.userName}
                      </h3>
                      <p className={`text-sm ${index < 3 ? 'text-white opacity-90' : 'text-gray-600'}`}>
                        Level {entry.level} • {entry.streak} day streak
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-8 text-sm">
                  <div className="text-center">
                    <p className={`font-bold ${index < 3 ? 'text-white' : 'text-gray-900'}`}>
                      {entry.totalPoints.toLocaleString()}
                    </p>
                    <p className={`${index < 3 ? 'text-white opacity-75' : 'text-gray-500'}`}>Points</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center space-x-1">
                      <BookOpen className={`h-4 w-4 ${index < 3 ? 'text-white' : 'text-blue-500'}`} />
                      <span className={`font-medium ${index < 3 ? 'text-white' : 'text-gray-900'}`}>
                        {entry.coursesCompleted}
                      </span>
                    </div>
                    <p className={`${index < 3 ? 'text-white opacity-75' : 'text-gray-500'}`}>Courses</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center space-x-1">
                      <Gamepad2 className={`h-4 w-4 ${index < 3 ? 'text-white' : 'text-purple-500'}`} />
                      <span className={`font-medium ${index < 3 ? 'text-white' : 'text-gray-900'}`}>
                        {entry.gamesPlayed}
                      </span>
                    </div>
                    <p className={`${index < 3 ? 'text-white opacity-75' : 'text-gray-500'}`}>Games</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center space-x-1">
                      <Trophy className={`h-4 w-4 ${index < 3 ? 'text-white' : 'text-yellow-500'}`} />
                      <span className={`font-medium ${index < 3 ? 'text-white' : 'text-gray-900'}`}>
                        {entry.achievements}
                      </span>
                    </div>
                    <p className={`${index < 3 ? 'text-white opacity-75' : 'text-gray-500'}`}>Badges</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;