@echo off
echo Adding all resolved files...
git add .

echo Committing merge...
git commit -m "Merge work/merge-stash into main - resolved all conflicts"

echo Pushing to GitHub...
git push origin main

if %errorlevel% neq 0 (
    echo Push failed!
    pause
    exit /b %errorlevel%
)

echo.
echo Success! Merge completed and pushed to GitHub.
echo Vercel will automatically deploy the changes.
pause

