<script lang="ts">
import Form from '@nuxt/ui/components/Form.vue'
import Button from '@nuxt/ui/components/Button.vue'
import { defineProps, useAttrs } from 'vue'
import type theme from '#build/fantasies/form'
import type { ComponentConfig } from '../types/tv'
import type { AppConfig } from '@nuxt/schema'
import type { ComponentEmit, ComponentProps, ComponentSlots } from 'vue-component-type-helpers'
import type { FormFieldProps } from '../types'
import FormField from './FormField.vue'
import { useLocaleFantasies } from '../composables/useLocaleFantasies'

type Form = ComponentConfig<typeof theme, AppConfig, 'form', 'fantasies'>

type Unzip<T> = /* @vue-ignore */ ComponentProps<T>
  & {
    fields?: {
      [key: string]: FormFieldProps
    }
    inline?: boolean
    emits?: /* @vue-ignore */Partial<ComponentEmit<T>>
    slots?: /* @vue-ignore */ Partial<ComponentSlots<T>>
  }

export type FormProps = Unzip<typeof Form>
</script>

<script setup lang="ts">
const attrs: any = useAttrs()
const { t } = useLocaleFantasies()
defineProps<FormProps>()

const handleFieldUpdate = (fieldName: string | number, value: any) => {
  if (attrs.state) {
    attrs.state[fieldName] = value
  }
  if (attrs.fields && attrs.fields[fieldName]) {
    attrs.fields[fieldName].modelValue = value
  }
}
</script>

<template>
  <Form v-bind="attrs" v-on="attrs.emits || {}">
    <template
      v-for="(slotRenderFn, slotName) in attrs.slots"
      :key="slotName"
      #[slotName]="slotGeneratedProps"
    >
      <component :is="slotRenderFn" v-bind="slotGeneratedProps" />
    </template>

    <template v-for="(field, fieldName) in attrs.fields" :key="fieldName">
      <FormField
        v-bind="field"
        :name="fieldName"
        :widget="field.widget"
        :inline="attrs.inline"
        :model-value="attrs.state?.[fieldName]"
        @update:model-value="(value) => handleFieldUpdate(fieldName, value)"
        v-on="field.emits || {}"
      />
    </template>

    <Button
      type="submit"
    >
      {{ t('submit') }}
    </Button>
  </Form>
</template>
