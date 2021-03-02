module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', '*.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-extra-parens': 'off',
    '@typescript-eslint/ban-types': 'off',
    'arrow-parens': 'off',
    eqeqeq: 'error',
    'function-paren-newline': 'off',
    'linebreak-style': [2, 'unix'],
    'no-console': [
      'error',
      {
        allow: ['info', 'warn', 'error', 'time', 'timeEnd'],
      },
    ],
    'no-duplicate-imports': 'error',
    'no-extra-parens': 'error',
    'no-return-await': 'error',
    'no-shadow': [
      'error',
      {
        builtinGlobals: false,
        hoist: 'functions',
        allow: [],
      },
    ],
    'operator-linebreak': [2, 'before', { overrides: { '?': 'after' } }],
    'import/prefer-default-export': 'off',
  },
};
