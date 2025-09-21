# 🚀 LMS Gaming Platform - Deployment Guide

## 📦 Export Package Contents

This export contains both the **backend** (Java Spring Boot) and **frontend** (React TypeScript) applications, ready for local testing and production deployment.

### 📁 Package Structure
```
├── backend-export/          # Java Spring Boot Backend
│   ├── src/main/java/      # Java source code
│   ├── src/main/resources/ # Configuration & templates
│   ├── pom.xml            # Maven dependencies
│   └── README.md          # Backend setup guide
├── frontend-export/        # React TypeScript Frontend
│   ├── src/               # React source code
│   ├── public/            # Static assets
│   ├── package.json       # NPM dependencies
│   └── README.md          # Frontend setup guide
└── DEPLOYMENT_GUIDE.md    # This file
```

## 🏃‍♂️ Quick Local Setup

### 1. Backend Setup (Java Spring Boot)

```bash
# Navigate to backend
cd backend-export

# Run with Maven (Java 17+ required)
mvn spring-boot:run

# Or build and run JAR
mvn clean package
java -jar target/lms-gaming-platform-0.0.1-SNAPSHOT.jar
```

**Backend will run on**: http://localhost:8080

### 2. Frontend Setup (React TypeScript)

```bash
# Navigate to frontend
cd frontend-export

# Install dependencies (Node.js 18+ required)
npm install

# Start development server
npm run dev
```

**Frontend will run on**: http://localhost:5173

### 3. Test the Integration

1. **Start Backend** first (port 8080)
2. **Start Frontend** second (port 5173)
3. **Login** with demo users:
   - Admin: `admin@learnhub.com` / `admin123`
   - Instructor: `instructor@learnhub.com` / `instructor123`
   - Student: `student@learnhub.com` / `student123`

## 🌐 Production Deployment

### Backend Deployment Options

#### Option 1: Traditional Server (Ubuntu/CentOS)

```bash
# Install Java 17
sudo apt update
sudo apt install openjdk-17-jdk

# Install MySQL
sudo apt install mysql-server
mysql -u root -p
CREATE DATABASE lms_gaming_platform;
CREATE USER 'lms_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON lms_gaming_platform.* TO 'lms_user'@'localhost';

# Deploy application
scp target/lms-gaming-platform-0.0.1-SNAPSHOT.jar user@server:/opt/lms/
ssh user@server
cd /opt/lms
java -jar -Dspring.profiles.active=prod lms-gaming-platform-0.0.1-SNAPSHOT.jar
```

#### Option 2: Docker Deployment

```dockerfile
# Dockerfile for backend
FROM openjdk:17-jdk-slim
COPY target/lms-gaming-platform-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
```

```bash
# Build and run
docker build -t lms-backend .
docker run -p 8080:8080 -e SPRING_PROFILES_ACTIVE=prod lms-backend
```

#### Option 3: Cloud Deployment (AWS/Azure/GCP)

- **AWS**: Deploy to Elastic Beanstalk or ECS
- **Azure**: Deploy to App Service or Container Instances
- **GCP**: Deploy to App Engine or Cloud Run

### Frontend Deployment Options

#### Option 1: Static Hosting (Netlify/Vercel)

```bash
# Build for production
npm run build

# Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=dist

# Deploy to Vercel
npm install -g vercel
vercel --prod
```

#### Option 2: Traditional Web Server (Nginx)

```bash
# Build application
npm run build

# Copy to web server
sudo cp -r dist/* /var/www/html/

# Configure Nginx
sudo nano /etc/nginx/sites-available/lms-frontend
```

## 🔧 Configuration Guide

### Environment Variables

#### Backend (.env or system environment)
```bash
# Database
DB_USERNAME=lms_user
DB_PASSWORD=secure_password
DB_URL=jdbc:mysql://localhost:3306/lms_gaming_platform

# JWT
JWT_SECRET=your-super-secret-jwt-key-for-production

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@domain.com
SMTP_PASSWORD=your-app-password

# External Services
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
ZOOM_API_KEY=your_zoom_api_key
ZOOM_API_SECRET=your_zoom_api_secret

# Application
FRONTEND_URL=https://your-domain.com
```

#### Frontend (.env)
```bash
VITE_API_URL=https://api.your-domain.com/api/v1
VITE_APP_NAME=LearnHub Gaming Platform
VITE_STRIPE_PUBLIC_KEY=pk_live_your_stripe_public_key
```

### Database Setup

#### MySQL Schema Creation
```sql
CREATE DATABASE lms_gaming_platform 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE lms_gaming_platform;

-- Tables will be auto-created by Hibernate
-- Or run the provided SQL scripts
```

## 🧪 Testing Checklist

### Backend Testing
- [ ] Application starts without errors
- [ ] Database connection successful
- [ ] H2 console accessible (dev mode)
- [ ] Swagger UI loads at `/swagger-ui.html`
- [ ] Default users created successfully
- [ ] JWT authentication working
- [ ] API endpoints responding correctly

### Frontend Testing
- [ ] Application loads without errors
- [ ] Login/logout functionality works
- [ ] Navigation between pages smooth
- [ ] API calls to backend successful
- [ ] Responsive design on mobile
- [ ] Dark/light theme toggle works

### Integration Testing
- [ ] Frontend can authenticate with backend
- [ ] Course data loads correctly
- [ ] Game sessions can be started
- [ ] Assessment system functional
- [ ] Real-time features working (if applicable)

## 🔒 Security Considerations

### Production Security Checklist
- [ ] Change default JWT secret
- [ ] Use strong database passwords
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable security headers
- [ ] Configure firewall rules
- [ ] Set up monitoring and logging

### Recommended Security Headers
```yaml
# In application.yml
server:
  servlet:
    session:
      cookie:
        secure: true
        http-only: true
        same-site: strict
```

## 📊 Monitoring & Maintenance

### Health Checks
- **Backend**: http://localhost:8080/actuator/health
- **Frontend**: Check console for errors

### Log Locations
- **Backend**: `logs/lms-gaming-platform.log`
- **Frontend**: Browser console and network tab

### Performance Monitoring
- Monitor database connection pool
- Track API response times
- Monitor memory usage
- Set up alerts for errors

## 🆘 Troubleshooting

### Common Issues

#### Backend Won't Start
1. Check Java version: `java -version` (needs 17+)
2. Verify port 8080 is available: `lsof -i :8080`
3. Check database connection
4. Review application logs

#### Frontend Won't Connect
1. Verify backend is running on port 8080
2. Check CORS configuration in backend
3. Verify API_URL in frontend environment
4. Check browser network tab for errors

#### Database Issues
1. Verify MySQL is running: `sudo systemctl status mysql`
2. Check database credentials
3. Ensure database exists and user has permissions
4. Review Hibernate logs for schema issues

### Support Resources
- **Backend Logs**: Check console output for Spring Boot errors
- **Frontend Logs**: Use browser developer tools
- **Database**: Use H2 console or MySQL Workbench
- **API Testing**: Use Swagger UI or Postman

## 🎯 Next Steps After Deployment

1. **Configure External Services**:
   - Set up Stripe for payments
   - Configure Zoom for live sessions
   - Set up email SMTP

2. **Customize Branding**:
   - Update logos and colors
   - Modify email templates
   - Customize course categories

3. **Content Creation**:
   - Create initial courses
   - Set up achievement system
   - Configure game integrations

4. **User Management**:
   - Create instructor accounts
   - Set up user roles
   - Configure permissions

**Your LMS Gaming Platform is ready for production!** 🎉

Both applications are fully functional and can be deployed independently or together. The system includes all enterprise features from Phases 1-3 and is ready to scale.