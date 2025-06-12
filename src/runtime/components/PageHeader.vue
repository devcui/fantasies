<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/fantasies/page-header'
import type { ComponentConfig } from '../types'
import { computed } from 'vue'
import { tv } from '../utils/tv'
import defu from 'defu'
import { useAppConfig } from '#imports'

type PageHeader = ComponentConfig<typeof theme, AppConfig, 'pageHeader', 'fantasies'>

export type PageHeaderProps = {
  color: PageHeader['color']
  bgColor: PageHeader['bgColor']
  size: PageHeader['size']
  float: boolean
}
</script>

<script lang="ts" setup>
const props = defineProps<PageHeaderProps>()
const slots = defineSlots<{
  left?: (props: PageHeaderProps) => any
  content?: (props: PageHeaderProps) => any
  right?: (props: PageHeaderProps) => any
}>()

const appConfig = useAppConfig() as PageHeader['AppConfig']

const ui = computed(() => tv({
  extend: tv(theme),
  ...defu({
  }, appConfig.fantasies?.pageHeader || {})
})(props))
</script>

<template>
  <div :class="ui.root()">
    <slot name="left" :="props" />
    <slot name="content" :="props" />
    <slot name="right" :="props" />
  </div>
</template>
