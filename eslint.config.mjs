import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      "indent": ["error", 2],
      "react/self-closing-comp": ["error", {
        "component": true,
        "html": true
      }],
      "no-trailing-spaces": ["error"],
      "object-curly-spacing": ["error", "always"],
    }
  }),
];

export default eslintConfig;
