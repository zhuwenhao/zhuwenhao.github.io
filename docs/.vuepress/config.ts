import { getDirname, path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  lang: "zh-CN",
  title: "猪蚊耗的笔记本",
  description: "猪蚊耗的笔记本",
  dest: "build",
  theme,
  alias: {
    "@theme-hope/modules/blog/components/BlogHero": path.resolve(
      __dirname,
      "./components/BlogHero.vue"
    ),
    "@theme-hope/modules/blog/components/InfoList": path.resolve(
      __dirname,
      "./components/InfoList"
    ),
    "@theme-hope/layouts/NotFound": path.resolve(
      __dirname,
      "./layouts/NotFound.vue"
    ),
  },
});
