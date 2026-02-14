export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "shadcn-nuxt"],
  srcDir: "src/",
  css: ["~/assets/css/main.css"],
  shadcn: {
    prefix: "",
    componentDir: "./src/shared/ui",
  },
  components: {
    dirs: [
      { path: "~/components", pathPrefix: false },
    ],
  },
});
