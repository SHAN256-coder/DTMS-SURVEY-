@echo off
REM Quick setup script for DTMS Survey

echo ========================================
echo    DTMS Survey - Quick Setup
echo ========================================
echo.

echo Installing dependencies...
call npm install

if errorlevel 1 (
    echo Error installing dependencies!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Setup complete! Next steps:
echo ========================================
echo.
echo 1. Create Google Sheet at sheets.google.com
echo 2. Note the Sheet ID from the URL
echo.
echo 3. Go to script.google.com and create new project
echo 4. Copy code from GoogleAppsScript.gs
echo 5. Replace YOUR_GOOGLE_SHEET_ID with your actual ID
echo 6. Deploy as Web App (Anyone access)
echo 7. Copy deployment URL
echo.
echo 8. Open src/App.jsx
echo 9. Replace YOUR_GOOGLE_SCRIPT_ID with deployment URL
echo.
echo 10. Run: npm run dev
echo 11. Test at http://localhost:3000
echo.
echo 12. When ready: vercel deploy --prod
echo.
echo ========================================
pause
