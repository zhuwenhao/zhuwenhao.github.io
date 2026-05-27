# 个人博客 - 完整部署指南

## 一、简介

这是一个**纯静态博客**，无需数据库、无需服务器，直接部署在 GitHub Pages 上即可访问。
你只需要会写 Markdown 文件，博客内容自动生成。

### 博客功能

- 卡片式文章列表，带封面图和标签
- 暗色 / 亮色主题切换
- 全文搜索（Ctrl+K 快捷键）
- 按标签、分类筛选文章
- 时间线归档
- 响应式设计，手机端适配
- 分页导航

---

## 二、目录结构说明

```
blog/
├── index.html              # 首页
├── archives.html           # 归档页
├── categories.html         # 分类页
├── tags.html               # 标签页
├── about.html              # 关于页（修改你的个人信息）
├── build.js                # 构建脚本（核心）
├── build.bat               # 双击即可构建
├── deploy.sh               # 一键部署到 GitHub Pages
├── package.json            # Node.js 依赖（marked 库）
├── .gitignore              # Git 忽略规则
│
├── css/
│   └── style.css           # 全局样式（配色在这里改）
│
├── js/
│   ├── posts-data.js       # 文章数据（自动生成，不要手动改）
│   └── main.js             # 核心逻辑（搜索、分页、主题切换）
│
├── posts/                  # 构建生成的 HTML 文章（自动生成）
│
├── md-posts/               # ⭐ 你的 Markdown 源文件放这里
│   ├── hello-world.md      # 示例文章
│   └── ...
│
└── README.md               # 本文件
```

---

## 三、环境准备

### 3.1 必需软件

| 软件 | 版本要求 | 安装方式 |
|------|----------|----------|
| **Node.js** | >= 16 | https://nodejs.org 下载 LTS 版安装 |
| **Git** | >= 2.30 | https://git-scm.com 下载安装 |

安装后在终端验证：
```bash
node -v    # 应输出 v18.x 或更高
npm -v     # 应输出 9.x 或更高
git --version  # 应输出 2.30 或更高
```

### 3.2 GitHub 账号

如果你还没有 GitHub 账号，去 https://github.com 注册一个。

---

## 四、部署步骤（从零开始）

### 第 1 步：创建 GitHub Pages 仓库

1. 打开 https://github.com/new
2. 仓库名称填：`你的用户名.github.io`
   - 例如用户名是 `tom`，就填 `tom.github.io`
   - **必须**是这个格式，否则 GitHub Pages 不会自动生效
3. 选择 **Public**（公开）
4. 不要勾选 "Add a README file"
5. 点击 "Create repository"

### 第 2 步：安装项目依赖

把整个 `blog` 文件夹复制到目标电脑上，然后：

```bash
cd blog
npm install
```

> 这只安装 `marked`（Markdown 解析库），只需执行一次。

### 第 3 步：首次推送到 GitHub

**方式 A：HTTPS（简单，推荐新手）**

```bash
cd blog

# 初始化 Git（如果是全新复制过来的文件夹）
git init
git branch -M main

# 关联远程仓库（替换为你自己的仓库地址）
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git

# 添加文件并提交
git add -A
git commit -m "init: 博客初始化"

# 推送到 GitHub（会弹出登录窗口让你授权）
git push -u origin main
```

> 如果推送时提示输入密码，GitHub 已不支持密码认证。你需要：
> 1. 打开 https://github.com/settings/tokens
> 2. 点击 "Generate new token (classic)"
> 3. 勾选 `repo` 权限，生成 Token
> 4. 推送时密码栏粘贴这个 Token

**方式 B：SSH（一次配置，永久使用）**

```bash
# 1. 生成 SSH 密钥
ssh-keygen -t ed25519 -C "你的邮箱"
# 一路回车即可

# 2. 查看公钥
cat ~/.ssh/id_ed25519.pub
# 复制输出的全部内容

# 3. 添加到 GitHub
# 打开 https://github.com/settings/keys
# 点击 "New SSH key"，标题随便填，粘贴公钥，保存

# 4. 推送
cd blog
git init
git branch -M main
git remote add origin git@github.com:你的用户名/你的用户名.github.io.git
git add -A
git commit -m "init: 博客初始化"
git push -u origin main
```

### 第 4 步：启用 GitHub Pages

1. 打开你的仓库页面 https://github.com/你的用户名/你的用户名.github.io
2. 点击 "Settings"（设置）
3. 左侧菜单找到 "Pages"
4. "Source" 选择 "Deploy from a branch"
5. Branch 选择 `main`，文件夹选 `/ (root)`
6. 点击 "Save"
7. 等待 1-2 分钟，页面顶部会出现你的博客地址

访问 `https://你的用户名.github.io` 即可看到博客！

---

## 五、写文章（日常工作流）

### 5.1 创建新文章

在 `md-posts/` 文件夹下创建一个 `.md` 文件，例如 `my-first-post.md`：

