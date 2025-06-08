import type { NuxtOptions } from '@nuxt/schema'

const size = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl']
const fontWeight = ['font-thin', 'font-extralight', 'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'font-extrabold', 'font-black']

export default (options: Required<NuxtOptions['ui']>) => ({
  slots: {
    root: 'clear-both inline-block cursor-pointer'
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: ''
    },
    size: Object.fromEntries(size.map(s => [s, { root: s }])),
    fontWeight: Object.fromEntries(fontWeight.map(fw => [fw, { root: fw }]))
  },
  compoundVariants: [...(options.theme.colors || []).map((color: string) => ({
    color,
    class: { root: `text-${color} hover:text-${color}/75 disabled:text-${color} aria-disabled:text-${color} focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-${color}` }
  }))
  ]
})
