#!/bin/bash
# ============================================
# 博客一键构建 + 部署脚本
# ============================================
# 首次使用：
#   chmod +x deploy.sh
#   ./deploy.sh
#
# 首次推送前需要配置 remote：
#   git remote add origin https://github.com/用户名/用户名.github.io.git
#   或 SSH：
#   git remote add origin git@github.com:用户名/用户名.github.io.git
# ============================================

set -e

echo ""
echo "===================================="
echo "  1/3 构建博客..."
echo "===================================="
echo ""
node build.js

echo ""
echo "===================================="
echo "  2/3 提交更改..."
echo "===================================="
echo ""
git add -A

if git diff --cached --quiet; then
  echo "没有新的更改需要提交。"
else
  git commit -m "update: $(date '+%Y-%m-%d %H:%M:%S')"
  echo "提交成功。"
fi

echo ""
echo "===================================="
echo "  3/3 推送到 GitHub..."
echo "===================================="
echo ""
git push

echo ""
echo "===================================="
echo "  部署完成！"
echo "  1-2 分钟后访问博客即可看到更新"
echo "===================================="
echo ""
