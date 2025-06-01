<script lang="ts">
import FormField from '@nuxt/ui/components/FormField.vue'
import { defineProps, useAttrs, defineEmits } from 'vue'
import type theme from '#build/fantasies/form-field'
import type { ComponentConfig } from '../types/tv'
import type { AppConfig } from '@nuxt/schema'
import type { ComponentEmit, ComponentProps, ComponentSlots } from 'vue-component-type-helpers'
import type { FormItemProps } from '../types'
import FormItem from './FormItem.vue'

type FormField = ComponentConfig<typeof theme, AppConfig, 'formField', 'fantasies'>

type Unzip<T> = /* @vue-ignore */ ComponentProps<T>
  & {
    widget?: FormItemProps
    inline?: boolean
    emits?: /* @vue-ignore */ Partial<ComponentEmit<T>>
    slots?: /* @vue-ignore */ Partial<ComponentSlots<T>>
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
  <FormField v-bind="attrs" v-on="attrs.emits || {}">
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
      v-on="attrs.widget.emits || {}"
      @update:model-value="handleUpdateModelValue"
    />
  </FormField>
</template>
