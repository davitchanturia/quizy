// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint"],
  runtimeConfig: {
    public: {
      API_BASE_URL:
        process.env.NUXT_API_BASE_URL || "http://localhost:8000/api",
      BACKEND_BASE_URL:
        process.env.NUXT_BACKEND_BASE_URL || "http://localhost:8000",
    },
  },
});
