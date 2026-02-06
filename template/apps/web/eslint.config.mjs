// @ts-check
import { defineConfig } from "eslint/config";
import baseConfig from "@{{name}}/eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default defineConfig([
  baseConfig,
  {
    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
  },
]);
