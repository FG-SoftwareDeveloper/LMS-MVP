# LMS Gaming Platform - Frontend (React TypeScript)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Running the Application

1. **Clone/Extract the frontend files**
2. **Navigate to the frontend directory**
   ```bash
   cd frontend-export
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080 (must be running)

### 🔧 Configuration

#### Backend API Connection
Update `src/services/api.ts` if your backend runs on different port:

```typescript
const API_BASE_URL = 'http://localhost:8080/api/v1';
```

#### Environment Variables
Create `.env` file:

```env
VITE_API_URL=http://localhost:8080/api/v1
VITE_APP_NAME=LearnHub Gaming Platform
```

### 👥 Demo Users

The frontend includes demo authentication that works with these credentials:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@learnhub.com | admin123 |
| Instructor | instructor@learnhub.com | instructor123 |
| Student | student@learnhub.com | student123 |
| User | user@learnhub.com | user123 |

### 📱 Features Included

#### **🔐 Authentication**
- ✅ Login/Register forms with validation
- ✅ Password reset flow
- ✅ Role-based redirects
- ✅ JWT token management

#### **📚 Course Management**
- ✅ Course catalog with search/filters
- ✅ Course detail pages
- ✅ Enrollment system
- ✅ Progress tracking UI

#### **🎮 Game Integration**
- ✅ Game hub with game cards
- ✅ Game session interface
- ✅ Godot engine integration ready
- ✅ Multiplayer game support

#### **🏆 Gamification**
- ✅ Leaderboards with rankings
- ✅ Achievement system
- ✅ Points and level display
- ✅ Progress visualization

#### **📝 Assessments**
- ✅ Assessment listing and filtering
- ✅ Question types support
- ✅ Timer functionality
- ✅ Results display

#### **💬 Communication**
- ✅ Chat interface (UI ready)
- ✅ Forum structure
- ✅ Messaging system

#### **📊 Analytics**
- ✅ Student dashboard with charts
- ✅ Progress visualization
- ✅ Performance metrics
- ✅ Interactive charts with Chart.js

#### **⚙️ Administration**
- ✅ Admin panel access
- ✅ User management interface
- ✅ Course management tools

### 🎨 Design Features

#### **🌓 Theme Support**
- Light/Dark mode toggle
- System preference detection
- Persistent theme storage

#### **📱 Responsive Design**
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions

#### **♿ Accessibility**
- WCAG 2.1 guidelines
- Keyboard navigation
- Screen reader support
- High contrast support

### 🔌 Backend Integration

#### **API Service**
The frontend includes a complete API service layer:

```typescript
// Authentication
authAPI.login(email, password)
authAPI.register(userData)

// Courses
courseAPI.getCourses(filters)
courseAPI.enrollInCourse(courseId)

// Games
gameAPI.startGameSession(gameId)
gameAPI.updateGameSession(sessionId, data)

// Assessments
assessmentAPI.startAssessment(assessmentId)
assessmentAPI.submitAssessment(attemptId)
```

#### **State Management**
- Redux Toolkit for global state
- React Query for server state
- Context providers for themes/auth

### 📦 Build for Production

```bash
npm run build
```

The build artifacts will be in the `dist/` folder, ready for deployment.

### 🧪 Testing

```bash
npm run test        # Run tests
npm run lint        # Check code quality
```

### 📁 Project Structure

```
frontend-export/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── contexts/      # React contexts
│   ├── hooks/         # Custom hooks
│   ├── services/      # API services
│   ├── store/         # Redux store
│   └── styles/        # CSS and styling
├── public/           # Static assets
└── package.json      # Dependencies
```

### 🔗 Integration with Backend

1. **Start Backend**: Ensure Spring Boot app is running on port 8080
2. **Start Frontend**: Run `npm run dev` on port 5173
3. **Test Integration**: Login and navigate through the application

### 🆘 Troubleshooting

#### **CORS Issues**
If you get CORS errors, ensure the backend `SecurityConfig.java` includes:
```java
.cors().configurationSource(corsConfigurationSource())
```

#### **API Connection Issues**
- Verify backend is running on port 8080
- Check browser network tab for failed requests
- Ensure API_BASE_URL is correct

#### **Build Issues**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### 🎯 Demo Flow

1. **Login** as any demo user
2. **Browse Courses** in the catalog
3. **Play Games** in the game hub
4. **Take Assessments** to test the system
5. **View Analytics** in the dashboard
6. **Check Leaderboards** for gamification

The frontend is fully functional and ready to integrate with your Java backend!