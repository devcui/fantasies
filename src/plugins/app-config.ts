import { defu } from 'defu'
import type { UnpluginOptions } from 'unplugin'
import icons from '../theme/icons'

export default function AppConfigPlugin(appConfig: Record<string, any>) {
  return {
    name: 'nuxt:fantasies:app-config',
    enforce: 'pre',
    resolveId(id) {
      if (id === '#build/app.config') {
        return 'virtual:nuxt-ui-app-config'
      }
    },
    transform(code, id) {
      if (id === 'virtual:nuxt-ui-app-config') {
        const existingConfig = new Function(`return ${code.match(/export default (.*)/s)?.[1]}`)()

        const mergedConfig = defu(existingConfig, {
          ui: {
            icons
          },
          fantasies: appConfig.fantasies
        })

        return `export default ${JSON.stringify(mergedConfig)}`
      }
    }
  } satisfies UnpluginOptions
}
