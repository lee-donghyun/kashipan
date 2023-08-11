module.exports = {
  root: true,
  extends: '@react-native',
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
  },
};
