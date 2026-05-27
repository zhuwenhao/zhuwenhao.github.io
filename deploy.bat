@echo off
chcp 65001 >nul
setlocal

echo.
echo ====================================
echo   1/3 构建博客...
echo ====================================
echo.
node build.js
if %errorlevel% neq 0 (
    echo 构建失败！请检查 md-posts/ 中的 .md 文件格式。
    pause
    exit /b 1
)

echo.
echo ====================================
echo   2/3 提交更改...
echo ====================================
echo.
git add -A

:: 检查是否有更改
git diff --cached --quiet
if %errorlevel% equ 0 (
    echo 没有新的更改需要提交
) else (
    git commit -m "update: %date% %time%"
    echo 提交成功
)

echo.
echo ====================================
echo   3/3 推送到 GitHub...
echo ====================================
echo.
git push

echo.
echo ====================================
echo   部署完成！
echo   1-2 分钟后刷新博客页面即可看到更新
echo ====================================
echo.
pause
