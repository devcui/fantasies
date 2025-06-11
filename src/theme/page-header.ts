import type { NuxtOptions } from '@nuxt/schema'

export default (options: Required<NuxtOptions['ui']>) => ({
  slots: {
    root: 'min-h-16'
  },
  variants: {
    color: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: ''
    },
    bgColor: {
      ...Object.fromEntries((options.theme.colors || []).map((color: string) => [color, ''])),
      neutral: ''
    },
    size: {
      small: '',
      medium: '',
      large: ''
    },
    float: {
      true: {
        root: ''
      },
      false: {
        root: ''
      }
    }
  },
  defaultVariants: {
    size: 'small',
    float: false
  }
})
