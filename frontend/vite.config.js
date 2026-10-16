import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Los componentes de React Native se renderizan en web con react-native-web
    alias: { "react-native": "react-native-web" },
    extensions: [".web.jsx", ".web.js", ".jsx", ".js", ".json"],
  },
  define: {
    global: "globalThis",
  },
  optimizeDeps: {
    include: ["react-native-web"],
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },
    },
  },
});
