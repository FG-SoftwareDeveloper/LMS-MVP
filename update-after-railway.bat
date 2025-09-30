REM 🔄 After you get your Railway URL, run this:

REM 1. Replace YOUR_RAILWAY_URL with the actual URL from Railway
REM Example: https://lms-backend-production-a1b2.railway.app

echo STEP 1: Update your Railway URL in .env.production
echo Replace "your-backend-url" with your actual Railway URL
echo.
echo STEP 2: Rebuild frontend with correct API URL
call npm run build
echo.
echo STEP 3: Upload 'dist' folder contents to NameHero cPanel
echo Location: cPanel → File Manager → public_html
echo.
echo 🎯 Your LMS will be live at your NameHero domain!
pause