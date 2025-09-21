import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  maxScore: number;
  timeLimit?: number;
  isMultiplayer: boolean;
  gameUrl: string;
  instructions: string;
  createdAt: string;
}

export interface GameSession {
  id: string;
  gameId: string;
  playerId: string;
  score: number;
  startTime: string;
  endTime?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ABANDONED';
  achievements: string[];
  saveData?: any;
}

export interface Leaderboard {
  gameId: string;
  entries: LeaderboardEntry[];
}

export interface LeaderboardEntry {
  rank: number;
  playerId: string;
  playerName: string;
  playerAvatar?: string;
  score: number;
  achievements: number;
  completionTime: number;
}

interface GameState {
  games: Game[];
  currentGame: Game | null;
  currentSession: GameSession | null;
  leaderboards: Leaderboard[];
  playerStats: {
    totalGamesPlayed: number;
    totalScore: number;
    averageScore: number;
    achievements: string[];
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: GameState = {
  games: [],
  currentGame: null,
  currentSession: null,
  leaderboards: [],
  playerStats: {
    totalGamesPlayed: 0,
    totalScore: 0,
    averageScore: 0,
    achievements: [],
  },
  isLoading: false,
  error: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setGames: (state, action: PayloadAction<Game[]>) => {
      state.games = action.payload;
    },
    setCurrentGame: (state, action: PayloadAction<Game | null>) => {
      state.currentGame = action.payload;
    },
    startGameSession: (state, action: PayloadAction<GameSession>) => {
      state.currentSession = action.payload;
    },
    updateGameSession: (state, action: PayloadAction<Partial<GameSession>>) => {
      if (state.currentSession) {
        state.currentSession = { ...state.currentSession, ...action.payload };
      }
    },
    endGameSession: (state) => {
      if (state.currentSession) {
        state.currentSession.status = 'COMPLETED';
        state.currentSession.endTime = new Date().toISOString();
      }
    },
    setLeaderboards: (state, action: PayloadAction<Leaderboard[]>) => {
      state.leaderboards = action.payload;
    },
    updatePlayerStats: (state, action: PayloadAction<Partial<typeof initialState.playerStats>>) => {
      state.playerStats = { ...state.playerStats, ...action.payload };
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setGames,
  setCurrentGame,
  startGameSession,
  updateGameSession,
  endGameSession,
  setLeaderboards,
  updatePlayerStats,
  setError,
} = gameSlice.actions;

export default gameSlice.reducer;