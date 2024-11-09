// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt([
  {
    rules: {
      "vue/html-self-closing": "off",
      "vue/require-prop-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);
