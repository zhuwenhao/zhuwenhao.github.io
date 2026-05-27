// ============================================
// 博客核心逻辑
// ============================================

document.addEventListener("DOMContentLoaded", function () {

  // --- 主题切换 ---
  const themeBtn = document.getElementById("themeBtn");
  const savedTheme = localStorage.getItem("blog-theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeBtn.addEventListener("click", function () {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("blog-theme", next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    themeBtn.innerHTML = theme === "dark" ? "&#9788;" : "&#9790;";
  }

  // --- 移动端菜单 ---
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });

    // 点击菜单项后关闭
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
      });
    });
  }

  // --- 搜索功能 ---
  const searchBtn = document.getElementById("searchBtn");
  const searchOverlay = document.getElementById("searchOverlay");
  const searchClose = document.getElementById("searchClose");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  if (searchBtn && searchOverlay) {
    searchBtn.addEventListener("click", function () {
      searchOverlay.classList.add("active");
      setTimeout(function () { searchInput.focus(); }, 100);
    });

    searchClose.addEventListener("click", closeSearch);
    searchOverlay.addEventListener("click", function (e) {
      if (e.target === searchOverlay) closeSearch();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeSearch();
      // Ctrl+K 或 Cmd+K 打开搜索
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchOverlay.classList.add("active");
        setTimeout(function () { searchInput.focus(); }, 100);
      }
    });

    searchInput.addEventListener("input", function () {
      const query = searchInput.value.trim().toLowerCase();
      if (!query) {
        searchResults.innerHTML = "";
        return;
      }

      const results = POSTS.filter(function (post) {
        return post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some(function (t) { return t.toLowerCase().includes(query); }) ||
          post.category.toLowerCase().includes(query);
      });

      if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-no-results">没有找到相关文章</div>';
        return;
      }

      searchResults.innerHTML = results.map(function (post) {
        return '<a class="search-result-item" href="' + post.file + '">' +
          '<h4>' + highlightText(post.title, query) + '</h4>' +
          '<p>' + post.date + ' · ' + post.category + '</p>' +
          '</a>';
      }).join("");
    });
  }

  function closeSearch() {
    searchOverlay.classList.remove("active");
    searchInput.value = "";
    searchResults.innerHTML = "";
  }

  function highlightText(text, query) {
    const idx = text.toLowerCase().indexOf(query);
    if (idx === -1) return text;
    return text.slice(0, idx) +
      '<mark style="background:var(--tag-bg);color:var(--accent);padding:0 2px;border-radius:2px;">' +
      text.slice(idx, idx + query.length) + '</mark>' +
      text.slice(idx + query.length);
  }

  // --- 返回顶部 ---
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    });

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- 首页：渲染文章列表 + 分页 ---
  const postList = document.getElementById("postList");
  const paginationEl = document.getElementById("pagination");

  if (postList && typeof POSTS !== "undefined") {
    const perPage = 6;
    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(urlParams.get("page")) || 1;
    const totalPages = Math.ceil(POSTS.length / perPage);
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const pagePosts = POSTS.slice(start, end);

    postList.innerHTML = pagePosts.map(function (post) {
      const tagsHtml = post.tags.map(function (tag) {
        return '<a href="tags.html?tag=' + encodeURIComponent(tag) + '" onclick="event.stopPropagation();">#' + tag + '</a>';
      }).join("");

      return '<article class="post-card" data-href="' + post.file + '">' +
        '<div class="post-card-cover">' +
        '<img src="' + post.cover + '" alt="' + post.title + '" loading="lazy">' +
        '</div>' +
        '<div class="post-card-body">' +
        '<h2>' + post.title + '</h2>' +
        '<p class="excerpt">' + post.excerpt + '</p>' +
        '<div class="post-card-meta">' +
        '<span class="date">' + post.date + '</span>' +
        '<div class="post-card-tags">' + tagsHtml + '</div>' +
        '</div>' +
        '</div>' +
        '</article>';
    }).join("");

    // 绑定卡片点击跳转
    postList.querySelectorAll('.post-card').forEach(function (card) {
      card.addEventListener('click', function () {
        window.location.href = card.getAttribute('data-href');
      });
    });

    // 分页
    if (totalPages > 1) {
      let pages = "";
      pages += '<a href="?page=1"' + (currentPage === 1 ? ' class="active"' : '') + '>1</a>';

      if (currentPage > 3) {
        pages += '<span class="dots">...</span>';
      }

      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages += '<a href="?page=' + i + '"' + (currentPage === i ? ' class="active"' : '') + '>' + i + '</a>';
      }

      if (currentPage < totalPages - 2) {
        pages += '<span class="dots">...</span>';
      }

      if (totalPages > 1) {
        pages += '<a href="?page=' + totalPages + '"' + (currentPage === totalPages ? ' class="active"' : '') + '>' + totalPages + '</a>';
      }

      if (currentPage < totalPages) {
        pages += '<a href="?page=' + (currentPage + 1) + '" class="next">&#8594;</a>';
      }

      paginationEl.innerHTML = pages;
    }
  }

  // --- 归档页 ---
  const archiveTimeline = document.getElementById("archiveTimeline");
  if (archiveTimeline && typeof POSTS !== "undefined") {
    const grouped = {};
    POSTS.forEach(function (post) {
      const year = post.date.split("-")[0];
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(post);
    });

    let html = "";
    const years = Object.keys(grouped).sort(function (a, b) { return b - a; });
    years.forEach(function (year) {
      html += '<div class="archive-year">' + year + '</div>';
      grouped[year].forEach(function (post) {
        html += '<div class="archive-item">' +
          '<a href="' + post.file + '">' + post.title + '</a>' +
          '<span class="date">' + post.date + '</span>' +
          '</div>';
      });
    });
    archiveTimeline.innerHTML = html;
  }

  // --- 标签云页 ---
  const tagCloud = document.getElementById("tagCloud");
  const tagTitle = document.getElementById("tagTitle");

  if (tagCloud && typeof POSTS !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    const filterTag = urlParams.get("tag");

    const allTags = {};
    POSTS.forEach(function (post) {
      post.tags.forEach(function (tag) {
        if (!allTags[tag]) allTags[tag] = 0;
        allTags[tag]++;
      });
    });

    if (filterTag) {
      tagTitle.textContent = '标签：' + filterTag;
      const filtered = POSTS.filter(function (post) {
        return post.tags.indexOf(filterTag) !== -1;
      });

      if (filtered.length === 0) {
        tagCloud.innerHTML = '<p style="color:var(--fg-light)">暂无相关文章</p>';
      } else {
        tagCloud.innerHTML = filtered.map(function (post) {
          return '<article class="post-card" data-href="' + post.file + '" style="display:flex;flex-direction:column;padding:16px;margin-bottom:12px;">' +
            '<h2 style="font-size:1rem;margin-bottom:4px;">' + post.title + '</h2>' +
            '<span style="font-size:0.8rem;color:var(--fg-light)">' + post.date + '</span>' +
            '</article>';
        }).join("");
        tagCloud.querySelectorAll('.post-card').forEach(function (card) {
          card.addEventListener('click', function () {
            window.location.href = card.getAttribute('data-href');
          });
        });
      }
    } else {
      tagCloud.innerHTML = Object.keys(allTags).sort().map(function (tag) {
        return '<a href="tags.html?tag=' + encodeURIComponent(tag) + '">' + tag + ' (' + allTags[tag] + ')</a>';
      }).join("");
    }
  }

  // --- 分类页 ---
  const categoryList = document.getElementById("categoryList");
  const categoryTitle = document.getElementById("categoryTitle");

  if (categoryList && typeof POSTS !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    const filterCat = urlParams.get("cat");

    const allCats = {};
    POSTS.forEach(function (post) {
      if (!allCats[post.category]) allCats[post.category] = 0;
      allCats[post.category]++;
    });

    if (filterCat) {
      categoryTitle.textContent = '分类：' + filterCat;
      const filtered = POSTS.filter(function (post) {
        return post.category === filterCat;
      });

      categoryList.innerHTML = filtered.map(function (post) {
        return '<article class="post-card" data-href="' + post.file + '" style="display:flex;flex-direction:column;padding:16px;margin-bottom:12px;">' +
          '<h2 style="font-size:1rem;margin-bottom:4px;">' + post.title + '</h2>' +
          '<span style="font-size:0.8rem;color:var(--fg-light)">' + post.date + '</span>' +
          '</article>';
      }).join("");
      categoryList.querySelectorAll('.post-card').forEach(function (card) {
        card.addEventListener('click', function () {
          window.location.href = card.getAttribute('data-href');
        });
      });
    } else {
      categoryList.innerHTML = Object.keys(allCats).sort().map(function (cat) {
        return '<a href="categories.html?cat=' + encodeURIComponent(cat) + '">' + cat + ' (' + allCats[cat] + ')</a>';
      }).join("");
    }
  }

});
