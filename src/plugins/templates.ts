import type { UnpluginOptions } from 'unplugin'
import type { NuxtFantasiesOptions } from '../unplugin'
import { getTemplates } from '../templates'

export default function TemplatePlugin(options: NuxtFantasiesOptions) {
  const templates = getTemplates(options, options)
  const templateKeys = new Set(templates.map(t => `#build/${t.filename}`))
  return {
    name: 'nuxt:fantasies:templates',
    enforce: 'pre',
    resolveId(id) {
      if (templateKeys.has(id + '.ts')) {
        return id.replace('#build/', 'virtual:nuxt-fantasies-templates/') + '.ts'
      }
    },
    loadInclude: id => templateKeys.has(id.replace('virtual:nuxt-fantasies-templates/', '#build/')),
    load(id) {
      id = id.replace('virtual:nuxt-fantasies-templates/', '#build/')
      return templates.find(t => `#build/${t.filename}` === id)!.getContents!({} as any)
    }
  } satisfies UnpluginOptions
}
