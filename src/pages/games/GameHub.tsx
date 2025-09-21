import React, { useState, useEffect } from 'react';
import { Search, Filter, Trophy, Gamepad2, Users, Zap, Play } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setGames, setLoading } from '../../store/slices/gameSlice';
import GameCard from '../../components/games/GameCard';

const GameHub: React.FC = () => {
  const dispatch = useDispatch();
  const { games, isLoading } = useSelector((state: RootState) => state.game);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showMultiplayerOnly, setShowMultiplayerOnly] = useState(false);

  // Mock data - in real app, this would come from API
  const mockGames = [
    {
      id: '1',
      title: 'Code Quest Adventure',
      description: 'Embark on an epic coding journey through mystical lands while learning programming fundamentals.',
      thumbnail: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      category: 'Programming',
      difficulty: 'EASY' as const,
      maxScore: 1000,
      timeLimit: 1800,
      isMultiplayer: false,
      gameUrl: '/games/code-quest',
      instructions: 'Complete coding challenges to advance through levels and unlock new abilities.',
      createdAt: '2024-01-12',
    },
    {
      id: '2',
      title: 'Algorithm Arena',
      description: 'Battle other players in real-time algorithm challenges and climb the competitive leaderboard.',
      thumbnail: 'https://images.pexels.com/photos/301599/pexels-photo-301599.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      category: 'Algorithms',
      difficulty: 'HARD' as const,
      maxScore: 2000,
      timeLimit: 3600,
      isMultiplayer: true,
      gameUrl: '/games/algorithm-arena',
      instructions: 'Solve complex algorithms faster than your opponents to win matches.',
      createdAt: '2024-01-08',
    },
    {
      id: '3',
      title: 'Data Structure Dungeon',
      description: 'Navigate through dungeons using different data structures to solve puzzles and defeat monsters.',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      category: 'Data Structures',
      difficulty: 'MEDIUM' as const,
      maxScore: 1500,
      timeLimit: 2400,
      isMultiplayer: false,
      gameUrl: '/games/data-structure-dungeon',
      instructions: 'Use arrays, linked lists, trees, and graphs to overcome obstacles.',
      createdAt: '2024-01-05',
    },
    {
      id: '4',
      title: 'Web Dev Workshop',
      description: 'Build websites in a virtual workshop environment with interactive HTML, CSS, and JavaScript challenges.',
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      category: 'Web Development',
      difficulty: 'EASY' as const,
      maxScore: 800,
      timeLimit: 1200,
      isMultiplayer: false,
      gameUrl: '/games/web-dev-workshop',
      instructions: 'Create responsive layouts and interactive elements to complete projects.',
      createdAt: '2024-01-03',
    },
    {
      id: '5',
      title: 'Database Detective',
      description: 'Solve mysteries by querying databases and uncovering hidden clues in this SQL adventure.',
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      category: 'Database',
      difficulty: 'MEDIUM' as const,
      maxScore: 1200,
      timeLimit: 2100,
      isMultiplayer: false,
      gameUrl: '/games/database-detective',
      instructions: 'Write SQL queries to investigate cases and solve database puzzles.',
      createdAt: '2024-01-01',
    },
    {
      id: '6',
      title: 'Cybersecurity Simulator',
      description: 'Protect virtual networks from cyber attacks while learning security best practices.',
      thumbnail: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1',
      category: 'Cybersecurity',
      difficulty: 'HARD' as const,
      maxScore: 2500,
      timeLimit: 4200,
      isMultiplayer: true,
      gameUrl: '/games/cybersecurity-simulator',
      instructions: 'Defend against hackers and implement security measures in team-based scenarios.',
      createdAt: '2023-12-28',
    },
  ];

  useEffect(() => {
    dispatch(setLoading(true));
    // Simulate API call
    setTimeout(() => {
      dispatch(setGames(mockGames));
      dispatch(setLoading(false));
    }, 1000);
  }, [dispatch]);

  const categories = ['all', 'Programming', 'Algorithms', 'Data Structures', 'Web Development', 'Database', 'Cybersecurity'];
  const difficulties = ['all', 'EASY', 'MEDIUM', 'HARD'];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || game.difficulty === selectedDifficulty;
    const matchesMultiplayer = !showMultiplayerOnly || game.isMultiplayer;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesMultiplayer;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Game Hub</h1>
          <p className="text-gray-600 mt-1">Learn through interactive gaming experiences</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-sm font-medium text-gray-900">Your Best Score</div>
                <div className="text-lg font-bold text-purple-600">2,450</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center space-x-2">
            <Gamepad2 className="h-6 w-6" />
            <div>
              <div className="text-sm opacity-90">Games Played</div>
              <div className="text-2xl font-bold">24</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-center space-x-2">
            <Trophy className="h-6 w-6" />
            <div>
              <div className="text-sm opacity-90">High Scores</div>
              <div className="text-2xl font-bold">8</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6" />
            <div>
              <div className="text-sm opacity-90">Total Points</div>
              <div className="text-2xl font-bold">15,420</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6" />
            <div>
              <div className="text-sm opacity-90">Multiplayer Wins</div>
              <div className="text-2xl font-bold">12</div>
            </div>
          </div>
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
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {difficulty === 'all' ? 'All Difficulties' : difficulty}
              </option>
            ))}
          </select>

          {/* Multiplayer Toggle */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="multiplayer"
              checked={showMultiplayerOnly}
              onChange={(e) => setShowMultiplayerOnly(e.target.checked)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="multiplayer" className="text-sm font-medium text-gray-700">
              Multiplayer Only
            </label>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredGames.length} of {games.length} games
        </p>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Play className="h-4 w-4" />
          <span>{games.filter(g => g.isMultiplayer).length} multiplayer games</span>
        </div>
      </div>

      {/* Game Grid */}
      {filteredGames.length === 0 ? (
        <div className="text-center py-12">
          <Gamepad2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No games found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}

      {/* Featured Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold mb-2">New: Godot Game Integration</h2>
          <p className="text-purple-100 mb-4">
            Experience cutting-edge educational games built with Godot Engine. 
            Immersive 3D environments, real-time multiplayer, and advanced game mechanics.
          </p>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Explore Godot Games
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameHub;