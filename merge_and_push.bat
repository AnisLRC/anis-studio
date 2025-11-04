@echo off
echo Merging work/merge-stash into main...
git merge work/merge-stash
if %errorlevel% neq 0 (
    echo Merge failed! Please check for conflicts.
    pause
    exit /b %errorlevel%
)
echo Merge successful!
echo.
echo Pushing to GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo Push failed!
    pause
    exit /b %errorlevel%
)
echo.
echo Success! Changes pushed to GitHub.
echo Vercel will automatically deploy the changes.
pause

