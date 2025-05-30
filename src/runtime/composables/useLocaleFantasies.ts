import type { Locale } from '@nuxt/ui'
import type { Ref } from 'vue'
import { computed, inject, toRef } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { localeContextInjectionKey } from '@nuxt/ui/composables/useLocale.js'
import { buildLocaleContext } from '@nuxt/ui/utils/locale'
import type { Messages } from '../types/locale'
import en from '../locale/en'

const _useLocaleFantasies = (localeOverrides?: Ref<Locale<Messages> | undefined>) => {
  const locale = localeOverrides || toRef(inject<Locale<Messages>>(localeContextInjectionKey))
  return buildLocaleContext<Messages>(computed(() => locale.value || en))
}

export const useLocaleFantasies = /* @__PURE__ */ createSharedComposable(_useLocaleFantasies)
