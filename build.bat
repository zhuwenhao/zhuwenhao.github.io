@echo off
chcp 65001 >nul
setlocal

echo.
echo ====================================
echo   1/3 构建博客...
echo ====================================
echo.
:: 确保 D:\nodejs 在 PATH 中（兼容不同环境）
set "PATH=D:\nodejs;%PATH%"
node build.js
if %errorlevel% neq 0 (
    echo.
    echo [失败] 构建出错，请检查 md-posts/ 中的 .md 文件格式。
    echo.
    pause
    exit /b 1
)

echo.
echo ====================================
echo   2/3 提交更改...
echo ====================================
echo.

:: 确保 D:\Git 在 PATH 中（适配未加入系统 PATH 的情况）
set "PATH=D:\Git\bin;D:\Git\cmd;%PATH%"

git add -A
git diff --cached --quiet
if %errorlevel% equ 0 (
    echo 没有新的更改需要提交。
) else (
    git commit -m "update: %date:~0,10% %time:~0,8%"
    if %errorlevel% neq 0 (
        echo.
        echo [失败] Git 提交失败，请检查 Git 配置。
        echo.
        pause
        exit /b 1
    )
    echo 提交成功。
)

echo.
echo ====================================
echo   3/3 推送到 GitHub...
echo ====================================
echo.
git push
if %errorlevel% neq 0 (
    echo.
    echo [失败] 推送失败。常见原因：
    echo   - 首次推送需要先执行: git remote add origin https://github.com/用户名/用户名.github.io.git
    echo   - 未配置 Git 凭据，需要登录 GitHub 授权或使用 Personal Access Token
    echo   - 远程仓库地址不正确，执行: git remote -v 查看
    echo.
    pause
    exit /b 1
)

echo.
echo ====================================
echo   部署完成！
echo   1-2 分钟后访问你的博客即可看到更新
echo ====================================
echo.
pause