```markdown
---
title: 我的第一篇文章
date: 2026-05-28
tags: [日常, 随笔]
category: 生活
excerpt: 这是我的第一篇博客文章，记录搭建博客的过程。
---

## 正文标题

这里是正文内容，使用 Markdown 语法编写。

### 支持的 Markdown 语法

- **粗体**、*斜体*、~~删除线~~
- `行内代码`
- [链接](https://example.com)
- ![图片](https://example.com/image.png)

### 代码块

```python
print("Hello World")
```

### 引用

> 这是一段引用文字。

### 表格

| 姓名 | 年龄 |
|------|------|
| 张三 | 25   |
| 李四 | 30   |
```

### 5.2 Frontmatter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ 是 | 文章标题 |
| `date` | 否 | 发布日期，格式 `YYYY-MM-DD`，不填默认今天 |
| `tags` | 否 | 标签数组，如 `[Git, GitHub]`，默认空 |
| `category` | 否 | 分类名，默认"未分类" |
| `excerpt` | 否 | 摘要文字，不填自动截取正文前 80 字 |
| `cover` | 否 | 封面图 URL，不填自动生成随机封面 |

### 5.3 构建博客

**Windows：** 双击 `build.bat`

**Mac / Linux：**
```bash
node build.js
```

你会看到类似输出：
```
====================================
  博客构建工具 v1.0
====================================

[读取] 找到 10 篇文章:

  处理中: my-first-post.md
    -> posts/my-first-post.html

====================================
  构建完成！
  成功: 10 篇
====================================
```

### 5.4 推送到 GitHub

```bash
git add -A
git commit -m "new: 我的第一篇文章"
git push
```

稍等 1-2 分钟，刷新博客页面即可看到新文章。

---

## 六、自定义博客

### 6.1 修改博客名称

全局搜索替换所有 HTML 文件中的 `My Blog` 为你的博客名。

主要文件：
- `index.html`、`archives.html`、`categories.html`、`tags.html`、`about.html` 中的 `<a class="navbar-brand">My Blog</a>`
- `about.html` 页脚的 `My Blog`

### 6.2 修改关于页

编辑 `about.html`，修改：
- 头像（可以换成图片 URL）
- 姓名、简介
- 位置、职业、兴趣、邮箱
- 社交链接

### 6.3 修改页脚链接

在每个 HTML 文件的 `<footer>` 部分，修改链接地址。

### 6.4 修改配色方案

编辑 `css/style.css` 顶部的 CSS 变量：

```css
:root {
  --accent: #4a90d9;        /* 主题色（链接、按钮） */
  --bg: #f5f5f5;            /* 背景色 */
  --fg: #333333;            /* 文字颜色 */
  /* ... */
}
```

### 6.5 修改每页显示文章数

编辑 `js/main.js`，找到 `const perPage = 6;`，改成你想要的数字。

---

## 七、常用命令速查

```bash
# 写完文章后，完整流程
cd blog
node build.js                          # 构建
git add -A                             # 添加所有更改
git commit -m "update: 更新博客"       # 提交
git push                               # 推送

# 查看状态
git status
git log --oneline -10

# 回退某个文件
git checkout -- index.html

# 本地预览（直接用浏览器打开）
start index.html        # Windows
open index.html         # Mac
```

---

## 八、常见问题

### Q: 推送后博客页面显示 404？
- 确认仓库名是 `你的用户名.github.io`
- 确认在 Settings → Pages 中选择了 `main` 分支
- 等待 2-3 分钟再刷新

### Q: 新文章没显示？
- 确认运行了 `node build.js`
- 确认 `git push` 成功
- 确认 `.md` 文件的 frontmatter 格式正确（`---` 前后不能有空格）

### Q: 中文文件名乱码？
- 文件名建议只用英文、数字和连字符
- 中文标题写在 frontmatter 的 `title` 字段里就行

### Q: 想换电脑怎么办？
- 把整个 `blog` 文件夹复制到新电脑
- 在新电脑上执行 `npm install`（只需一次）
- 直接写文章、构建、推送

### Q: 想绑定自定义域名？
1. 在 `blog` 根目录创建 `CNAME` 文件，内容写你的域名，如 `www.example.com`
2. 在域名服务商处添加 CNAME 记录指向 `你的用户名.github.io`
3. 在 GitHub 仓库 Settings → Pages → Custom domain 填入域名

---

## 九、文件备份建议

你的 **Markdown 源文件**（`md-posts/` 文件夹）是最重要的资产。
建议：

1. **方案 A：** 把 `md-posts/` 也加入 Git（从 `.gitignore` 中删除该行）
2. **方案 B：** 用云盘同步 `md-posts/` 文件夹
3. **方案 C：** 定期手动备份到 U 盘或其他位置

只要 `md-posts/` 里的 `.md` 文件还在，随时可以从头重建博客。
