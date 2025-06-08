<script lang="ts">
import theme from '#build/fantasies/text-blink'
import type { AppConfig } from '@nuxt/schema'
import type { ComponentConfig } from '../types'

type TextBlink = ComponentConfig<typeof theme, AppConfig, 'textBlink', 'fantasies'>

export interface TextBlinkProps {
  color?: TextBlink['variants']['color']
  delay?: number
  duration?: number
  opacity?: number
  size?: TextBlink['variants']['size']
  fontWeight?: TextBlink['variants']['fontWeight']
  ui?: TextBlink['slots']
  onClick?: () => void
}
</script>

<script lang="ts" setup>
import { computed, onMounted, useAppConfig, useNuxtApp } from '#imports'
import { ref } from 'vue'
import defu from 'defu'
import { tv } from '../utils/tv'

const props = withDefaults(defineProps<TextBlinkProps>(), {
  color: 'primary',
  delay: 1,
  duration: 1,
  opacity: 0.2,
  size: 'text-lg'
})
defineSlots<{ default: (props: TextBlinkProps) => void }>()
defineEmits<{
  (e: 'click'): void
}>()
const appConfig = useAppConfig() as TextBlink['AppConfig']
const textRef = ref<HTMLElement>()

const ui = computed(() => tv({
  extend: tv(theme),
  ...defu({
  }, appConfig.fantasies?.textBlink || {})
})({
  fontWeight: props.fontWeight,
  size: props.size,
  color: props.color
}))

onMounted(() => {
  const { $gsap } = useNuxtApp()
  if (textRef.value && $gsap) {
    $gsap.fromTo(textRef.value, {
      opacity: props.opacity
    }, {
      opacity: 1,
      duration: props.duration,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      delay: props.delay
    })
  }
})
</script>

<template>
  <a ref="textRef" :class="ui.root()" @click="$emit('click')">
    <slot />
  </a>
</template>
