import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import eslintPluginPromise from "eslint-plugin-promise";
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
    eslintPluginPrettier,
    eslintPluginPromise.configs['flat/recommended'],
    importPlugin.flatConfigs.recommended,
    {
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.ts', '.tsx'],
                    paths: ['.'],
                },
                typescript: {},
            }
        },
        rules: {
            'import/order': [
                'warn',
                {
                    groups: ['builtin', 'external', 'internal'],
                    'newlines-between': 'never',
                },
            ],
        }
    },
);
