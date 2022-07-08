module.exports = {
  dest: "build",
  head: [
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicon/apple-touch-icon.png",
      },
    ],
    ["link", { rel: "icon", href: "/favicon/favicon.ico" }],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon/favicon-16x16.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon/favicon-32x32.png",
      },
    ],
    ["link", { rel: "manifest", href: "/favicon/site.webmanifest" }],
  ],
  locales: {
    "/": {
      lang: "zh",
      title: "猪蚊耗的笔记本",
      description: "猪蚊耗的笔记本",
    },
  },
  markdown: {
    lineNumbers: true,
  },
  theme: "vdoing",
  themeConfig: {
    displayAllHeaders: true,
    docsDir: "docs",
    editLinks: true,
    editLinkText: "在 GitHub 上编辑此页",
    lastUpdated: "上次更新",
    logo: "/favicon/android-chrome-192x192.png",
    nav: [
      {
        text: "梦",
        link: "https://meng.zhuwenhao.me",
      },
      {
        text: "动画",
        items: [
          { text: "名侦探柯南", link: "/anime/detective-conan/" },
          { text: "魔术快斗", link: "/anime/magic-kaito/" },
          { text: "加速世界", link: "/anime/accel-world/" },
        ],
      },
      {
        text: "教程",
        items: [
          { text: "Linux", link: "/tutorial/linux/" },
          { text: "Shadowsocks-rust", link: "/tutorial/shadowsocks-rust/" },
          { text: "Caddy", link: "/tutorial/caddy/" },
          { text: "RSSBot", link: "/tutorial/rss-bot/" },
        ],
      },
      {
        text: "索引",
        items: [
          { text: "分类", link: "/categories/" },
          { text: "标签", link: "/tags/" },
          { text: "归档", link: "/archives/" },
        ],
      },
    ],
    repo: "zhuwenhao/notebook",
    smoothScroll: true,

    // vdoing theme
    blogger: {
      avatar: "/avatar.png",
      name: "猪蚊耗",
    },
    bodyBgImg: "/bg.jpg",
    bodyBgImgOpacity: 0.8,
    footer: { createYear: 2019, copyrightInfo: "猪蚊耗" },
    sidebarOpen: false,
    social: {
      icons: [
        {
          iconClass: "icon-youjian",
          title: "邮件",
          link: "mailto:m@zhuwenhao.me",
        },
        {
          iconClass: "icon-github",
          title: "Github",
          link: "https://github.com/zhuwenhao",
        },
      ],
    },
    titleBadge: false,
    updateBar: {
      showToArticle: false,
    },
  },
};
