import { createResolver, defineNuxtModule, addImportsDir, installModule, hasNuxtModule, addComponentsDir } from '@nuxt/kit'
import { name, version } from '../package.json'
import icons from './theme/icons'
import defu from 'defu'
import { addTemplates } from './templates'

export interface ModuleOptions {
  prefix?: string
  mdc?: boolean
  content?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    doc: 'https://github.com/devcui/fantasies-ui',
    configKey: 'fantasies',
    compatibility: {
      nuxt: '>=3.16.0'
    }
  },
  defaults: {
    prefix: 'F',
    mdc: false,
    content: false
  },
  async setup(options, nuxt) {
    nuxt.options.appConfig.ui = defu(nuxt.options.appConfig.ui || {}, { icons })

    if (!hasNuxtModule('@nuxt/ui')) await installModule('@nuxt/ui', { prefix: 'U' })

    const { resolve } = createResolver(import.meta.url)
    nuxt.options.alias['#fantasies'] = resolve('./runtime')
    nuxt.options.appConfig.fantasies = defu(nuxt.options.appConfig.fantasies || {}, {})

    nuxt.options.router.options.scrollBehaviorType = 'smooth'

    if ((hasNuxtModule('@nuxtjs/mdc') || options.mdc) || (hasNuxtModule('@nuxt/content') || options.content)) {
      nuxt.options.mdc = defu(nuxt.options.mdc, {})
      addComponentsDir({
        path: resolve('./runtime/components/paper'),
        prefix: 'Paper',
        pathPrefix: false,
        global: true
      })
    }

    if ((hasNuxtModule('@nuxt/content') || options.content)) {
      addComponentsDir({
        path: resolve('./runtime/components/content'),
        pathPrefix: false,
        prefix: options.prefix || 'F'
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
      ignore: ['color-mode/**', 'content/**', 'paper/**']
    })

    addImportsDir(resolve('./runtime/composables'))

    addTemplates(options, nuxt)
  }
})
