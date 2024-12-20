// https://nuxt.com/docs/api/configuration/nuxt-config
import { Noir } from "./core/primevue/AuraPreset";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@primevue/nuxt-module",
  ],
  runtimeConfig: {
    public: {
      API_BASE_URL:
        process.env.NUXT_API_BASE_URL || "http://localhost:8000/api",
      BACKEND_BASE_URL:
        process.env.NUXT_BACKEND_BASE_URL || "http://localhost:8000",
    },
  },
  primevue: {
    options: {
      theme: {
        // prefix: "quizy",
        preset: Noir,
        options: {
          darkModeSelector: ".quizy-dark",
        },
      },
    },
  },
  css: ["~/assets/css/custom-theme.css", "primeicons/primeicons.css"],
  // routeRules: {
  //   "/": { ssr: true },
  //   "/login": { ssr: false },
  //   "/register": { ssr: false },
  //   "/quiz/**": { ssr: true },
  //   "/user/**": { ssr: false },
  // },
  ssr: false,
});
