import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, Trophy, Users, Zap } from 'lucide-react';
import { Game } from '../../store/slices/gameSlice';

interface GameCardProps {
  game: Game;
  compact?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, compact = false }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY':
        return 'bg-green-100 text-green-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'HARD':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (seconds?: number) => {
    if (!seconds) return 'No limit';
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
  };

  if (compact) {
    return (
      <Link
        to={`/games/${game.id}`}
        className="block bg-white rounded-lg border hover:shadow-md transition-shadow"
      >
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <img
              src={game.thumbnail}
              alt={game.title}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                {game.title}
              </h3>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                {game.description}
              </p>
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Trophy className="h-3 w-3" />
                  <span>{game.maxScore}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatTime(game.timeLimit)}</span>
                </div>
                {game.isMultiplayer && (
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>MP</span>
                  </div>
                )}
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
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(game.difficulty)}`}>
            {game.difficulty}
          </span>
        </div>
        {game.isMultiplayer && (
          <div className="absolute top-4 right-4">
            <div className="bg-white rounded-full p-2 shadow-sm">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all rounded-t-xl flex items-center justify-center">
          <div className="opacity-0 hover:opacity-100 transition-opacity">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <Play className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {game.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {game.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Trophy className="h-4 w-4" />
              <span>{game.maxScore} pts</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatTime(game.timeLimit)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="h-4 w-4" />
              <span>{game.category}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {game.isMultiplayer ? 'Multiplayer Game' : 'Single Player'}
          </div>
          <Link
            to={`/games/${game.id}`}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <Play className="h-4 w-4" />
            <span>Play Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameCard;