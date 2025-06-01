<script lang="ts">
import FormField from '@nuxt/ui/components/FormField.vue'
import { defineProps, useAttrs, defineEmits } from 'vue'
import type theme from '#build/fantasies/form-field'
import type { ComponentConfig } from '../types/tv'
import type { AppConfig } from '@nuxt/schema'
import type { ComponentProps, ComponentSlots } from 'vue-component-type-helpers'
import type { FormItemProps } from '../types'
import FormItem from './FormItem.vue'

type FormField = ComponentConfig<typeof theme, AppConfig, 'formField', 'fantasies'>

type Unzip<T> = /* @vue-ignore */ ComponentProps<T>
  & {
    widget?: FormItemProps
    inline?: boolean
    slots?: /* @vue-ignore */ ComponentSlots<typeof FormField>
  }

export type FormFieldProps = Unzip<typeof FormField>
</script>

<script setup lang="ts">
const attrs: any = useAttrs()
const emit = defineEmits<{
  'update:modelValue': [value: any]
}>()

defineProps<FormFieldProps>()

const handleUpdateModelValue = (value: any) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <FormField v-bind="attrs">
    <template
      v-for="(slotRenderFn, slotName) in attrs.slots"
      :key="slotName"
      #[slotName]="slotGeneratedProps"
    >
      <component :is="slotRenderFn" v-bind="slotGeneratedProps" />
    </template>
    <FormItem
      v-bind="attrs.widget"
      :inline="attrs.inline"
      :model-value="attrs['model-value']"
      @update:model-value="handleUpdateModelValue"
    />
  </FormField>
</template>
