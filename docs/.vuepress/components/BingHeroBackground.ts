import { ClientOnly } from "@vuepress/client";
import type { VNode } from "vue";
import { defineComponent, h, onMounted, ref } from "vue";

interface BingWallpaperInfo {
  url: string;
}

export default defineComponent({
  name: "BingHeroBackground",

  setup() {
    const url = ref<string | null>(null);

    const getImage = async () => {
      const response = await fetch(
        "https://bing-wallpaper.vuejs.press/api/wallpaper"
      );
      const data = await (<Promise<BingWallpaperInfo[]>>response.json());
      url.value = data[0].url;
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
