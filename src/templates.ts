import { fileURLToPath } from 'node:url'
import { kebabCase } from 'scule'
import { hasNuxtModule, addTemplate, addTypeTemplate } from '@nuxt/kit'
import type { Nuxt, NuxtTemplate, NuxtTypeTemplate, NuxtOptions } from '@nuxt/schema'
import type { ModuleOptions } from './module'
import * as theme from './theme'
import * as themePaper from './theme/paper'
import * as themeContent from './theme/content'

export function getTemplates(options: ModuleOptions, uiOptions: NuxtOptions['ui'], nuxt?: Nuxt) {
  const templates: NuxtTemplate[] = []

  let hasPaper = false
  let hasContent = false

  function writeThemeTemplate(theme: Record<string, any>, path?: string) {
    for (const component in theme) {
      templates.push({
        filename: `fantasies/${path ? path + '/' : ''}${kebabCase(component)}.ts`,
        write: true,
        getContents: async () => {
          const template = (theme as any)[component]
          const result = typeof template === 'function' ? template(uiOptions) : template

          const variants = Object.entries(result.variants || {})
            .filter(([_, values]) => {
              const keys = Object.keys(values as Record<string, unknown>)
              return keys.some(key => key !== 'true' && key !== 'false')
            })
            .map(([key]) => key)

          let json = JSON.stringify(result, null, 2)

          for (const variant of variants) {
            json = json.replace(new RegExp(`("${variant}": "[^"]+")`, 'g'), `$1 as typeof ${variant}[number]`)
            json = json.replace(new RegExp(`("${variant}": \\[\\s*)((?:"[^"]+",?\\s*)+)(\\])`, 'g'), (_, before, match, after) => {
              const replaced = match.replace(/("[^"]+")/g, `$1 as typeof ${variant}[number]`)
              return `${before}${replaced}${after}`
            })
          }

          function generateVariantDeclarations(variants: string[]) {
            return variants.filter(variant => json.includes(`as typeof ${variant}`)).map((variant) => {
              const keys = Object.keys(result.variants[variant])
              return `const ${variant} = ${JSON.stringify(keys, null, 2)} as const`
            })
          }

          // For local development, import directly from theme
          if (process.argv.includes('--uiDev')) {
            const templatePath = fileURLToPath(new URL(`./theme/${path ? `${path}/` : ''}${kebabCase(component)}`, import.meta.url))
            return [
              `import template from ${JSON.stringify(templatePath)}`,
              ...generateVariantDeclarations(variants),
              `const result = typeof template === 'function' ? (template as Function)(${JSON.stringify(uiOptions, null, 2)}) : template`,
              `const theme = ${json}`,
              `export default result as typeof theme`
            ].join('\n\n')
          }

          // For production build
          return [
            ...generateVariantDeclarations(variants),
            `export default ${json}`
          ].join('\n\n')
        }
      })
    }
  }

  if (!!nuxt && ((hasNuxtModule('@nuxtjs/mdc') || options.mdc) || (hasNuxtModule('@nuxt/content') || options.content))) {
    hasPaper = true

    const path = 'paper'

    writeThemeTemplate(themePaper, path)

    templates.push({
      filename: `fantasies/${path}/index.ts`,
      write: true,
      getContents: () => Object.keys(themePaper).map(component => `export { default as ${component} } from './${kebabCase(component)}'`).join('\n')
    })
  }

  if (!!nuxt && (hasNuxtModule('@nuxt/content') || options.content)) {
    hasContent = true

    writeThemeTemplate(themeContent, 'content')
  }

  writeThemeTemplate(theme)

  templates.push({
    filename: 'fantasies.css',
    write: true,
    getContents: () => `@source "./fantasies";`
  })

  templates.push({
    filename: 'fantasies/index.ts',
    write: true,
    getContents: () => {
      let contents = Object.keys(theme).map(component => `export { default as ${component} } from './${kebabCase(component)}'`).join('\n')
      if (hasContent) {
        contents += '\n'
        contents += Object.keys(themeContent).map(component => `export { default as ${component} } from './content/${kebabCase(component)}'`).join('\n')
      }
      if (hasPaper) contents += `\nexport * as paper from './paper'\n`
      return contents
    }
  })

  templates.push({
    filename: 'types/fantasies.d.ts',
    getContents: () => `import * as fantasies from '#build/fantasies'
import type { TVConfig } from '@nuxt/ui'

type AppConfigFantasies = TVConfig<typeof fantasies>

declare module '@nuxt/schema' {
  interface AppConfigInput {
    fantasies?: AppConfigFantasies
  }
}

export {}
`
  })

  return templates
}

export function addTemplates(options: ModuleOptions, nuxt: Nuxt) {
  const templates = getTemplates(options, nuxt.options.ui, nuxt)
  for (const template of templates) {
    if (template.filename!.endsWith('.d.ts')) {
      addTypeTemplate(template as NuxtTypeTemplate)
    } else {
      addTemplate(template)
    }
  }
}
