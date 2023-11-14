import { ClientOnly } from "@vuepress/client";
import type { VNode } from "vue";
import { defineComponent, h, onMounted, ref } from "vue";

export default defineComponent({
  name: "BingHeroBackground",

  setup() {
    const url = ref<string | null>(null);

    const getImage = async () => {
      const response = await fetch("https://api.zhuwenhao.me/bing");
      url.value = await (<Promise<string>>response.text());
    };

    onMounted(() => {
      getImage();
    });

    return (): VNode => {
      return h(ClientOnly, () =>
        url.value
          ? [
              h("div", {
                class: "vp-blog-mask",
                style: {
                  background: `url(${url.value}) center/cover no-repeat`,
                },
              }),
            ]
          : null
      );
    };
  },
});
