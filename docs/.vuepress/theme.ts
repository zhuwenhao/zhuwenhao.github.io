import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme(
  {
    author: {
      name: "猪蚊耗",
      url: "https://zhuwenhao.me",
      email: "m@zhuwenhao.me",
    },
    hostname: "https://zhuwenhao.me",
    displayFooter: true,
    favicon: "/favicon/favicon.ico",
    logo: "/favicon/android-chrome-512x512.png",
    darkmode: "disable",
    repo: "https://github.com/zhuwenhao/notebook",
    docsDir: "docs",
    blog: {
      avatar: "/images/avatar.png",
      medias: {
        Email: "mailto:m@zhuwenhao.me",
        GitHub: "https://github.com/zhuwenhao",
        GitLab: "https://gitlab.com/zhuwenhao",
      },
    },
    contributors: false,
    hideSiteNameOnMobile: false,
    pageInfo: ["Author", "Original", "Date", "PageView", "Category", "Tag"],
    plugins: {
      blog: true,
      mdEnhance: {
        align: true,
        echarts: true,
      },
    },
  },
  {
    custom: true,
  }
);
