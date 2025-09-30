@echo off
echo 🏗️ Building LMS for NameHero deployment...

REM Build the frontend
echo Building frontend...
call npm run build

echo ✅ Build complete! 
echo 📁 Files ready in 'dist' folder
echo 
echo 📋 Next steps:
echo 1. Deploy backend to Railway (get your API URL)
echo 2. Update .env.production with your Railway URL  
echo 3. Run this script again to rebuild with correct API URL
echo 4. Upload 'dist' folder contents to NameHero cPanel
echo 
echo 🎯 Upload location: NameHero cPanel → File Manager → public_html
echo 
pause