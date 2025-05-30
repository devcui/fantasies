import type { NuxtOptions } from 'nuxt/schema'

export default (options: Required<NuxtOptions['ui']>) => {
  return ({
    slots: {},
    variants: {
      color: {},
      highlightColor: {},
      variant: {},
      active: {},
      disabled: {

      },
      highlight: {
      },
      level: {

      }
    },
    compoundVariants: [],
    defaultVariants: {
      color: 'primary',
      highlightColor: 'primary',
      variant: 'pill'
    }
  })
}
