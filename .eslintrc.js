module.exports = {
  env: {
    es6: true,
  },
  extends: [
    '@react-native-community',
    'airbnb',
    'plugin:react-native/all',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@react-native-community',
    'react',
    'react-native',
    'jsx-a11y',
    'import',
    'react-hooks',
    'prettier',
    'eslint-plugin-import-helpers',
  ],
  rules: {
    camelcase: 'off',
    'prettier/prettier': ['error'],
    'react/destructuring-assignment': [0],
    'react/jsx-filename-extension': ['error', {extensions: ['.js', '.jsx']}],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': [0],
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/prop-types': [0],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-color-literals': 'off',
    'react-native/no-inline-styles': ['warn'],
    'react-native/no-raw-text': 'off',
    'no-underscore-dangle': 'off',
    'react-native/sort-styles': 'off',
    'react/no-array-index-key': 'off',
    'global-require': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': [
      2,
      {ignore: ['^~', '.js$', '.jsx$', '.ts$', '.tsx$']},
    ],
    'no-alert': 'error',
    'no-console': [
      'error',
      {
        allow: [
          'disableYellowBox',
          'ignoredYellowBox',
          'clear',
          'error',
          'info',
          'log',
          'warn',
        ],
      },
    ],
    'no-duplicate-imports': ['error', {includeExports: true}],
    'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
    'no-param-reassign': 'warn',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          '/^react/',
          '/^@react/',
          'module',
          '/^~/',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: {order: 'asc', ignoreCase: true},
      },
    ],
    'import/extensions': [
      'error',
      'never',
      {svg: 'always', json: 'always', png: 'always', jpg: 'always'},
    ],
  },
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {
        rootPathPrefix: '~',
        rootPathSuffix: 'src',
      },
    },
  },
};
