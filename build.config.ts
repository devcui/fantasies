import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/unplugin',
    './src/vite'
  ],
  rollup: {
    replace: {
      delimiters: ['', ''],
      values: {
        'process.argv.includes(\'--uiDev\')': 'false'
      }
    }
  },
  hooks: {
    'mkdist:entry:options'(ctx, entry, options) {
      options.addRelativeDeclarationExtensions = false
    }
  },
  externals: ['#build/fantasies', 'vite']
})
