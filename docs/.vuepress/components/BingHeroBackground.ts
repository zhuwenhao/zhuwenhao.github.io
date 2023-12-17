import { ClientOnly } from "@vuepress/client";
import type { VNode } from "vue";
import { defineComponent, h } from "vue";

export default defineComponent({
  name: "BingHeroBackground",

  setup() {
    return (): VNode => {
      return h(ClientOnly, () => [
        h("div", {
          class: "vp-blog-mask",
          style: {
            background: `url(https://api.zhuwenhao.me/bing) center/cover no-repeat`,
          },
        }),
      ]);
    };
  },
});
