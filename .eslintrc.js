module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["**/tsconfig.json", "**/tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "cypress/**/*",
    "cypress.config.ts",
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "quotes": ["error", "double"],
    "import/no-unresolved": 0,
    "max-len": ["error", { code: 130 }],
    "object-curly-spacing": ["error", "always"],
    "prefer-const": ["warn"],
    "@typescript-eslint/no-var-requires": "warn",
    "require-jsdoc": "off",
    "valid-jsdoc": "off",
  },
};
