import type { NuxtOptions } from '@nuxt/schema'

const size = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl']
const fontWeight = ['font-thin', 'font-extralight', 'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'font-extrabold', 'font-black']

export default (options: Required<NuxtOptions['ui']>) => ({
  slots: {
    base: ['']
  },
  variants: {
    size: Object.fromEntries(size.map(s => [s, { base: s }])),
    fontWeight: Object.fromEntries(fontWeight.map(fw => [fw, { base: fw }])),
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: ''
    }
  },
  compoundVariants: [
    ...(options.theme.colors || []).map((color: string) => ({
      color,
      class: {
        base: `text-${color} dark:text-${color}`
      }
    }))
  ],
  defaultVariants: {
    size: 'text-base',
    fontWeight: 'font-normal',
    color: 'primary'
  }
})
