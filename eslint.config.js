import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import unusedImports from 'eslint-plugin-unused-imports';


export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            react: react,
            'unused-imports': unusedImports,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'no-console': ['error'],
            'no-alert': ['error'],
            curly: ['error'],
            'object-curly-spacing':['error', 'always'],
            'no-empty-function': ['error'],
            'no-eval': 'error',
            'no-trailing-spaces': ['error'],
            'no-unused-expressions': ['error'],
            'no-unused-labels': ['error'],
            'unused-imports/no-unused-imports': 'error',
            indent: ['error', 2],
            'jsx-quotes': [2, 'prefer-double'],
            'prefer-const': ['error'],
            radix: ['error'],
            'react/jsx-curly-spacing': [
                'error',
                {
                    when: 'always',
                    children: true,
                },
            ],
            'react/jsx-max-props-per-line': ['error', { maximum: 1 }],
            'react/jsx-first-prop-new-line': ['error'],
            'react/jsx-closing-tag-location': ['error'],
        },
    },
);
