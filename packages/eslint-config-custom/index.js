module.exports = {
  extends: [
    "next",
    "turbo",
    "prettier",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "prettier/prettier": "error",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
};
