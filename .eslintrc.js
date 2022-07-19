// module.exports = {
//     env: {
//         browser: true,
//         es2021: true,
//     },
//     extends: [
//         'eslint:recommended',
//         `'plugin:@typescript-eslint/recommended'`,
//         'prettier',
//     ],
//     parser: '@typescript-eslint/parser',
//     parserOptions: {
//         ecmaVersion: 'latest',
//         sourceType: 'module',
//     },
//     plugins: ['@typescript-eslint', 'prettier'],
//     rules: {
//         'prettier/prettier': 2,
//         semi: ['error', 'never'],
//         quotes: ['error', 'single'],
//         'no-console': 0,
//         'no-var': 1,
//         'prefer-const': 1,
//     },
// }
module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
        jest: true,
    },
    extends: ['airbnb-base', 'eslint:recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    rules: {
        semi: ['error', 'never'],
        quotes: ['error', 'single'],
        'no-console': 'off',
        'no-use-before-define': ['error', { functions: true, classes: true }],
        'no-var': 'error',
        'no-unresolved': 'off',
        'prefer-const': 'error',
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
                '': 'never',
            },
        ],
    },
}
