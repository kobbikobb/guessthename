import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginPromise from "eslint-plugin-promise";

export default [
  {
    files: ["**/*.{ts}"],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPromise.configs['flat/recommended'],
];
