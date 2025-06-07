<template>
  <div class="flex gap-2 flex-wrap">
    <div
      v-for="color in colors"
      :key="color"
      :class="{
        'cursor-pointer border-2 transition-transform hover:scale-110': true,
        'rounded-full': props.shape === 'circle',
        'rounded-md': props.shape === 'square',
        'w-6 h-6': props.size === 'small',
        'w-8 h-8': props.size === 'medium',
        'w-10 h-10': props.size === 'large',
        'border-gray-300 ring-2 ring-primary': props.value === color,
        'border-gray-300': props.value !== color,
        [`bg-${color}`]: true
      }"
      @click="selectColor(color)"
    />
  </div>
</template>

<script lang="ts" setup>
import { useAppConfig } from '#imports'

export interface ColorListProps {
  shape?: 'circle' | 'square'
  size?: 'small' | 'medium' | 'large'
  value?: string
  colors?: string[]
}

const props = withDefaults(defineProps <ColorListProps>(), {
  shape: 'circle',
  size: 'medium',
  colors: () => Object.keys(useAppConfig().ui.colors)
})
const emits = defineEmits(['onChange'])

const selectColor = (color: string) => {
  emits('onChange', color)
}
</script>
