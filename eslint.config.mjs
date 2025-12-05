// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";

// For CommonJS module compatibility
const { jsRecommended } = js;

export default [
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    languageOptions: { globals: globals.node },
    ...jsRecommended, // include recommended rules directly instead of `extends`
  },
];
