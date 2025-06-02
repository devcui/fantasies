import { createResolver, defineNuxtModule, addImportsDir, installModule, hasNuxtModule, addComponentsDir, addPlugin } from '@nuxt/kit'
import { name, version } from '../package.json'
import icons from './theme/icons'
import defu from 'defu'
import { addTemplates } from './templates'
import type { gsap } from 'gsap'

export interface ModuleOptions {
  prefix?: string
  mdc?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    doc: 'https://fantasies-ui.nuxt.dev',
    configKey: 'fantasies',
    compatibility: {
      nuxt: '>=3.16.0'
    }
  },
  defaults: {
    prefix: 'F',
    mdc: false
  },
  async setup(options, nuxt) {
    nuxt.options.appConfig.ui = defu(nuxt.options.appConfig.ui || {}, { icons })

    if (!hasNuxtModule('@nuxt/ui')) await installModule('@nuxt/ui')

    const { resolve } = createResolver(import.meta.url)
    nuxt.options.alias['#fantasies'] = resolve('./runtime')
    nuxt.options.appConfig.fantasies = defu(nuxt.options.appConfig.fantasies || {}, {})

    nuxt.options.router.options.scrollBehaviorType = 'smooth'

    if ((hasNuxtModule('@nuxtjs/mdc') || options.mdc)) {
      nuxt.options.mdc = defu(nuxt.options.mdc, {
        highlight: {
          theme: {
            light: 'rose-pine-dawn',
            default: 'rose-pine',
            dark: 'rose-pine-moon'
          }
        },
        components: {
          map: {
            // user: 'ProseUser'
          }
        }
      })
      addComponentsDir({
        path: resolve('./runtime/components/prose'),
        prefix: 'Prose',
        pathPrefix: false,
        global: true
      })
    }

    if (hasNuxtModule('@nuxtjs/color-mode')) {
      addComponentsDir({
        path: resolve('./runtime/components/color-mode'),
        pathPrefix: false,
        prefix: options.prefix || 'F'
      })
    } else {
      addImportsDir(resolve('./runtime/composables/color-mode'))
    }

    addComponentsDir({
      path: resolve('./runtime/components'),
      pathPrefix: false,
      prefix: options.prefix || 'F',
      ignore: ['color-mode/**', 'prose/**']
    })

    addImportsDir(resolve('./runtime/composables'))

    addPlugin(resolve('./runtime/plugins/gsap'))

    addTemplates(options, nuxt)
  }
})

declare module '#app' {
  interface NuxtApp {
    $gsap: typeof gsap
  }
}
