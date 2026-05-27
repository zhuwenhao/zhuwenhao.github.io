/**
 * ============================================
 * 博客构建脚本
 * ============================================
 *
 * 功能：读取 md-posts/ 下的所有 .md 文件，自动生成博客页面
 * 用法：node build.js
 *       或双击 build.bat
 *
 * MD 文件格式：
 * ---
 * title: 文章标题
 * date: 2026-05-20
 * tags: [标签1, 标签2]
 * category: 分类名
 * excerpt: 文章摘要（可选，不填则自动截取正文前 80 字）
 * cover: https://图片链接（可选，不填则使用默认封面）
 * ---
 *
 * 正文内容（Markdown 格式）...
 */

const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

// ========== 配置 ==========
const MD_DIR = path.join(__dirname, "md-posts");
const POSTS_OUTPUT_DIR = path.join(__dirname, "posts");
const POSTS_DATA_FILE = path.join(__dirname, "js", "posts-data.js");
const DEFAULT_COVER = "https://picsum.photos/seed/default/480/360";
const PER_PAGE = 6;

// ========== 读取文章模板 ==========
function getPostTemplate() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - My Blog</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>
  <nav class="navbar">
    <div class="navbar-inner">
      <a href="../index.html" class="navbar-brand">My Blog</a>
      <ul class="navbar-links" id="navLinks">
        <li><a href="../index.html">首页</a></li>
        <li><a href="../archives.html">归档</a></li>
        <li><a href="../categories.html">分类</a></li>
        <li><a href="../tags.html">标签</a></li>
        <li><a href="../about.html">关于</a></li>
      </ul>
      <div class="navbar-actions">
        <button id="searchBtn" title="搜索">&#128269;</button>
        <button id="themeBtn" title="切换主题">&#9790;</button>
        <button class="menu-toggle" id="menuToggle">&#9776;</button>
      </div>
    </div>
  </nav>
  <div class="search-overlay" id="searchOverlay">
    <div class="search-modal">
      <div class="search-modal-header">
        <h3>搜索文章</h3>
        <button class="search-modal-close" id="searchClose">&times;</button>
      </div>
      <div class="search-input-wrap">
        <input type="text" id="searchInput" placeholder="输入关键词搜索..." autocomplete="off">
      </div>
      <div class="search-results" id="searchResults"></div>
    </div>
  </div>
  <main class="main-container">
    <article class="article-content">
      <div class="article-header">
        <a href="../index.html" style="font-size:0.85rem;color:var(--fg-light);">&#8592; 返回首页</a>
        <h1>{{TITLE}}</h1>
        <div class="article-meta">
          <span>{{DATE}}</span>
          <span class="category">{{CATEGORY}}</span>
          <span>{{TAGS_DISPLAY}}</span>
        </div>
      </div>
      <div class="article-body">
        {{BODY}}
      </div>
    </article>
  </main>
  <footer class="footer">
    <div class="footer-links">
      <a href="https://github.com" target="_blank">GitHub</a>
      <a href="mailto:your@email.com">Email</a>
    </div>
    <p>&copy; {{YEAR}} My Blog. All rights reserved.</p>
  </footer>
  <button class="back-to-top" id="backToTop" title="返回顶部">&#8679;</button>
  <script src="../js/posts-data.js"><\/script>
  <script src="../js/main.js"><\/script>
</body>
</html>`;
}

// ========== 解析 frontmatter ==========
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { meta: {}, body: content };
  }

  const front = match[1];
  const body = match[2];

  const meta = {};
  front.split("\n").forEach(function (line) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    // 解析数组格式：[a, b, c]
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map(function (s) { return s.trim(); })
        .filter(Boolean);
    }
    meta[key] = value;
  });

  return { meta, body };
}

// ========== 处理单篇文章 ==========
function processPost(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const { meta, body } = parseFrontmatter(content);

  // 从文件名生成 ID
  const fileName = path.basename(filePath, ".md");
  const id = fileName;

  // 验证必要字段
  if (!meta.title) {
    console.warn("  [警告] " + fileName + ".md 缺少 title 字段，已跳过");
    return null;
  }
  if (!meta.date) {
    meta.date = new Date().toISOString().slice(0, 10);
  }

  // 默认值
  meta.tags = Array.isArray(meta.tags) ? meta.tags : [];
  meta.category = meta.category || "未分类";
  meta.cover = meta.cover || "https://picsum.photos/seed/" + id + "/480/360";

  // 自动生成摘要
  if (!meta.excerpt) {
    const plainText = body
      .replace(/[#*`\[\]()>_~-]/g, "")
      .replace(/\n+/g, " ")
      .trim();
    meta.excerpt = plainText.slice(0, 80) + (plainText.length > 80 ? "..." : "");
  }

  // Markdown 转 HTML
  const htmlBody = marked.parse(body);

  // 生成标签显示文本
  const tagsDisplay = meta.tags.map(function (t) { return "#" + t; }).join(" ");

  // 生成 HTML 文件
  let html = getPostTemplate()
    .replace(/\{\{TITLE\}\}/g, meta.title)
    .replace(/\{\{DATE\}\}/g, meta.date)
    .replace(/\{\{CATEGORY\}\}/g, meta.category)
    .replace(/\{\{TAGS_DISPLAY\}\}/g, tagsDisplay)
    .replace(/\{\{BODY\}\}/g, htmlBody)
    .replace(/\{\{YEAR\}\}/g, new Date().getFullYear().toString());

  // 写入 HTML
  const outputPath = path.join(POSTS_OUTPUT_DIR, id + ".html");
  fs.writeFileSync(outputPath, html, "utf-8");

  return {
    id: id,
    title: meta.title,
    date: meta.date,
    tags: meta.tags,
    category: meta.category,
    excerpt: meta.excerpt,
    cover: meta.cover,
    file: "posts/" + id + ".html"
  };
}

