module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.vue'],
      },
      webpack: {
        config: 'node_modules/@vue/cli-service/webpack.config.js',
      },
    },
  },
  extends: ['@vue/eslint-config-airbnb', 'plugin:vue/strongly-recommended'],
  plugins: ['vue'],
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-newline': ['error', {
      'multiline': 'never',
    }],
    'vue/max-attributes-per-line': ['error', {
      'singleline': 2,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }],
    'vue/html-self-closing': 'off',
    'vue/require-default-prop': 'off',
    'arrow-body-style': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-use-before-define': 'off',
  },
};
