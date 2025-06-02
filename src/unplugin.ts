import { fileURLToPath } from 'node:url'
import { join, normalize } from 'pathe'
import { globSync } from 'tinyglobby'
import { defu } from 'defu'
import { createUnplugin, type UnpluginOptions } from 'unplugin'
import ui from '@nuxt/ui/vite'
import type { NuxtUIOptions } from '@nuxt/ui/unplugin'
import type * as fantasies from '#build/fantasies'
import type { TVConfig } from '@nuxt/ui'

import TemplatePlugin from './plugins/templates'
import AppConfigPlugin from './plugins/app-config'

type AppConfigFantasies = TVConfig<typeof fantasies>

export interface NuxtFantasiesOptions extends NuxtUIOptions {
  fantasies?: AppConfigFantasies & { prefix: string }
}

export const runtimeDir = normalize(fileURLToPath(new URL('./runtime', import.meta.url)))

const resolveColors = (colors?: string[]) => {
  return colors?.length
    ? [...new Set(['primary', ...colors])]
    : ['primary', 'secondary', 'success', 'info', 'warning', 'error']
}

export const NuxtFantasiesPlugin = createUnplugin<NuxtFantasiesOptions | undefined>((_options = {}) => {
  let options = defu(_options, {
    fantasies: {
      prefix: 'F'
    },
    prefix: 'U',
    colorMode: true,
    theme: {
      colors: undefined,
      transitions: true
    },
    autoImport: {
      dirs: [join(runtimeDir, 'composables')]
    }
  })

  options.theme = options.theme || {}
  options.theme.colors = resolveColors(options.theme.colors)

  const components = globSync('**/*.vue', {
    cwd: join(runtimeDir, 'components'),
    ignore: [
      !options.colorMode && 'color-mode/**/*.vue',
      'prose/**/*.vue'
    ].filter(Boolean) as string[]
  })
  const componentNames = new Set(components.map(c => `${options.fantasies.prefix}${c.split('/').pop()?.replace(/\.vue$/, '')}`))
  const componentPaths = new Map(components.map((c) => {
    const name = c.replace(/\.vue$/, '')
    const componentName = `${options.fantasies.prefix}${name.split('/').pop()}`
    return [componentName, c]
  }))

  const overrides = globSync('**/*.vue', {
    cwd: join(runtimeDir, 'vue/components'),
    ignore: [
      !options.colorMode && 'color-mode/**/*.vue'
    ].filter(Boolean) as string[]
  })
  const overrideNames = new Set(overrides.map(c => `${options.fantasies.prefix}${c.split('/').pop()?.replace(/\.vue$/, '')}`))
  const overridePaths = new Map(overrides.map((c) => {
    const name = c.replace(/\.vue$/, '')
    const componentName = `${options.fantasies.prefix}${name.split('/').pop()}`
    return [componentName, c]
  }))

  options = defu(options, {
    components: {
      resolvers: [
        (componentName: string) => {
          if (overrideNames.has(componentName)) {
            const relativePath = overridePaths.get(componentName)
            return {
              name: 'default',
              from: join(runtimeDir, 'vue/components', relativePath as string)
            }
          }

          if (componentNames.has(componentName)) {
            const relativePath = componentPaths.get(componentName)
            return {
              name: 'default',
              from: join(runtimeDir, 'components', relativePath as string)
            }
          }
        }
      ]
    }
  })

  const appConfig = { fantasies: options.fantasies }

  return [
    ui(options),
    TemplatePlugin(options),
    AppConfigPlugin(appConfig)
  ].flat(1) as UnpluginOptions[]
})
