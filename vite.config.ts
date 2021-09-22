import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  build: { outDir: "front" },
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
      api: path.resolve(__dirname, "website/api"),
      assets: path.resolve(__dirname, "website/assets"),
      components: path.resolve(__dirname, "website/components"),
      config: path.resolve(__dirname, "website/config"),
      layouts: path.resolve(__dirname, "website/layouts"),
      pages: path.resolve(__dirname, "website/pages"),
      router: path.resolve(__dirname, "website/router"),
      store: path.resolve(__dirname, "website/store"),
      utils: path.resolve(__dirname, "website/utils"),
    },
  },
  server: {
    open: true,
    proxy: {
      "/dev-api": {
        target: "http://dottmed.vipgz1.idcfengye.com/warehouse",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, ""),
      },
    },
  },
});
