module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                varsIgnorePattern: '^_',
                argsIgnorePattern: '^_',
            },
        ],
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/ban-types': [
            'error',
            {
                extendDefaults: true,
                types: {
                    '{}': false,
                },
            },
        ],
        '@typescript-eslint/ban-ts-comment': 1,
        'jsx-quotes': ['error', 'prefer-single'],
        semi: ['error', 'never'],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        indent: ['error', 4, { SwitchCase: 1 }],
        'arrow-parens': ['error', 'as-needed'],
        'object-curly-spacing': ['error', 'always'],
        'array-bracket-spacing': ['error', 'never'],
        'quote-props': ['error', 'as-needed'],
        'no-trailing-spaces': 'error',
        'no-tabs': 'error',
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'never',
            exports: 'never',
            functions: 'never',
        }],
        'brace-style': ['error', '1tbs'],
        'keyword-spacing': 'error',
        'no-multi-spaces': 'error',
        eqeqeq: 'error',
        'max-len': ['error', 200],
        'no-multiple-empty-lines': 'error',
    },
    ignorePatterns: ['dev-dist', 'dist', 'ssr-dist', 'init.js', 'assets', 'docs'],
}