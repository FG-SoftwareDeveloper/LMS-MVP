import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  Trophy,
  Target,
  BookOpen,
  Filter,
  Search
} from 'lucide-react';

interface Assessment {
  id: string;
  title: string;
  description: string;
  type: 'QUIZ' | 'EXAM' | 'PRACTICE' | 'CERTIFICATION';
  course: string;
  duration: number;
  totalQuestions: number;
  passingScore: number;
  attempts: number;
  maxAttempts: number;
  bestScore?: number;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'EXPIRED';
  dueDate?: string;
  createdAt: string;
}

const Assessments: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  useEffect(() => {
    const mockAssessments: Assessment[] = [
      {
        id: '1',
        title: 'JavaScript Fundamentals Quiz',
        description: 'Test your understanding of JavaScript basics including variables, functions, and control structures.',
        type: 'QUIZ',
        course: 'JavaScript Fundamentals',
        duration: 30,
        totalQuestions: 15,
        passingScore: 70,
        attempts: 1,
        maxAttempts: 3,
        bestScore: 85,
        status: 'COMPLETED',
        createdAt: '2024-01-15',
      },
      {
        id: '2',
        title: 'React Development Exam',
        description: 'Comprehensive exam covering React components, hooks, state management, and best practices.',
        type: 'EXAM',
        course: 'React Development Masterclass',
        duration: 90,
        totalQuestions: 40,
        passingScore: 75,
        attempts: 0,
        maxAttempts: 2,
        status: 'NOT_STARTED',
        dueDate: '2024-02-15',
        createdAt: '2024-01-10',
      },
      {
        id: '3',
        title: 'Python Practice Test',
        description: 'Practice your Python skills with coding challenges and multiple-choice questions.',
        type: 'PRACTICE',
        course: 'Python for Data Science',
        duration: 45,
        totalQuestions: 20,
        passingScore: 60,
        attempts: 2,
        maxAttempts: -1, // Unlimited
        bestScore: 78,
        status: 'COMPLETED',
        createdAt: '2024-01-05',
      },
      {
        id: '4',
        title: 'Web Development Certification',
        description: 'Final certification exam for the complete web development track.',
        type: 'CERTIFICATION',
        course: 'Full Stack Web Development',
        duration: 120,
        totalQuestions: 60,
        passingScore: 80,
        attempts: 0,
        maxAttempts: 1,
        status: 'NOT_STARTED',
        dueDate: '2024-03-01',
        createdAt: '2024-01-01',
      },
      {
        id: '5',
        title: 'Algorithm Design Quiz',
        description: 'Test your knowledge of common algorithms and data structures.',
        type: 'QUIZ',
        course: 'Advanced Algorithms',
        duration: 60,
        totalQuestions: 25,
        passingScore: 70,
        attempts: 1,
        maxAttempts: 3,
        status: 'IN_PROGRESS',
        createdAt: '2023-12-28',
      },
    ];

    setTimeout(() => {
      setAssessments(mockAssessments);
      setIsLoading(false);
    }, 1000);
  }, []);

  const types = ['all', 'QUIZ', 'EXAM', 'PRACTICE', 'CERTIFICATION'];
  const statuses = ['all', 'NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'EXPIRED'];

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || assessment.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || assessment.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NOT_STARTED':
        return 'bg-gray-100 text-gray-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'EXPIRED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'QUIZ':
        return 'bg-blue-100 text-blue-800';
      case 'EXAM':
        return 'bg-purple-100 text-purple-800';
      case 'PRACTICE':
        return 'bg-green-100 text-green-800';
      case 'CERTIFICATION':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'NOT_STARTED':
        return <Play className="h-4 w-4" />;
      case 'IN_PROGRESS':
        return <Clock className="h-4 w-4" />;
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4" />;
      case 'EXPIRED':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Assessments</h1>
          <p className="text-gray-600 mt-1">Test your knowledge and track your progress</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-xl">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assessments</p>
              <p className="text-2xl font-bold text-gray-900">{assessments.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-xl">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {assessments.filter(a => a.status === 'COMPLETED').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Trophy className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">82%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pass Rate</p>
              <p className="text-2xl font-bold text-gray-900">95%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search assessments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {types.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Statuses' : status.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Assessment List */}
      <div className="space-y-4">
        {filteredAssessments.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No assessments found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        ) : (
          filteredAssessments.map(assessment => (
            <div key={assessment.id} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{assessment.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(assessment.type)}`}>
                      {assessment.type}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assessment.status)} flex items-center space-x-1`}>
                      {getStatusIcon(assessment.status)}
                      <span>{assessment.status.replace('_', ' ')}</span>
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{assessment.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{assessment.course}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDuration(assessment.duration)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="h-4 w-4" />
                      <span>{assessment.totalQuestions} questions</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="h-4 w-4" />
                      <span>{assessment.passingScore}% to pass</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-600">
                      Attempts: {assessment.attempts}/{assessment.maxAttempts === -1 ? '∞' : assessment.maxAttempts}
                    </span>
                    {assessment.bestScore && (
                      <span className="text-green-600 font-medium">
                        Best Score: {assessment.bestScore}%
                      </span>
                    )}
                    {assessment.dueDate && (
                      <span className="text-orange-600">
                        Due: {new Date(assessment.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  {assessment.status === 'NOT_STARTED' && (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                      <Play className="h-4 w-4" />
                      <span>Start</span>
                    </button>
                  )}
                  {assessment.status === 'IN_PROGRESS' && (
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                      <Play className="h-4 w-4" />
                      <span>Continue</span>
                    </button>
                  )}
                  {assessment.status === 'COMPLETED' && (
                    <div className="space-y-2">
                      <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                        View Results
                      </button>
                      {assessment.attempts < assessment.maxAttempts && (
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          Retake
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Assessments;