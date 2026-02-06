import dotenvx from "@dotenvx/dotenvx-ops";
import path from "path";

dotenvx.config({
  path: path.resolve(__dirname, "../../.env"),
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
