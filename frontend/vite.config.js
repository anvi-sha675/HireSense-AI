import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("recharts")) return "vendor-charts";
          if (id.includes("framer-motion")) return "vendor-motion";
          if (
            id.includes("react-hook-form") ||
            id.includes("@hookform") ||
            id.includes("/zod/")
          )
            return "vendor-form";
          if (
            id.includes("node_modules/react-router") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react/")
          )
            return "vendor-react";
        },
      },
    },
  },
});
