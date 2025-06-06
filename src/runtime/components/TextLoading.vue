<script lang="ts">
import theme from '#build/fantasies/text-loading'
import type { AppConfig } from '@nuxt/schema'
import type { ComponentConfig } from '../types'

type TextLoading = ComponentConfig<typeof theme, AppConfig, 'textLoading', 'fantasies'>

export interface TextLoadingProps {
  color?: string
  delay?: number
  duration?: number
  opacity?: number
  size?: TextLoading['variants']['size']
  fontWeight?: TextLoading['variants']['fontWeight']
  ui?: TextLoading['slots']
}
</script>

<script lang="ts" setup>
import { useAppConfig, useNuxtApp } from '#imports'
import defu from 'defu'
import { tv } from '../utils/tv'
import { computed, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<TextLoadingProps>(), {
  color: 'primary',
  delay: 0.2,
  duration: 5,
  opacity: 0.3
})
defineSlots<{ default: (props: TextLoadingProps) => void }>()

const appConfig = useAppConfig() as TextLoading['AppConfig']

const { $gsap } = useNuxtApp()

const shaded = ref<HTMLDivElement>()
const reveal = ref<HTMLDivElement>()

const ui = computed(() => tv({
  extend: tv(theme),
  ...defu({
  }, appConfig.fantasies?.textLoading || {})
})({
  fontWeight: props.fontWeight,
  size: props.size
}))

const colorStyle = computed(() => {
  return props.color.startsWith('#') ? props.color : `var(--ui-color-${props.color}-500)`
})

onMounted(() => {
  if (reveal.value && shaded.value) {
    $gsap.set(shaded.value, {
      opacity: 0.3
    })

    $gsap.set(reveal.value, {
      clipPath: 'inset(100% 0 0 0)',
      color: colorStyle.value
    })

    $gsap.to(reveal.value, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 5,
      ease: 'power2.out',
      delay: 0.2
    })
  }
})
</script>

<template>
  <div :class="ui.root()">
    <div ref="shaded" :class="ui.shaded()">
      <slot v-bind="props" />
    </div>
    <div ref="reveal" :class="ui.reveal()">
      <slot v-bind="props" />
    </div>
    <div :class="ui.place()" aria-hidden="true">
      <slot v-bind="props" />
    </div>
  </div>
</template>
