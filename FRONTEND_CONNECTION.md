# 🔗 Frontend Connection Guide

## Step 1: Get Your Railway URL
1. Go to your Railway project dashboard
2. Copy your deployment URL (e.g., `https://lms-backend-production-a1b2.railway.app`)
3. Test it by visiting: `YOUR_URL/api/v1/health`
4. Should return: "OK"

## Step 2: Update Environment Variables

Replace `YOUR_RAILWAY_URL_HERE` in `.env.production` with your actual Railway URL:

```bash
# Example:
VITE_API_URL=https://lms-backend-production-a1b2.railway.app/api/v1
```

## Step 3: Build Frontend with Railway Backend

```bash
# Build with production environment
npm run build

# This creates optimized 'dist' folder
```

## Step 4: Upload to NameHero

### Via cPanel File Manager:
1. Login to NameHero cPanel
2. File Manager → `public_html` 
3. Upload all contents from `dist` folder
4. Extract if needed

### Via FTP (Faster):
```
Host: ftp.yourdomain.com
Username: your_cpanel_username
Password: your_cpanel_password
Directory: /public_html
Upload: All files from 'dist' folder
```

## Step 5: Test Full Stack

1. Visit your NameHero domain: `https://yourdomain.com`
2. Try logging in with test credentials:
   - Email: `admin@learnhub.com`
   - Password: `admin123`
3. Check browser Network tab to see API calls to Railway

## Alternative: Keep Using Dummy Auth

If you want to deploy quickly with dummy authentication (no real backend needed):
1. Keep current AuthContext as-is
2. Build and upload to NameHero
3. Works immediately with test login credentials

## Production API Integration (Future)

When ready for real authentication:
1. Build proper login/register endpoints in Spring Boot
2. Update AuthContext to use real API calls
3. Implement JWT token validation
4. Add user database and proper security

## Quick Commands:

```bash
# Update with your Railway URL
# Edit .env.production: VITE_API_URL=https://your-railway-url.railway.app/api/v1

# Build for production
npm run build

# Upload 'dist' folder contents to NameHero cPanel
```

Your LMS will be live at your NameHero domain with Railway backend! 🚀