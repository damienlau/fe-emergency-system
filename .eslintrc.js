module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ["eslint", "plugin:vue/vue3-strongly-recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: { "vue/require-default-prop": "off" },
};
