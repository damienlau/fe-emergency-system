import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  css: {
    modules: { localsConvention: "camelCase" },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "assets"),
      config: path.resolve(__dirname, "config"),
      website: path.resolve(__dirname, "website"),
    },
  },
  server: { open: { broswer: "google chrome" } },
});
