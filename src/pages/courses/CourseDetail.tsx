import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Award, 
  CheckCircle,
  Lock,
  ArrowLeft,
  Download,
  Share2
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setCurrentCourse, setModules, Course } from '../../store/slices/courseSlice';
import JSCoverImg from '../../assets/images/JSCover.png';
import GOCoverImg from '../../assets/images/GOCover.png';
import CybersecurityCoverImg from '../../assets/images/CybersecurityCover.png';
import PythonCoverImg from '../../assets/images/PythonCover.png';
import ReactCoverImg from '../../assets/images/ReactCover.png';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { currentCourse, modules } = useSelector((state: RootState) => state.course);
  const [activeTab, setActiveTab] = useState('overview');

  // Enrollment handler
  const handleEnrollment = () => {
    // In a real app, this would make an API call
    if (currentCourse) {
      const updatedCourse: Course = {
        ...currentCourse,
        isEnrolled: true,
      };
      dispatch(setCurrentCourse(updatedCourse));
    }
  };

  // Get next incomplete lesson for "Continue Learning"
  const getNextLesson = () => {
    for (const module of modules) {
      for (const lesson of module.lessons) {
        if (!lesson.isCompleted) {
          return { moduleId: module.id, lessonId: lesson.id };
        }
      }
    }
    return null; // All lessons completed
  };



  // Get course-specific data based on course ID
  const getCourseData = (courseId: string) => {
    switch (courseId) {
      case '1':
        return {
          course: {
            id: courseId,
            title: 'JavaScript Fundamentals',
            description: 'Master the fundamentals of JavaScript programming with comprehensive lessons, hands-on exercises, and real-world projects. This course covers everything from basic syntax to advanced concepts like closures, promises, and async/await.',
            thumbnail: JSCoverImg,
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
          modules: [
            {
              id: 'getting-started',
              title: 'Getting Started with JavaScript',
              description: 'Introduction to JavaScript history, tooling, and writing your first program.',
              order: 1,
              lessons: [
                { id: 'what-is-javascript', title: 'What is JavaScript?', description: 'Understanding JavaScript and its role in web development', type: 'TEXT' as const, duration: 15, order: 1, isCompleted: false },
                { id: 'setup-environment', title: 'Setting up Development Environment', description: 'Installing Node.js, VS Code, and essential extensions', type: 'TEXT' as const, duration: 20, order: 2, isCompleted: false },
                {
                  id: 'first-program',
                  title: 'Your First JavaScript Program',
                  description: 'Writing and running your first JavaScript code',
                  type: 'TEXT' as const,
                  duration: 25,
                  order: 3,
                  isCompleted: false,
                  workspace: {
                    assignmentSlug: 'js-fundamentals-first-program',
                    templateSlug: 'js-assignment-template',
                    preferredEnvironment: 'stackblitz' as const,
                    stackblitzUrl: 'https://stackblitz.com/fork/github/FG-SoftwareDeveloper/LMS-MVP/tree/main/templates/js-assignment-template',
                    codesandboxUrl: 'https://codesandbox.io/p/github/FG-SoftwareDeveloper/LMS-MVP/main?file=%2Ftemplates%2Fjs-assignment-template%2FREADME.md',
                    repoUrl: 'https://github.com/FG-SoftwareDeveloper/LMS-MVP/tree/main/templates/js-assignment-template',
                    zipUrl: 'https://github.com/FG-SoftwareDeveloper/LMS-MVP/archive/refs/heads/main.zip',
                    docsUrl: 'https://github.com/FG-SoftwareDeveloper/LMS-MVP/blob/main/templates/js-assignment-template/TASKS.md',
                    instructions: [
                      'Launch the online editor and install dependencies if prompted. The template already includes Vitest and ESLint.',
                      'Open TASKS.md inside the workspace and follow each step to implement the required functions in src/exercises.js.',
                      'Run npm test to execute the Vitest suite and ensure all tests pass before pushing your work to GitHub.'
                    ],
                  },
                },
              ],
            },
            {
              id: 'fundamentals',
              title: 'Core Language & Fundamentals',
              description: 'Build mastery of core JavaScript concepts from variables and scope to prototypes, closures, and modern ES features.',
              order: 2,
              lessons: [
                { id: 'variables-and-types', title: 'Variables and Types', description: 'Working with let/const, primitive types, and dynamic typing', type: 'TEXT' as const, duration: 25, order: 1, isCompleted: false },
                { id: 'operators-and-expressions', title: 'Operators and Expressions', description: 'Combining values with arithmetic, comparison, and logical operators', type: 'TEXT' as const, duration: 20, order: 2, isCompleted: false },
                { id: 'statements-and-control-flow', title: 'Statements and Control Flow', description: 'Controlling program execution with conditionals and loops', type: 'TEXT' as const, duration: 25, order: 3, isCompleted: false },
                { id: 'scope-and-hoisting', title: 'Scope and Hoisting', description: 'Understanding variable visibility, the TDZ, and hoisting behavior', type: 'TEXT' as const, duration: 20, order: 4, isCompleted: false },
                { id: 'strict-mode', title: 'Strict Mode', description: 'Writing safer JavaScript with strict mode semantics', type: 'TEXT' as const, duration: 15, order: 5, isCompleted: false },
                { id: 'closures-in-practice', title: 'Closures & Private State Patterns', description: 'Use closures to encapsulate state and power constructs like React hooks.', type: 'TEXT' as const, duration: 25, order: 6, isCompleted: false },
                { id: 'prototypes-and-this', title: 'Prototypal Inheritance & this Binding', description: 'Understand object delegation, constructor functions, and arrow function binding rules.', type: 'TEXT' as const, duration: 25, order: 7, isCompleted: false },
                { id: 'event-loop-basics', title: 'Event Loop, Call Stack & Async Foundations', description: 'Visualize the call stack, callback queue, and microtask queue to reason about async execution.', type: 'TEXT' as const, duration: 30, order: 8, isCompleted: false },
                { id: 'higher-order-functions', title: 'Higher-Order Functions & Array Utilities', description: 'Master map, filter, reduce and custom higher-order utilities for data pipelines.', type: 'TEXT' as const, duration: 25, order: 9, isCompleted: false },
                { id: 'modern-es-features', title: 'Modern ES6+ Features', description: 'Leverage destructuring, spread/rest, template literals, modules, and more.', type: 'TEXT' as const, duration: 25, order: 10, isCompleted: false },
              ],
            },
            {
              id: 'async-programming',
              title: 'Asynchronous Programming',
              description: 'Write non-blocking JavaScript with callbacks, Promises, async/await, and resilient error handling.',
              order: 3,
              lessons: [
                { id: 'callbacks-and-promises', title: 'Callbacks, Promises & async/await', description: 'Compare async patterns and refactor callback hell into readable flows.', type: 'TEXT' as const, duration: 30, order: 1, isCompleted: false },
                { id: 'async-error-handling', title: 'Error Handling in Async Code', description: 'Handle failures with try/catch, .catch, and fallback strategies that keep apps responsive.', type: 'TEXT' as const, duration: 25, order: 2, isCompleted: false },
                { id: 'parallel-vs-sequential', title: 'Parallel vs Sequential Execution', description: 'Use Promise.all, allSettled, race, and any to coordinate concurrent operations.', type: 'TEXT' as const, duration: 25, order: 3, isCompleted: false },
              ],
            },
            {
              id: 'dom-browser-apis',
              title: 'DOM & Browser APIs',
              description: 'Manipulate the DOM, handle events, work with storage APIs, and communicate over HTTP.',
              order: 4,
              lessons: [
                { id: 'dom-manipulation', title: 'DOM Selection & Manipulation', description: 'Traverse and update elements with querySelector, classList, and templating.', type: 'TEXT' as const, duration: 25, order: 1, isCompleted: false },
                { id: 'dom-events', title: 'Event Handling & Delegation', description: 'Wire addEventListener, capture/bubble cycles, and efficient event delegation.', type: 'TEXT' as const, duration: 25, order: 2, isCompleted: false },
                { id: 'web-storage', title: 'LocalStorage, SessionStorage & Cookies', description: 'Persist data securely in the browser with practical authentication scenarios.', type: 'TEXT' as const, duration: 20, order: 3, isCompleted: false },
                { id: 'fetch-and-xhr', title: 'Networking with Fetch & XHR', description: 'Interact with REST APIs, stream responses, and handle lifecycle hooks.', type: 'TEXT' as const, duration: 25, order: 4, isCompleted: false },
              ],
            },
            {
              id: 'programming-paradigms',
              title: 'Object-Oriented & Functional Patterns',
              description: 'Blend class-based and functional styles to model complex UI and data flows.',
              order: 5,
              lessons: [
                { id: 'object-oriented-js', title: 'Object-Oriented JavaScript', description: 'Work with classes, constructors, inheritance, and method overriding.', type: 'TEXT' as const, duration: 25, order: 1, isCompleted: false },
                { id: 'functional-patterns', title: 'Functional Programming Concepts', description: 'Apply pure functions, immutability, and composition in everyday JavaScript.', type: 'TEXT' as const, duration: 25, order: 2, isCompleted: false },
              ],
            },
            {
              id: 'data-structures-algorithms',
              title: 'Data Structures & Algorithms in JS',
              description: 'Solve common problems with arrays, strings, maps, sets, and recursion.',
              order: 6,
              lessons: [
                { id: 'arrays-techniques', title: 'Array Patterns & Performance', description: 'Implement sliding window, two-pointer, and in-place strategies.', type: 'TEXT' as const, duration: 25, order: 1, isCompleted: false },
                { id: 'string-processing', title: 'Working with Strings', description: 'Parse, transform, and search text efficiently in JavaScript.', type: 'TEXT' as const, duration: 20, order: 2, isCompleted: false },
                { id: 'maps-and-sets', title: 'Objects vs Maps vs Sets', description: 'Choose the right data structure for lookups, caching, and deduplication.', type: 'TEXT' as const, duration: 20, order: 3, isCompleted: false },
                { id: 'recursion-and-trees', title: 'Recursion & Tree Traversal', description: 'Traverse nested data like DOM trees and org charts with recursive patterns.', type: 'TEXT' as const, duration: 25, order: 4, isCompleted: false },
              ],
            },
            {
              id: 'event-loop-concurrency',
              title: 'Event Loop & Concurrency Mastery',
              description: 'Deepen your understanding of JavaScript concurrency and race condition prevention.',
              order: 7,
              lessons: [
                { id: 'sync-vs-async', title: 'Synchronous vs Asynchronous Execution', description: 'Recognize blocking code paths and refactor them for responsive UIs.', type: 'TEXT' as const, duration: 20, order: 1, isCompleted: false },
                { id: 'macro-vs-microtasks', title: 'Macro vs Microtasks', description: 'Differentiate setTimeout, setImmediate, requestAnimationFrame, and microtasks.', type: 'TEXT' as const, duration: 25, order: 2, isCompleted: false },
                { id: 'node-concurrency', title: 'Node.js Concurrency & the Event Loop', description: 'Understand libuv, worker threads, and best practices for non-blocking servers.', type: 'TEXT' as const, duration: 30, order: 3, isCompleted: false },
              ],
            },
            {
              id: 'error-debugging',
              title: 'Error Handling & Debugging',
              description: 'Write resilient code with robust error handling and professional debugging habits.',
              order: 8,
              lessons: [
                { id: 'error-handling-patterns', title: 'Error Handling Patterns', description: 'Craft custom errors, use try/catch/finally, and report issues gracefully.', type: 'TEXT' as const, duration: 20, order: 1, isCompleted: false },
                { id: 'debugging-toolkit', title: 'Debugging with DevTools & Logging', description: 'Master browser DevTools, Node inspectors, breakpoints, and sourcemaps.', type: 'TEXT' as const, duration: 25, order: 2, isCompleted: false },
              ],
            },
            {
              id: 'frameworks-libraries-awareness',
              title: 'Framework & Library Ecosystem',
              description: 'Survey modern frontend frameworks and how they build on foundational JavaScript.',
              order: 9,
              lessons: [
                { id: 'framework-ecosystem', title: 'React, Vue & Angular Overview', description: 'Compare component models, state management, and lifecycle concepts.', type: 'TEXT' as const, duration: 25, order: 1, isCompleted: false },
                { id: 'node-backend-overview', title: 'Node.js & Express Essentials', description: 'Understand Node server architecture and common backend patterns.', type: 'TEXT' as const, duration: 25, order: 2, isCompleted: false },
              ],
            },
            {
              id: 'testing-and-tooling',
              title: 'Testing & Tooling',
              description: 'Automate quality checks with unit tests, linting, formatting, and bundlers.',
              order: 10,
              lessons: [
                { id: 'unit-testing-jest', title: 'Unit Testing with Jest & Friends', description: 'Write tests, use mocks, and integrate coverage reports.', type: 'TEXT' as const, duration: 25, order: 1, isCompleted: false },
                { id: 'linting-and-formatting', title: 'Linting & Formatting Workflows', description: 'Enforce consistency with ESLint, Prettier, and editor integrations.', type: 'TEXT' as const, duration: 20, order: 2, isCompleted: false },
                { id: 'build-tools', title: 'Build Tools & Bundlers', description: 'Use Webpack, Vite, and npm scripts to ship optimized builds.', type: 'TEXT' as const, duration: 25, order: 3, isCompleted: false },
              ],
            },
            {
              id: 'ai-machine-learning',
              title: 'AI & Machine Learning in JavaScript',
              description: 'Build intelligent applications using TensorFlow.js, browser APIs, and edge AI—no heavy backend required.',
              order: 11,
              lessons: [
                { id: 'tensorflow-js-intro', title: 'TensorFlow.js Fundamentals', description: 'Load pre-trained models and run inference directly in the browser.', type: 'TEXT' as const, duration: 35, order: 1, isCompleted: false },
                { id: 'computer-vision-browser', title: 'Computer Vision in the Browser', description: 'Build image classification, object detection, and pose estimation apps.', type: 'TEXT' as const, duration: 40, order: 2, isCompleted: false },
                { id: 'nlp-text-processing', title: 'Natural Language Processing', description: 'Implement sentiment analysis, text classification, and language models.', type: 'TEXT' as const, duration: 35, order: 3, isCompleted: false },
                { id: 'ml-training-browser', title: 'Training Models in the Browser', description: 'Create and train custom models using transfer learning and data collection.', type: 'TEXT' as const, duration: 45, order: 4, isCompleted: false },
                { id: 'edge-ai-optimization', title: 'Edge AI & Performance Optimization', description: 'Optimize models for mobile devices and implement offline-first AI features.', type: 'TEXT' as const, duration: 30, order: 5, isCompleted: false },
                { id: 'ai-project-workshop', title: 'AI Project Workshop', description: 'Build a complete AI-powered web application combining multiple ML techniques.', type: 'ASSESSMENT' as const, duration: 60, order: 6, isCompleted: false },
              ],
            },
            {
              id: 'javascript-security',
              title: 'JavaScript Security Fundamentals',
              description: 'Protect your applications against common client-side and API vulnerabilities.',
              order: 12,
              lessons: [
                { id: 'web-security-basics', title: 'XSS & CSRF Essentials', description: 'Understand injection vectors and defense-in-depth strategies.', type: 'TEXT' as const, duration: 25, order: 1, isCompleted: false },
                { id: 'input-validation-sanitization', title: 'Input Validation & Sanitization', description: 'Validate untrusted data on both client and server to thwart attacks.', type: 'TEXT' as const, duration: 20, order: 2, isCompleted: false },
              ],
            },
            {
              id: 'capstone-project',
              title: 'Capstone Project: Full-Stack Task Management App',
              description: 'Build a comprehensive task management application that demonstrates mastery of JavaScript fundamentals, async programming, DOM manipulation, testing, and security.',
              order: 13,
              lessons: [
                { id: 'capstone-planning', title: 'Project Planning & Architecture', description: 'Design the application structure, data models, and technology stack.', type: 'TEXT' as const, duration: 30, order: 1, isCompleted: false },
                { id: 'capstone-frontend', title: 'Frontend Implementation', description: 'Build the user interface with vanilla JavaScript, handling DOM events and state management.', type: 'ASSESSMENT' as const, duration: 90, order: 2, isCompleted: false },
                { id: 'capstone-backend', title: 'Backend API Development', description: 'Create a Node.js/Express API with authentication, data validation, and error handling.', type: 'ASSESSMENT' as const, duration: 90, order: 3, isCompleted: false },
                { id: 'capstone-testing', title: 'Testing & Quality Assurance', description: 'Implement unit tests, integration tests, and security validations.', type: 'ASSESSMENT' as const, duration: 60, order: 4, isCompleted: false },
                { id: 'capstone-deployment', title: 'Deployment & Performance', description: 'Deploy the application and optimize for production performance.', type: 'ASSESSMENT' as const, duration: 45, order: 5, isCompleted: false },
                { id: 'capstone-presentation', title: 'Project Presentation & Code Review', description: 'Present your project, explain technical decisions, and conduct peer code reviews.', type: 'ASSESSMENT' as const, duration: 30, order: 6, isCompleted: false },
              ],
            },
            {
              id: 'job-preparation',
              title: 'Job Preparation & Career Readiness',
              description: 'Prepare for JavaScript developer interviews with coding challenges, portfolio development, and industry best practices.',
              order: 14,
              lessons: [
                { id: 'technical-interviews', title: 'Technical Interview Preparation', description: 'Practice common JavaScript interview questions and coding challenges.', type: 'TEXT' as const, duration: 40, order: 1, isCompleted: false },
                { id: 'portfolio-development', title: 'Building Your Developer Portfolio', description: 'Create a compelling portfolio showcasing your JavaScript projects and skills.', type: 'TEXT' as const, duration: 35, order: 2, isCompleted: false },
                { id: 'code-review-skills', title: 'Code Review & Collaboration', description: 'Learn to give and receive constructive code feedback in team environments.', type: 'TEXT' as const, duration: 25, order: 3, isCompleted: false },
                { id: 'industry-trends', title: 'JavaScript Ecosystem & Trends', description: 'Stay current with JavaScript trends, new frameworks, and career advancement paths.', type: 'TEXT' as const, duration: 30, order: 4, isCompleted: false },
                { id: 'salary-negotiation', title: 'Salary Negotiation & Career Growth', description: 'Navigate job offers, salary discussions, and long-term career planning.', type: 'TEXT' as const, duration: 25, order: 5, isCompleted: false },
              ],
            },
          ]
        };
      
      case '2':
        return {
          course: {
            id: courseId,
            title: 'React Development Masterclass',
            description: 'Master React.js with advanced concepts, hooks, context, and modern development practices. Build professional web applications with the most popular JavaScript library.',
            thumbnail: ReactCoverImg,
            instructor: { id: '2', firstName: 'Sarah', lastName: 'Smith', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
            category: 'Web Development',
            level: 'INTERMEDIATE' as const,
            duration: 180,
            enrollmentCount: 980,
            rating: 4.9,
            price: 49,
            isEnrolled: false,
            createdAt: '2024-01-10',
            updatedAt: '2024-01-18',
          },
          modules: [
            {
              id: '1',
              title: 'React Fundamentals',
              description: 'Introduction to React and modern development',
              order: 1,
              lessons: [
                {
                  id: 'what-is-react',
                  title: 'What is React?',
                  description: 'Understanding React and its ecosystem',
                  type: 'TEXT' as const,
                  duration: 20,
                  order: 1,
                  isCompleted: false,
                  workspace: {
                    assignmentSlug: 'react-what-is-react',
                    templateSlug: 'codesandbox-react-new',
                    preferredEnvironment: 'codesandbox' as const,
                    codesandboxUrl: 'https://codesandbox.io/p/sandbox/react-new?file=%2Fsrc%2FApp.js',
                    repoUrl: 'https://codesandbox.io/p/sandbox/react-new',
                    instructions: [
                      'Launch the CodeSandbox workspace (opens in a new tab) and sign in so your edits persist.',
                      'Use src/App.js to experiment with the examples from the lesson and observe the live preview.',
                      'Share the sandbox link or export it to GitHub when you are ready for feedback.',
                    ],
                  },
                },
                {
                  id: 'react-setup',
                  title: 'Setting Up Your React Development Environment',
                  description: 'Installing React and development tools',
                  type: 'TEXT' as const,
                  duration: 25,
                  order: 2,
                  isCompleted: false,
                  workspace: {
                    assignmentSlug: 'react-environment-setup',
                    templateSlug: 'codesandbox-react-new',
                    preferredEnvironment: 'codesandbox' as const,
                    codesandboxUrl: 'https://codesandbox.io/p/sandbox/react-new?file=%2Fsrc%2FApp.js',
                    repoUrl: 'https://codesandbox.io/p/sandbox/react-new',
                    instructions: [
                      'Create your copy of the CodeSandbox workspace and explore the project structure in the file explorer.',
                      'Edit src/App.js to practice the setup steps (installing packages, adding components) described in the lesson.',
                      'Document your changes in the sandbox README or export to GitHub for long-term storage.',
                    ],
                  },
                },
                {
                  id: 'components-and-jsx',
                  title: 'Components and JSX',
                  description: 'Building React components with JSX',
                  type: 'TEXT' as const,
                  duration: 30,
                  order: 3,
                  isCompleted: false,
                  workspace: {
                    assignmentSlug: 'react-components-jsx',
                    templateSlug: 'codesandbox-react-new',
                    preferredEnvironment: 'codesandbox' as const,
                    codesandboxUrl: 'https://codesandbox.io/p/sandbox/react-new?file=%2Fsrc%2FApp.js',
                    repoUrl: 'https://codesandbox.io/p/sandbox/react-new',
                    instructions: [
                      'Fork the CodeSandbox editor and build the sample components from this lesson inside src/App.js.',
                      'Create additional components or props variations to reinforce your understanding of JSX.',
                      'Share the sandbox URL with classmates or mentors to showcase what you built.',
                    ],
                  },
                },
              ],
            },
          ]
        };

      case '3':
        return {
          course: {
            id: courseId,
            title: 'Python for Data Science',
            description: 'Comprehensive Python course focusing on data analysis, visualization, and machine learning. Learn pandas, numpy, matplotlib, and scikit-learn.',
            thumbnail: PythonCoverImg,
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
          modules: [
            {
              id: '1',
              title: 'Python for Data Science Fundamentals',
              description: 'Python basics and essential libraries for data science',
              order: 1,
              lessons: [
                { id: 'python-basics-for-data', title: 'Python Basics for Data Science', description: 'Essential Python concepts for data analysis', type: 'TEXT' as const, duration: 25, order: 1, isCompleted: false },
                { id: 'numpy-arrays', title: 'NumPy Arrays and Mathematical Operations', description: 'Working with NumPy for numerical computing', type: 'TEXT' as const, duration: 30, order: 2, isCompleted: false },
                { id: 'pandas-dataframes', title: 'Pandas DataFrames for Data Analysis', description: 'Data manipulation and analysis with pandas', type: 'TEXT' as const, duration: 35, order: 3, isCompleted: false },
              ],
            },
          ]
        };

      case '4':
        return {
          course: {
            id: courseId,
            title: 'Advanced Machine Learning',
            description: 'Deep dive into machine learning algorithms, neural networks, and AI applications. Master supervised and unsupervised learning techniques.',
            thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
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
          modules: [
            {
              id: '1',
              title: 'Machine Learning Fundamentals',
              description: 'Introduction to machine learning concepts and algorithms',
              order: 1,
              lessons: [
                { id: 'ml-introduction', title: 'Introduction to Machine Learning', description: 'Understanding ML concepts and applications', type: 'TEXT' as const, duration: 25, order: 1, isCompleted: false },
                { id: 'supervised-learning', title: 'Supervised Learning Algorithms', description: 'Classification and regression techniques', type: 'TEXT' as const, duration: 30, order: 2, isCompleted: false },
              ],
            },
          ]
        };

      case '5':
        return {
          course: {
            id: courseId,
            title: 'Mobile App Development with Flutter',
            description: 'Build cross-platform mobile applications using Flutter and Dart programming language. Create beautiful, high-performance apps for iOS and Android.',
            thumbnail: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
            instructor: { id: '5', firstName: 'David', lastName: 'Wilson', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
            category: 'Mobile Development',
            level: 'INTERMEDIATE' as const,
            duration: 200,
            enrollmentCount: 623,
            rating: 4.6,
            price: 89,
            isEnrolled: false,
            createdAt: '2023-12-28',
            updatedAt: '2024-01-08',
          },
          modules: [
            {
              id: '1',
              title: 'Flutter Fundamentals',
              description: 'Getting started with Flutter development',
              order: 1,
              lessons: [
                { id: 'flutter-introduction', title: 'Introduction to Flutter', description: 'Understanding Flutter and cross-platform development', type: 'TEXT' as const, duration: 20, order: 1, isCompleted: false },
                { id: 'widgets-and-layouts', title: 'Widgets and Layouts', description: 'Building UIs with Flutter widgets', type: 'TEXT' as const, duration: 30, order: 2, isCompleted: false },
              ],
            },
          ]
        };

      case '6':
        return {
          course: {
            id: courseId,
            title: 'Cybersecurity Foundations & Applied Defense',
            description: 'Experience the attacker mindset, build resilient defenses, and align hands-on labs with Security+ readiness. Each module pairs Red Team simulations with Blue Team remediation inside safe lab environments.',
            thumbnail: CybersecurityCoverImg,
            instructor: { id: '6', firstName: 'Lisa', lastName: 'Anderson', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
            category: 'Cybersecurity',
            level: 'BEGINNER' as const,
            duration: 420,
            enrollmentCount: 892,
            rating: 4.5,
            price: 59,
            isEnrolled: false,
            createdAt: '2023-12-20',
            updatedAt: '2024-01-05',
          },
          modules: [
            {
              id: 'cyber-intro',
              title: 'Introduction to Cybersecurity',
              description: 'Why cyber defense matters, shared vocabulary, and preparing a safe lab playground.',
              order: 1,
              lessons: [
                { id: 'why-cybersecurity-matters', title: 'Why Cybersecurity Matters', description: 'Explore real-world breaches and the balance between innovation and security.', type: 'TEXT' as const, duration: 20, order: 1, isCompleted: false },
                { id: 'cyber-terminology', title: 'Threats, Vulnerabilities, Exploits & Risk', description: 'Master foundational vocabulary for attacker and defender conversations.', type: 'TEXT' as const, duration: 20, order: 2, isCompleted: false },
                { id: 'security-mindsets', title: "Security Mindsets: Attacker vs. Defender", description: 'Compare Red Team curiosity with Blue Team discipline through guided scenarios.', type: 'TEXT' as const, duration: 20, order: 3, isCompleted: false },
                { id: 'lab-setup-basics', title: 'Lab Setup: Building a Safe Testing Environment', description: 'Spin up VMs, Kali boxes, and Docker labs without risking production assets.', type: 'TEXT' as const, duration: 25, order: 4, isCompleted: false },
                { id: 'module1-extra-credit', title: 'Security+ Companion: CIA Triad & NIST Overview', description: 'Optional Security+ alignment covering CIA, control families, and NIST CSF basics.', type: 'TEXT' as const, duration: 20, order: 5, isCompleted: false },
              ],
            },
            {
              id: 'cyber-attack-vectors',
              title: 'Common Attack Vectors',
              description: 'Execute controlled attacks to understand how adversaries breach systems.',
              order: 2,
              lessons: [
                { id: 'phishing-social-engineering', title: 'Phishing & Social Engineering Labs', description: 'Craft and analyze simulated phishing payloads and awareness campaigns.', type: 'TEXT' as const, duration: 25, order: 1, isCompleted: false },
                { id: 'password-attacks', title: 'Password Attacks with Hydra & Hashcat', description: 'Experiment with brute force, dictionary, and credential stuffing techniques.', type: 'TEXT' as const, duration: 30, order: 2, isCompleted: false },
                { id: 'web-attack-simulations', title: 'Web Attack Simulations (SQLi, XSS, CSRF)', description: 'Use DVWA or OWASP Juice Shop to exploit common web vulnerabilities.', type: 'TEXT' as const, duration: 35, order: 3, isCompleted: false },
                { id: 'network-attack-simulations', title: 'Network Attacks & Packet Analysis', description: 'Sniff traffic with Wireshark and explore ARP spoofing in a lab VLAN.', type: 'TEXT' as const, duration: 30, order: 4, isCompleted: false },
                { id: 'project1-simulated-attacks', title: 'Project 1: Document Simulated Attacks', description: 'Run controlled attacks, capture evidence, and summarize findings for stakeholders.', type: 'ASSESSMENT' as const, duration: 45, order: 5, isCompleted: false },
                { id: 'module2-extra-credit', title: 'Security+ Companion: Attack Types & Threat Actors', description: 'Map simulated attacks to Security+ objectives including malware and insider threats.', type: 'TEXT' as const, duration: 20, order: 6, isCompleted: false },
              ],
            },
            {
              id: 'cyber-defense-fundamentals',
              title: 'Defensive Fundamentals',
              description: 'Design layered defenses that blunt the attacks explored in Module 2.',
              order: 3,
              lessons: [
                { id: 'network-segmentation', title: 'Network Segmentation & Firewalls', description: 'Plan secure network zones and evaluate IDS/IPS placement.', type: 'TEXT' as const, duration: 25, order: 1, isCompleted: false },
                { id: 'system-hardening', title: 'Hardening Operating Systems & Applications', description: 'Apply secure baselines, patch strategies, and configuration management.', type: 'TEXT' as const, duration: 30, order: 2, isCompleted: false },
                { id: 'auth-access-controls', title: 'Authentication & Access Controls', description: 'Implement least privilege, MFA patterns, and just-in-time access.', type: 'TEXT' as const, duration: 25, order: 3, isCompleted: false },
                { id: 'encryption-basics', title: 'Encryption Fundamentals', description: 'Compare symmetric vs. asymmetric crypto and key management basics.', type: 'TEXT' as const, duration: 25, order: 4, isCompleted: false },
                { id: 'project2-defensive-build', title: 'Project 2: Secure a Sample Web App', description: 'Add password hashing, input validation, and TLS to a vulnerable starter app.', type: 'ASSESSMENT' as const, duration: 50, order: 5, isCompleted: false },
              ],
            },
            {
              id: 'cyber-ir-monitoring',
              title: 'Monitoring & Incident Response',
              description: 'Detect adversary activity quickly and follow a disciplined response process.',
              order: 4,
              lessons: [
                { id: 'log-analysis', title: 'Log Analysis with Splunk/ELK', description: 'Use SIEM-style tooling to surface anomalies in system and network logs.', type: 'TEXT' as const, duration: 30, order: 1, isCompleted: false },
                { id: 'siem-basics', title: 'SIEM Use Cases & Detection Engineering', description: 'Correlate alerts, build detection rules, and reduce false positives.', type: 'TEXT' as const, duration: 25, order: 2, isCompleted: false },
                { id: 'incident-response-workflow', title: 'Incident Response Lifecycle', description: 'Walk through preparation, detection, containment, eradication, recovery, and lessons learned.', type: 'TEXT' as const, duration: 25, order: 3, isCompleted: false },
                { id: 'simulated-breach', title: 'Simulated Breach Scenario', description: 'Practice triage on a scripted breach using shared evidence packs.', type: 'TEXT' as const, duration: 30, order: 4, isCompleted: false },
                { id: 'project3-detect-respond', title: 'Project 3: Detect & Respond in the Lab', description: 'Use lab telemetry to identify attack chains and produce an IR report.', type: 'ASSESSMENT' as const, duration: 45, order: 5, isCompleted: false },
                { id: 'module4-extra-credit', title: 'Security+ Companion: IR Roles & Playbooks', description: 'Optional drill into incident response teams and Security+ lifecycle expectations.', type: 'TEXT' as const, duration: 20, order: 6, isCompleted: false },
              ],
            },
            {
              id: 'cyber-advanced-practices',
              title: 'Advanced Security Practices',
              description: 'Adopt modern architectures, secure coding, and proactive threat modeling.',
              order: 5,
              lessons: [
                { id: 'zero-trust-model', title: 'Zero Trust Architecture', description: 'Understand principles, reference models, and phased adoption roadmaps.', type: 'TEXT' as const, duration: 25, order: 1, isCompleted: false },
                { id: 'secure-coding-practices', title: 'Secure Coding & Secret Management', description: 'Implement input sanitization, dependency scanning, and vault-driven secrets.', type: 'TEXT' as const, duration: 30, order: 2, isCompleted: false },
                { id: 'threat-modeling-frameworks', title: 'Threat Modeling (STRIDE, DREAD, MITRE ATT&CK)', description: 'Facilitate workshops and score threats using industry frameworks.', type: 'TEXT' as const, duration: 30, order: 3, isCompleted: false },
                { id: 'cloud-container-security', title: 'Cloud & Container Security Basics', description: 'Secure Kubernetes, serverless, and container workloads with guardrails.', type: 'TEXT' as const, duration: 30, order: 4, isCompleted: false },
                { id: 'project4-advanced-security', title: 'Project 4: Advanced Defenses', description: 'Add JWT auth, rate limiting, and dependency scanning to your project.', type: 'ASSESSMENT' as const, duration: 55, order: 5, isCompleted: false },
              ],
            },
            {
              id: 'cyber-capstone',
              title: 'Capstone: Red vs. Blue Showdown',
              description: 'Synthesize the program by building, breaking, defending, and presenting your security story.',
              order: 6,
              lessons: [
                { id: 'capstone-build-system', title: 'Capstone Build & Scope', description: 'Plan and scope a small application or IoT simulation for testing.', type: 'TEXT' as const, duration: 30, order: 1, isCompleted: false },
                { id: 'capstone-red-team', title: 'Red Team Simulation', description: 'Execute selected attack vectors against your capstone system and capture evidence.', type: 'TEXT' as const, duration: 30, order: 2, isCompleted: false },
                { id: 'capstone-blue-team', title: 'Blue Team Hardening', description: 'Apply both foundational and advanced defenses to reduce risk.', type: 'TEXT' as const, duration: 35, order: 3, isCompleted: false },
                { id: 'capstone-presentation', title: 'Presenting Red vs. Blue Findings', description: 'Deliver a narrative walkthrough of attack, defense, and lessons learned.', type: 'ASSESSMENT' as const, duration: 45, order: 4, isCompleted: false },
                { id: 'security-plus-track', title: 'Security+ Companion Track', description: 'Optional map of labs to Security+ domains for certification preparation.', type: 'TEXT' as const, duration: 30, order: 5, isCompleted: false },
              ],
            },
          ]
        };

      case 'go-cloud-services':
        return getCourseData('7');

      case '7':
        return {
          course: {
            id: '7',
            title: 'Go for Cloud Services',
            description: 'Leverage Go\'s simplicity and concurrency strengths to build scalable microservices and cloud-native workloads. Learn idiomatic Go patterns alongside real deployment workflows.',
            thumbnail: GOCoverImg,
            instructor: { id: '7', firstName: 'Michael', lastName: 'Chen', avatar: 'https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
            category: 'Cloud & Backend',
            level: 'INTERMEDIATE' as const,
            duration: 360,
            enrollmentCount: 742,
            rating: 4.7,
            price: 79,
            isEnrolled: false,
            createdAt: '2024-01-18',
            updatedAt: '2024-01-18',
          },
          modules: [
            {
              id: 'go-foundations',
              title: 'Go Language Foundations',
              description: 'Understand why Go excels at building concurrent cloud services and write your first programs.',
              order: 1,
              lessons: [
                { id: 'go-design-philosophy', title: 'Go\'s Design Philosophy', description: 'Explore simplicity, readability, and fast compilation as core Go values.', type: 'TEXT' as const, duration: 15, order: 1, isCompleted: false },
                { id: 'go-tooling', title: 'Go Toolchain Deep Dive', description: 'Use gofmt, go test, go vet, and modules for dependable builds.', type: 'TEXT' as const, duration: 20, order: 2, isCompleted: false },
                { id: 'go-first-service', title: 'Your First Cloud-Ready Service', description: 'Build a minimal HTTP service and explore Go\'s standard library.', type: 'TEXT' as const, duration: 25, order: 3, isCompleted: false },
              ],
            },
            {
              id: 'go-concurrency-primitives',
              title: 'Concurrency Building Blocks',
              description: 'Master goroutines, channels, and synchronization patterns in Go.',
              order: 2,
              lessons: [
                { id: 'goroutines-101', title: 'Goroutines & Lightweight Threads', description: 'Spin up concurrent tasks and manage their lifecycle.', type: 'TEXT' as const, duration: 25, order: 1, isCompleted: false },
                { id: 'channels-communication', title: 'Communicating with Channels', description: 'Coordinate goroutines with channel patterns and directionality.', type: 'TEXT' as const, duration: 30, order: 2, isCompleted: false },
                { id: 'sync-patterns', title: 'Sync Package & Contexts', description: 'Use WaitGroups, Mutexes, and contexts to handle coordination and cancellation.', type: 'TEXT' as const, duration: 30, order: 3, isCompleted: false },
              ],
            },
            {
              id: 'go-concurrency-patterns',
              title: 'Concurrency in Practice',
              description: 'Apply Go concurrency to streaming, rate limiting, and error handling scenarios.',
              order: 3,
              lessons: [
                { id: 'worker-pools', title: 'Worker Pools', description: 'Use buffered channels to control parallel work throughput.', type: 'TEXT' as const, duration: 30, order: 1, isCompleted: false },
                { id: 'pipeline-pattern', title: 'Pipeline Pattern', description: 'Chain goroutines to process data streams efficiently.', type: 'TEXT' as const, duration: 30, order: 2, isCompleted: false },
                { id: 'error-propagation', title: 'Error Propagation & Context Cancellation', description: 'Gracefully unwind concurrent operations when failures occur.', type: 'TEXT' as const, duration: 25, order: 3, isCompleted: false },
              ],
            },
            {
              id: 'go-microservices',
              title: 'Microservices & APIs with Go',
              description: 'Design resilient microservices with Go\'s standard library and popular frameworks.',
              order: 4,
              lessons: [
                { id: 'http-handlers', title: 'HTTP Handlers & Middleware', description: 'Structure handlers, middleware, and routing for RESTful services.', type: 'TEXT' as const, duration: 25, order: 1, isCompleted: false },
                { id: 'validation-config', title: 'Configuration & Validation Patterns', description: 'Organize config, secrets, and validation for production readiness.', type: 'TEXT' as const, duration: 25, order: 2, isCompleted: false },
                { id: 'observability', title: 'Tracing, Metrics & Logging', description: 'Instrument services with OpenTelemetry, Prometheus, and structured logs.', type: 'TEXT' as const, duration: 30, order: 3, isCompleted: false },
              ],
            },
            {
              id: 'go-cloud-deployment',
              title: 'Cloud Deployment & DevOps',
              description: 'Package, test, and deploy Go services using modern cloud-native tooling.',
              order: 5,
              lessons: [
                { id: 'testing-ci', title: 'Testing Strategies & Continuous Integration', description: 'Cover unit, integration, and load testing with GitHub Actions pipelines.', type: 'TEXT' as const, duration: 30, order: 1, isCompleted: false },
                { id: 'docker-kubernetes', title: 'Dockerizing & Kubernetes Deployments', description: 'Containerize services and roll them out to managed Kubernetes clusters.', type: 'TEXT' as const, duration: 30, order: 2, isCompleted: false },
                { id: 'cloud-run-deployment', title: 'Deploy to Cloud Run & AWS Fargate', description: 'Automate deployments to serverless container platforms.', type: 'TEXT' as const, duration: 35, order: 3, isCompleted: false },
              ],
            },
          ]
        };

      default:
        // Fallback to JavaScript course
        return getCourseData('1');
    }
  };

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const courseData = getCourseData(id!);
    dispatch(setCurrentCourse(courseData.course));
    dispatch(setModules(courseData.modules));
  }, [id, dispatch]);

  if (!currentCourse) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'VIDEO':
        return Play;
      case 'TEXT':
        return BookOpen;
      case 'INTERACTIVE':
        return Award;
      case 'GAME':
        return Award;
      case 'ASSESSMENT':
        return CheckCircle;
      default:
        return BookOpen;
    }
  };

  const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = modules.reduce((acc, module) => 
    acc + module.lessons.filter(lesson => lesson.isCompleted).length, 0
  );
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        to="/courses"
        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Courses</span>
      </Link>

      {/* Course Header */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="relative h-64 md:h-80">
          <img
            src={currentCourse.thumbnail}
            alt={currentCourse.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{currentCourse.title}</h1>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span>{currentCourse.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{currentCourse.enrollmentCount.toLocaleString()} students</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(currentCourse.duration)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {currentCourse.instructor.avatar ? (
                <img
                  src={currentCourse.instructor.avatar}
                  alt={`${currentCourse.instructor.firstName} ${currentCourse.instructor.lastName}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
              )}
              <div>
                <p className="font-medium text-gray-900">
                  {currentCourse.instructor.firstName} {currentCourse.instructor.lastName}
                </p>
                <p className="text-sm text-gray-500">Instructor</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>

          {currentCourse.isEnrolled && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Your Progress</span>
                <span>{progressPercentage}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              {currentCourse.price === 0 ? 'Free' : `$${currentCourse.price}`}
            </div>
            {!currentCourse.isEnrolled ? (
              <button 
                onClick={handleEnrollment}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <BookOpen className="h-5 w-5" />
                <span>Enroll Now</span>
              </button>
            ) : (
              <Link
                to={(() => {
                  const nextLesson = getNextLesson();
                  return nextLesson 
                    ? `/courses/${id}/modules/${nextLesson.moduleId}/lessons/${nextLesson.lessonId}`
                    : `/courses/${id}`;
                })()}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span>Continue Learning</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'curriculum', 'reviews', 'instructor'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Course</h3>
                <p className="text-gray-600 leading-relaxed">{currentCourse.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What You'll Learn</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Master JavaScript fundamentals and syntax</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Build interactive web applications</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Understand asynchronous programming</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Work with APIs and external data</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'curriculum' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Course Curriculum</h3>
                <div className="text-sm text-gray-500">
                  {totalLessons} lessons • {formatDuration(currentCourse.duration)}
                </div>
              </div>
              
              {modules.map((module, moduleIndex) => {
                const firstIncompleteLesson = module.lessons.find(lesson => !lesson.isCompleted);
                const isModuleStarted = module.lessons.some(lesson => lesson.isCompleted);
                
                return (
                <div key={module.id} className="border border-gray-200 rounded-lg">
                  <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{module.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                      </div>
                      {currentCourse?.isEnrolled && (
                        <div className="flex items-center space-x-2">
                          {!isModuleStarted && moduleIndex === 0 && (
                            <Link
                              to={`/courses/${id}/modules/${module.id}/lessons/${module.lessons[0]?.id}`}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2"
                            >
                              <Play className="h-4 w-4" />
                              <span>Start Module</span>
                            </Link>
                          )}
                          {firstIncompleteLesson && isModuleStarted && (
                            <Link
                              to={`/courses/${id}/modules/${module.id}/lessons/${firstIncompleteLesson.id}`}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center space-x-2"
                            >
                              <Play className="h-4 w-4" />
                              <span>Continue</span>
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {module.lessons.map((lesson) => {
                      const LessonIcon = getLessonIcon(lesson.type);
                      const isClickable = currentCourse?.isEnrolled;
                      
                      const lessonContent = (
                        <div className={`p-4 flex items-center space-x-3 ${
                          isClickable ? 'hover:bg-gray-50 transition-colors' : ''
                        }`}>
                          <div className={`p-2 rounded-lg ${
                            lesson.isCompleted 
                              ? 'bg-green-100 text-green-600' 
                              : currentCourse?.isEnrolled 
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-100 text-gray-400'
                          }`}>
                            {lesson.isCompleted ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : currentCourse?.isEnrolled ? (
                              <LessonIcon className="h-4 w-4" />
                            ) : (
                              <Lock className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h5 className={`font-medium ${isClickable ? 'text-blue-900 hover:text-blue-700' : 'text-gray-900'}`}>
                              {lesson.title}
                            </h5>
                            <p className="text-sm text-gray-600">{lesson.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="text-sm text-gray-500">
                              {formatDuration(lesson.duration)}
                            </div>
                            {isClickable && (
                              <Play className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                        </div>
                      );

                      return isClickable ? (
                        <Link
                          key={lesson.id}
                          to={`/courses/${id}/modules/${module.id}/lessons/${lesson.id}`}
                          className="block hover:shadow-sm transition-shadow"
                        >
                          {lessonContent}
                        </Link>
                      ) : (
                        <div key={lesson.id}>
                          {lessonContent}
                        </div>
                      );
                    })}
                  </div>
                </div>
                );
              })}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">{currentCourse.rating}</div>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Course Rating</div>
                </div>
                <div className="flex-1">
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 w-8">{rating}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500 w-8">
                          {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '7%' : rating === 2 ? '2%' : '1%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Recent Reviews</h4>
                {/* Mock reviews */}
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1"
                        alt="Reviewer"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">Sarah Chen</span>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">2 days ago</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Excellent course! The instructor explains concepts clearly and the hands-on exercises really help solidify the learning.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'instructor' && (
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <img
                  src={currentCourse.instructor.avatar}
                  alt={`${currentCourse.instructor.firstName} ${currentCourse.instructor.lastName}`}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {currentCourse.instructor.firstName} {currentCourse.instructor.lastName}
                  </h3>
                  <p className="text-gray-600 mb-3">Senior JavaScript Developer & Instructor</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>4.9 Instructor Rating</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>15,420 Students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>12 Courses</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">About the Instructor</h4>
                <p className="text-gray-600 leading-relaxed">
                  John is a seasoned JavaScript developer with over 8 years of experience building web applications. 
                  He has worked with companies ranging from startups to Fortune 500 companies and is passionate about 
                  teaching others the art of programming. His teaching style focuses on practical, hands-on learning 
                  that prepares students for real-world development challenges.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;