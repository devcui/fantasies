<script lang="ts">
import theme from '#build/fantasies/text-loading'
import type { AppConfig } from '@nuxt/schema'
import type { ComponentConfig } from '../types'

type TextLoading = ComponentConfig<typeof theme, AppConfig, 'textLoading', 'fantasies'>

export interface TextLoadingProps {
  color?: TextLoading['variants']['color']
  size?: TextLoading['variants']['size']
  fontWeight?: TextLoading['variants']['fontWeight']
  ui?: TextLoading['slots']
}
</script>

<script lang="ts" setup>
import { useAppConfig } from '#imports'
import defu from 'defu'
import { tv } from '../utils/tv'
import { computed } from 'vue'

const props = withDefaults(defineProps<TextLoadingProps>(), {
  color: 'primary'
})
const appConfig = useAppConfig() as TextLoading['AppConfig']

const ui = computed(() => tv({
  extend: tv(theme),
  ...defu({
    variants: { }
  }, appConfig.fantasies.textLoading)
})({
  color: props.color,
  size: props.size,
  fontWeight: props.fontWeight
}))

console.log(props)
console.log(ui.value.base())
</script>

<template>
  <div :class="ui.base()">
    loading
  </div>
  <div>
    loading
  </div>
</template>
