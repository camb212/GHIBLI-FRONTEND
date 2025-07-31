import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  root: process.cwd(),
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html')
    },
    outDir: 'dist'
  }
});