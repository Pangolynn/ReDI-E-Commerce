import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import { defineConfig } from "eslint/config";
import react from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        languageOptions: {
            globals: globals.browser,
        },
        plugins: { js, react, tseslint },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            "react/react-in-jsx-scope": "off",
        },
    },
    eslintConfigPrettier,
]);
