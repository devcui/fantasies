export default defineNuxtConfig({
  modules: [
    '@fantasies/ui',
    '@nuxtjs/mdc',
    '@nuxthub/core'
  ],
  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  mdc: {
    highlight: {
      noApiRoute: false
    }
  },
  ui: {
    fonts: false
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-07-09'
})
