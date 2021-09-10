import { defineConfig } from "vite";
import path from "path";
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
      api: path.resolve(__dirname, "src/api"),
      assets: path.resolve(__dirname, "src/assets"),
      components: path.resolve(__dirname, "src/components"),
      config: path.resolve(__dirname, "src/config"),
      layouts: path.resolve(__dirname, "src/layouts"),
      pages: path.resolve(__dirname, "src/pages"),
      router: path.resolve(__dirname, "src/router"),
      store: path.resolve(__dirname, "src/store"),
      utils: path.resolve(__dirname, "src/utils"),
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
