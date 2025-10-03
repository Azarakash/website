import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import unocss from "unocss/vite";
import eslint from "vite-plugin-eslint2";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  // Handle '@/...' imports
  "resolve": {
    "alias": {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  "plugins": [
    // Handle a Vue framework
    vue(),
    // Handle a UnoCSS package
    unocss(),
    // Handle an ESLint package
    eslint(),
  ],
});
