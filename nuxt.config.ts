// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module', '@pinia/nuxt', '@nuxt/image'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Новости РБК',
    }
  }
})