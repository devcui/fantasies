import './assets/css/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ui from '@nuxt/ui/vue-plugin'
import App from './app.vue'

const pages = import.meta.glob('../../playground/app/pages/**/*.vue')
const components = import.meta.glob('../../playground/app/components/**/*.vue')

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\.\/\.\.\/playground\/app\/pages(.*)\.vue$/)![1].toLowerCase()
  return {
    path: name === '/index' ? '/' : name,
    component: pages[path]
  }
})

const router = createRouter({
  routes,
  history: createWebHistory()
})

const app = createApp(App)

Object.entries(components).forEach(([path, component]) => {
  const name = path.split('/').pop()!.replace('.vue', '')
  app.component(name, defineAsyncComponent(component as any))
})

app.use(router)
app.use(ui)

app.mount('#app')
