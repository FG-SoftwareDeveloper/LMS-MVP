import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Trophy, 
  Clock, 
  Users, 
  Settings,
  Maximize,
  Volume2,
  VolumeX,
  ArrowLeft,
  Share2
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setCurrentGame, startGameSession, updateGameSession } from '../../store/slices/gameSlice';

const GameSession: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentGame, currentSession } = useSelector((state: RootState) => state.game);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [gameLoaded, setGameLoaded] = useState(false);
  const [connectedPlayers, setConnectedPlayers] = useState<string[]>([]);

  // Mock game data
  useEffect(() => {
    const mockGame = {
      id: id!,
      title: 'Code Quest Adventure',
      description: 'Embark on an epic coding journey through mystical lands while learning programming fundamentals.',
      thumbnail: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
      category: 'Programming',
      difficulty: 'EASY' as const,
      maxScore: 1000,
      timeLimit: 1800,
      isMultiplayer: false,
      gameUrl: '/games/code-quest',
      instructions: 'Complete coding challenges to advance through levels and unlock new abilities.',
      createdAt: '2024-01-12',
    };

    dispatch(setCurrentGame(mockGame));
    setTimeRemaining(mockGame.timeLimit || 0);

    // Start game session
    const session = {
      id: `session-${Date.now()}`,
      gameId: mockGame.id,
      playerId: 'current-user',
      score: 0,
      startTime: new Date().toISOString(),
      status: 'ACTIVE' as const,
      achievements: [],
    };
    dispatch(startGameSession(session));

    // Simulate game loading
    setTimeout(() => setGameLoaded(true), 2000);
  }, [id, dispatch]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining]);

  // Mock multiplayer connections
  useEffect(() => {
    if (currentGame?.isMultiplayer) {
      setConnectedPlayers(['Player1', 'Player2', 'Player3']);
    }
  }, [currentGame]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setScore(0);
    setTimeRemaining(currentGame?.timeLimit || 0);
    // Reset game state
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // Implement fullscreen API
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleScoreUpdate = (newScore: number) => {
    setScore(newScore);
    if (currentSession) {
      dispatch(updateGameSession({ score: newScore }));
    }
  };

  if (!currentGame) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/games')}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold">{currentGame.title}</h1>
              <p className="text-sm text-gray-400">{currentGame.category} • {currentGame.difficulty}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Score */}
            <div className="bg-gray-700 rounded-lg px-4 py-2">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-yellow-400" />
                <span className="font-bold">{score.toLocaleString()}</span>
              </div>
            </div>
            
            {/* Timer */}
            {currentGame.timeLimit && (
              <div className="bg-gray-700 rounded-lg px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span className="font-mono">{formatTime(timeRemaining)}</span>
                </div>
              </div>
            )}
            
            {/* Multiplayer Players */}
            {currentGame.isMultiplayer && (
              <div className="bg-gray-700 rounded-lg px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-green-400" />
                  <span>{connectedPlayers.length}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 relative">
        {!gameLoaded ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <h3 className="text-lg font-medium mb-2">Loading Game...</h3>
              <p className="text-gray-400">Initializing Godot Engine</p>
            </div>
          </div>
        ) : (
          <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'h-96 md:h-[600px]'}`}>
            {/* Game Canvas Placeholder */}
            <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
              {/* Mock Game Content */}
              <div className="text-center">
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-2xl font-bold mb-2">Godot Game Engine</h3>
                <p className="text-gray-300 mb-4">Interactive learning experience</p>
                <div className="space-y-2">
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <p className="text-sm">Current Level: Beginner Forest</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <p className="text-sm">Challenge: Variable Declaration</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <p className="text-sm">Progress: 3/10 Challenges Complete</p>
                  </div>
                </div>
              </div>
              
              {/* Game Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <button
                    onClick={handlePlayPause}
                    className="bg-purple-600 hover:bg-purple-700 rounded-full p-6 transition-colors"
                  >
                    <Play className="h-12 w-12" />
                  </button>
                </div>
              )}
            </div>
            
            {/* Game Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-black bg-opacity-70 rounded-lg p-4 flex items-center space-x-4">
                <button
                  onClick={handlePlayPause}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
                
                <button
                  onClick={handleRestart}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <RotateCcw className="h-5 w-5" />
                </button>
                
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
                
                <button
                  onClick={handleFullscreen}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Maximize className="h-5 w-5" />
                </button>
                
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Game Info Sidebar */}
      <div className="bg-gray-800 border-t border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Instructions */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Instructions</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {currentGame.instructions}
            </p>
          </div>
          
          {/* Progress */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Progress</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Completion</span>
                  <span>30%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Best Score</span>
                  <span>850</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Achievements</span>
                  <span>3/10</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Leaderboard */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Leaderboard</h3>
            <div className="space-y-2">
              {[
                { name: 'Alex Chen', score: 2450 },
                { name: 'Sarah Kim', score: 2380 },
                { name: 'Mike Johnson', score: 2250 },
                { name: 'You', score: score },
              ].map((player, index) => (
                <div key={index} className={`flex justify-between text-sm p-2 rounded ${
                  player.name === 'You' ? 'bg-purple-900 bg-opacity-50' : 'bg-gray-700'
                }`}>
                  <span className="flex items-center space-x-2">
                    <span className="text-gray-400">#{index + 1}</span>
                    <span>{player.name}</span>
                  </span>
                  <span className="font-mono">{player.score.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-4 mt-6 pt-6 border-t border-gray-700">
          <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <Share2 className="h-4 w-4" />
            <span>Share Score</span>
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg transition-colors">
            Save Progress
          </button>
          <button 
            onClick={() => navigate('/games')}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg transition-colors"
          >
            Exit Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameSession;