export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.svg" },
      ],
    },
  },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "shadcn-nuxt"],
  srcDir: "src/",
  css: ["~/assets/css/main.css"],
  shadcn: {
    prefix: "",
    componentDir: "~/shared/ui/components",
  },
  components: {
    dirs: [
      { path: "~/components", pathPrefix: false },
      { path: "~/shared/ui/components", pathPrefix: false },
    ],
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || "http://localhost:3000",
    },
  },
});
