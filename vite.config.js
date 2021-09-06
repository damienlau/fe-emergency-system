import { defineConfig } from "vite";
import { resolve as resolved } from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      api: resolved(__dirname, "website/api"),
      assets: resolved(__dirname, "website/assets"),
      components: resolved(__dirname, "website/components"),
      config: resolved(__dirname, "website/config"),
      layouts: resolved(__dirname, "website/layouts"),
      pages: resolved(__dirname, "website/pages"),
      utils: resolved(__dirname, "website/utils"),
    },
  },
  server: {
    open: true,
    proxy: {
      "/dev-api": {
        target: "http://192.168.1.7:8090/warehouse",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, ""),
      },
    },
  },
});
