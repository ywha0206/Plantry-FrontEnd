import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 8010,
  },
  define: {
    global: "globalThis", // `global`을 브라우저 환경에서 `globalThis`로 매핑
  },
});
