// @ts-check
/// <reference types="@prettier/plugin-pug/src/prettier" />

/**
 * @type {import('prettier').Options}
 */
module.exports = {
  plugins: ['@prettier/plugin-pug'],

  tabWidth: 2,
  semi: true,
  singleQuote: true,
  useTabs: false,
  endOfLine: 'auto',

  pugSingleQuote: true,
  // ... more pug* options
};