// ========== 生成 posts-data.js ==========
function generatePostsData(posts) {
  // 按日期降序排列
  posts.sort(function (a, b) {
    return b.date.localeCompare(a.date);
  });

  const json = JSON.stringify(posts, null, 2);
  const content =
    "// ============================================\n" +
    "// 文章数据 - 由 build.js 自动生成，请勿手动修改\n" +
    "// 如需添加文章，请在 md-posts/ 目录下创建 .md 文件后运行 node build.js\n" +
    "// ============================================\n\n" +
    "const POSTS = " + json + ";\n";

  fs.writeFileSync(POSTS_DATA_FILE, content, "utf-8");
}

// ========== 主流程 ==========
function main() {
  console.log("");
  console.log("====================================");
  console.log("  博客构建工具 v1.0");
  console.log("====================================");
  console.log("");

  // 确保输出目录存在
  if (!fs.existsSync(POSTS_OUTPUT_DIR)) {
    fs.mkdirSync(POSTS_OUTPUT_DIR, { recursive: true });
  }

  // 读取所有 .md 文件
  if (!fs.existsSync(MD_DIR)) {
    console.log("[错误] 未找到 md-posts/ 目录，请先创建并放入 .md 文件");
    return;
  }

  const files = fs
    .readdirSync(MD_DIR)
    .filter(function (f) { return f.endsWith(".md"); })
    .sort();

  if (files.length === 0) {
    console.log("[提示] md-posts/ 目录下没有 .md 文件");
    // 生成空的 posts-data.js
    generatePostsData([]);
    console.log("已生成空的 js/posts-data.js");
    return;
  }

  console.log("[读取] 找到 " + files.length + " 篇文章:");
  console.log("");

  const posts = [];
  let success = 0;

  files.forEach(function (file) {
    const filePath = path.join(MD_DIR, file);
    console.log("  处理中: " + file);
    try {
      const post = processPost(filePath);
      if (post) {
        posts.push(post);
        success++;
        console.log("    -> posts/" + post.id + ".html");
      }
    } catch (err) {
      console.error("    [错误] " + file + " 处理失败: " + err.message);
    }
  });

  // 生成 posts-data.js
  generatePostsData(posts);

  // 清理：删除 posts/ 中没有对应 .md 的旧 HTML 文件
  const validIds = new Set(posts.map(function (p) { return p.id + ".html"; }));
  const existingHtml = fs.readdirSync(POSTS_OUTPUT_DIR).filter(function (f) { return f.endsWith(".html"); });
  let cleaned = 0;
  existingHtml.forEach(function (f) {
    if (!validIds.has(f)) {
      fs.unlinkSync(path.join(POSTS_OUTPUT_DIR, f));
      cleaned++;
      console.log("  清理: 删除 posts/" + f);
    }
  });
  if (cleaned > 0) {
    console.log("");
    console.log("[清理] 已删除 " + cleaned + " 个过期 HTML 文件");
  }

  console.log("");
  console.log("====================================");
  console.log("  构建完成！");
  console.log("  成功: " + success + " 篇");
  console.log("  总计: " + files.length + " 篇");
  if (cleaned > 0) {
    console.log("  清理: " + cleaned + " 篇");
  }
  console.log("====================================");
  console.log("");
  console.log("下一步：双击 D:\\blog\\index.html 在浏览器中查看博客");
  console.log("");
}

main();
