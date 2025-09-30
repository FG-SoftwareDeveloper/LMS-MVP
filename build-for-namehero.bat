@echo off
echo 🔗 Building LMS with Railway Backend Connection...

REM Check if Railway URL is set
findstr /C:"YOUR_RAILWAY_URL_HERE" .env.production >nul
if %errorlevel%==0 (
    echo ⚠️  WARNING: Update .env.production with your Railway URL first!
    echo Edit .env.production and replace YOUR_RAILWAY_URL_HERE with your actual Railway URL
    echo Example: https://lms-backend-production-a1b2.railway.app/api/v1
    echo.
    pause
    exit /b 1
)

REM Build the frontend
echo Building frontend with Railway backend connection...
call npm run build

echo ✅ Build complete! 
echo 📁 Files ready in 'dist' folder
echo � Connected to Railway backend
echo 
echo 📋 Next steps:
echo 1. Upload 'dist' folder contents to NameHero cPanel
echo 2. Location: NameHero cPanel → File Manager → public_html
echo 3. Your LMS will be live at your domain!
echo 
echo 🎯 Test with login credentials:
echo    Email: admin@learnhub.com
echo    Password: admin123
echo 
pause