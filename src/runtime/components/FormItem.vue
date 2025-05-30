<script lang="ts">
import Input from '@nuxt/ui/components/Input.vue'
import Select from '@nuxt/ui/components/Select.vue'
import { defineProps, useAttrs, useSlots } from 'vue'
import type theme from '#build/fantasies/form-item'
import type { ComponentConfig } from '../types/tv'
import type { AppConfig } from '@nuxt/schema'

type FormItem = ComponentConfig<typeof theme, AppConfig, 'formItem', 'fantasies'>

export interface FormItemProps {
  type: 'input' | 'select'
  [key: string]: any
}

const componentMap = {
  input: Input,
  select: Select
}
</script>

<script setup lang="ts">
const slots = useSlots()
const attrs = useAttrs()
const props = defineProps<FormItemProps>()

const { type, ...componentProps } = props
</script>

<template>
  <component
    :is="componentMap[props.type]"
    v-bind="{ ...componentProps, ...attrs }"
  >
    <template v-for="(slot, name) in slots" :key="name" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </component>
</template>
