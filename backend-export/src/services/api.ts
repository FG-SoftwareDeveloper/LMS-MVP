import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

class APIService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.get(url, config);
  }

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.post(url, data, config);
  }

  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.put(url, data, config);
  }

  public patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.patch(url, data, config);
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.delete(url, config);
  }
}

const apiService = new APIService();

// Authentication API
export const authAPI = {
  login: (email: string, password: string) =>
    apiService.post('/auth/login', { email, password }),
  register: (userData: any) =>
    apiService.post('/auth/register', userData),
  logout: () =>
    apiService.post('/auth/logout'),
  validateToken: () =>
    apiService.get('/auth/validate'),
  forgotPassword: (email: string) =>
    apiService.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) =>
    apiService.post('/auth/reset-password', { token, password }),
  refreshToken: () =>
    apiService.post('/auth/refresh'),
};

// User API
export const userAPI = {
  getProfile: () =>
    apiService.get('/users/profile'),
  updateProfile: (data: any) =>
    apiService.put('/users/profile', data),
  uploadAvatar: (file: FormData) =>
    apiService.post('/users/profile/avatar', file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getAchievements: () =>
    apiService.get('/users/achievements'),
  getStats: () =>
    apiService.get('/users/stats'),
  updatePreferences: (preferences: any) =>
    apiService.put('/users/preferences', preferences),
};

// Course API
export const courseAPI = {
  getCourses: (filters?: any) =>
    apiService.get('/courses', { params: filters }),
  getCourse: (id: string) =>
    apiService.get(`/courses/${id}`),
  getEnrolledCourses: () =>
    apiService.get('/courses/enrolled'),
  enrollInCourse: (courseId: string) =>
    apiService.post(`/courses/${courseId}/enroll`),
  getCourseModules: (courseId: string) =>
    apiService.get(`/courses/${courseId}/modules`),
  markLessonComplete: (lessonId: string) =>
    apiService.post(`/courses/lessons/${lessonId}/complete`),
  getCourseProgress: (courseId: string) =>
    apiService.get(`/courses/${courseId}/progress`),
};

// Game API
export const gameAPI = {
  getGames: (filters?: any) =>
    apiService.get('/games', { params: filters }),
  getGame: (id: string) =>
    apiService.get(`/games/${id}`),
  startGameSession: (gameId: string) =>
    apiService.post(`/games/${gameId}/sessions`),
  updateGameSession: (sessionId: string, data: any) =>
    apiService.put(`/games/sessions/${sessionId}`, data),
  endGameSession: (sessionId: string, finalData: any) =>
    apiService.post(`/games/sessions/${sessionId}/complete`, finalData),
  getLeaderboard: (gameId: string, timeframe?: string) =>
    apiService.get(`/games/${gameId}/leaderboard`, { params: { timeframe } }),
  getPlayerStats: () =>
    apiService.get('/games/stats'),
};

// Assessment API
export const assessmentAPI = {
  getAssessments: (filters?: any) =>
    apiService.get('/assessments', { params: filters }),
  getAssessment: (id: string) =>
    apiService.get(`/assessments/${id}`),
  startAssessment: (assessmentId: string) =>
    apiService.post(`/assessments/${assessmentId}/attempts`),
  submitAnswer: (attemptId: string, questionId: string, answer: any) =>
    apiService.post(`/assessments/attempts/${attemptId}/answers`, {
      questionId,
      answer,
    }),
  submitAssessment: (attemptId: string) =>
    apiService.post(`/assessments/attempts/${attemptId}/submit`),
  getAssessmentResults: (attemptId: string) =>
    apiService.get(`/assessments/attempts/${attemptId}/results`),
};

// Communication API
export const communicationAPI = {
  getForums: () =>
    apiService.get('/communication/forums'),
  getForum: (forumId: string) =>
    apiService.get(`/communication/forums/${forumId}`),
  createPost: (forumId: string, data: any) =>
    apiService.post(`/communication/forums/${forumId}/posts`, data),
  getMessages: () =>
    apiService.get('/communication/messages'),
  sendMessage: (recipientId: string, content: string) =>
    apiService.post('/communication/messages', { recipientId, content }),
  markMessageAsRead: (messageId: string) =>
    apiService.put(`/communication/messages/${messageId}/read`),
};

// Analytics API
export const analyticsAPI = {
  getDashboardData: () =>
    apiService.get('/analytics/dashboard'),
  getLearningProgress: (timeframe?: string) =>
    apiService.get('/analytics/learning-progress', { params: { timeframe } }),
  getGameAnalytics: (timeframe?: string) =>
    apiService.get('/analytics/games', { params: { timeframe } }),
  getEngagementMetrics: () =>
    apiService.get('/analytics/engagement'),
};

// Admin API
export const adminAPI = {
  getUsers: (filters?: any) =>
    apiService.get('/admin/users', { params: filters }),
  getUser: (userId: string) =>
    apiService.get(`/admin/users/${userId}`),
  updateUser: (userId: string, data: any) =>
    apiService.put(`/admin/users/${userId}`, data),
  deleteUser: (userId: string) =>
    apiService.delete(`/admin/users/${userId}`),
  getCourseManagement: () =>
    apiService.get('/admin/courses'),
  createCourse: (data: any) =>
    apiService.post('/admin/courses', data),
  updateCourse: (courseId: string, data: any) =>
    apiService.put(`/admin/courses/${courseId}`, data),
  deleteCourse: (courseId: string) =>
    apiService.delete(`/admin/courses/${courseId}`),
  getSystemStats: () =>
    apiService.get('/admin/stats'),
};

export default apiService;