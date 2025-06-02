import { gsap } from 'gsap'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(gsap)
  nuxtApp.provide('gsap', gsap)
})
