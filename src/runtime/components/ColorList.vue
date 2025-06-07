<template>
  <div class="flex gap-2 flex-wrap">
    <div
      v-for="color in colors"
      :key="color"
      :class="{
        'w-8 h-8 rounded-full cursor-pointer border-2 transition-transform hover:scale-110': true,
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
import { computed } from 'vue'

const props = defineProps <{ value: string, colors?: string[] }>()
const emits = defineEmits(['onChange'])
const appConfig = useAppConfig()
const colors = computed(() => {
  if (!props.colors) return Object.keys(appConfig.ui.colors)
  return props.colors
})

const selectColor = (color: string) => {
  emits('onChange', color)
}
</script>
