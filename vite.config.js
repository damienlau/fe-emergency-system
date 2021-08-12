import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      config: path.resolve(__dirname, "config"),
      website: path.resolve(__dirname, "website"),
    },
  },
  server: { open: { broswer: "google chrome" } },
});
