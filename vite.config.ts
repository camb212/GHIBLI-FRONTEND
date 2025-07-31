import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(async () => {
  const react = (await import("@vitejs/plugin-react")).default;
  return {
    plugins: [tailwindcss(), react()],
  };
});
