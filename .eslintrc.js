module.exports = {
  extends: ["alloy", "alloy/react", "plugin:import/errors", "plugin:import/warnings", "plugin:jsx-a11y/recommended"],
  plugins: ["import", "jsx-a11y"],
  env: {
    browser: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: ["alloy/typescript", "plugin:import/typescript"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
      rules: {
        "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
        "@typescript-eslint/explicit-member-accessibility": ["error", { accessibility: "no-public" }],
        "@typescript-eslint/lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/member-ordering": [
          "error",
          {
            default: ["signature", "field", "constructor", "method"],
          },
        ],
      },
    },
  ],
  rules: {
    "arrow-body-style": ["error", "as-needed"],
    "prefer-const": "error",
    "no-duplicate-imports": "off",
    "no-template-curly-in-string": "off",
    "no-undef": "off",
    "no-unused-vars": "off",

    // react
    "react/prop-types": "off",
    "react/no-array-index-key": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-pascal-case": "off",
    "react/jsx-uses-react": "warn",
    "react/jsx-uses-vars": "warn",

    // import
    "import/no-unresolved": "off",
    "import/no-relative-parent-imports": "off",
    "import/prefer-default-export": "off",

    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
  },
};
