import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme(
  {
    author: {
      email: "m@zhuwenhao.me",
      name: "猪蚊耗",
      url: "https://zhuwenhao.me",
    },
    blog: {
      articleInfo: [
        "Author",
        "Original",
        "Date",
        "PageView",
        "Category",
        "Tag",
      ],
      avatar: "/images/avatar.png",
      medias: {
        Email: "mailto:m@zhuwenhao.me",
        GitHub: "https://github.com/zhuwenhao",
        GitLab: "https://gitlab.com/zhuwenhao",
      },
    },
    contributors: false,
    darkmode: "disable",
    displayFooter: true,
    docsDir: "docs",
    favicon: "/favicon/favicon.ico",
    hideSiteNameOnMobile: false,
    hostname: "https://zhuwenhao.me",
    logo: "/favicon/android-chrome-512x512.png",
    metaLocales: {
      lastUpdated:"更新时间"
    },
    pageInfo: ["Author", "Original", "Date", "PageView", "Category", "Tag"],
    plugins: {
      blog: true,
      mdEnhance: {
        align: true,
        echarts: true,
      },
    },
    repo: "https://github.com/zhuwenhao/notebook",
  },
  {
    custom: true,
  }
);
