import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            [
              "^react", // react
              "^@?\\w", // 其他 npm 套件
              "^@/", // @/ 絕對路徑
              "^\\.", // 相對路徑
              "^.+\\.s?css$", // 樣式檔
            ],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...Object.assign(
        {},
        ...tseslint.configs.recommendedTypeChecked.map((c) => c.rules),
      ),
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "error",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            [
              "^react", // react
              "^@?\\w", // 其他 npm 套件
              "^@/", // @/ 絕對路徑
              "^\\.", // 相對路徑
              "^.+\\.s?css$", // 樣式檔
            ],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
];
