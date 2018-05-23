module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  env: {
    browser: true
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ["plugin:vue/essential", "airbnb-base"],
  // required to lint *.vue files
  plugins: ["vue"],
  globals: {
    ga: true, // Google Analytics
    cordova: true,
    __statics: true
  },
  // add your custom rules here
  rules: {
    "func-names": 0,
    "no-param-reassign": 0,
    "import/first": 0,
    "import/named": 2,
    "import/namespace": 2,
    "import/default": 2,
    "import/export": 2,
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "import/no-extraneous-dependencies": 0,
    "no-restricted-syntax": 0,
    "consistent-return": 0,
    "max-len": 0,
    "no-unused-vars": 1,
    "no-empty": 1,
    "new-cap": 0,
    "no-plusplus": 0,
    "arrow-parens": [2, "as-needed", { requireForBlockBody: true }],
    camelcase: 0,
    eqeqeq: 0,
    "no-tabs": 0,
    "no-undef": 1,

    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0
  }
};
