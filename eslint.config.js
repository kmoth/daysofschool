import js from "@eslint/js";

const browserGlobals = {
  Blob: "readonly",
  document: "readonly",
  ResizeObserver: "readonly",
  URL: "readonly",
  URLSearchParams: "readonly",
  window: "readonly",
};

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      sourceType: "module",
      globals: browserGlobals,
    },
    rules: {
      curly: ["error", "multi-line"],
      eqeqeq: ["error", "always"],
      "no-console": "warn",
      "no-duplicate-imports": "error",
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["test/**/*.js"],
    languageOptions: {
      globals: {},
    },
  },
];
