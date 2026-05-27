@echo off
setlocal

set "PATH=D:\nodejs;D:\Git\bin;D:\Git\cmd;%PATH%"

echo.
echo ====================================
echo   1/3 Building...
echo ====================================
echo.
node build.js
if %errorlevel% neq 0 (
    echo.
    echo [FAIL] Build error. Check md-posts/ folder.
    echo.
    pause
    exit /b 1
)

echo.
echo ====================================
echo   2/3 Committing...
echo ====================================
echo.

git add -A
git diff --cached --quiet
if %errorlevel% equ 0 (
    echo No changes to commit.
) else (
    git commit -m "update: %date:~0,10% %time:~0,8%"
    if %errorlevel% neq 0 (
        echo.
        echo [FAIL] Git commit failed.
        echo.
        pause
        exit /b 1
    )
    echo Commit OK.
)

echo.
echo ====================================
echo   3/3 Pushing...
echo ====================================
echo.
git push
if %errorlevel% neq 0 (
    echo.
    echo [FAIL] Push failed.
    echo   - Check: git remote -v
    echo   - Make sure SSH key is configured
    echo.
    pause
    exit /b 1
)

echo.
echo ====================================
echo   Deploy done!
echo   Visit https://zhuwenhao.github.io
echo ====================================
echo.
pause
