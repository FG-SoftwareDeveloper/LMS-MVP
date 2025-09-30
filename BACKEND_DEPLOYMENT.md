# 🚀 Backend Deployment Guide

## Option 1: Railway (Recommended - Free Tier Available)

### Quick Deploy to Railway:
1. **Create Railway Account**: [railway.app](https://railway.app)
2. **Connect GitHub**: Link your repository
3. **Deploy Backend**:
   ```bash
   # Railway will auto-detect Spring Boot
   # No additional config needed
   ```
4. **Set Environment Variables** in Railway dashboard:
   ```
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   JWT_SECRET=your-super-secret-jwt-key-for-production
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```

### Railway Features:
- ✅ Free PostgreSQL database
- ✅ Automatic HTTPS
- ✅ Git-based deployments
- ✅ Environment variables management
- ✅ Logs and metrics

## Option 2: Render (Alternative)

### Deploy to Render:
1. **Create Render Account**: [render.com](https://render.com)
2. **Create Web Service**: Connect to GitHub
3. **Build Command**: `./mvnw clean package -DskipTests`
4. **Start Command**: `java -jar target/lms-gaming-platform-0.0.1-SNAPSHOT.jar`

## Option 3: Heroku (Paid)

### Deploy to Heroku:
```bash
# Install Heroku CLI
heroku create your-lms-backend
heroku config:set DB_USERNAME=your_username
heroku config:set DB_PASSWORD=your_password
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

## Database Options:

### For Railway:
- Use Railway's PostgreSQL add-on (free tier: 1GB)

### For Render:
- Use Render's PostgreSQL (free tier: 1GB, expires after 90 days)

### For Heroku:
- Use Heroku Postgres add-on

## Environment Variables Needed:
```
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password  
DB_URL=your_database_url
JWT_SECRET=your-jwt-secret-key
FRONTEND_URL=https://your-vercel-app.vercel.app
STRIPE_SECRET_KEY=your_stripe_key (optional)
SMTP_HOST=smtp.gmail.com (for emails)
SMTP_USERNAME=your_email
SMTP_PASSWORD=your_app_password
```

## Backend URL Structure:
- **Base URL**: `https://your-backend.railway.app`
- **API Endpoints**: `https://your-backend.railway.app/api/v1/*`
- **Health Check**: `https://your-backend.railway.app/actuator/health`