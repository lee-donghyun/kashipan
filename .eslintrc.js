module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['simple-import-sort'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-curly-brace-presence': ['warn', 'never'],
    'react/jsx-sort-props': [
      'warn',
      {
        shorthandFirst: true,
        multiline: 'last',
        reservedFirst: true,
      },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
