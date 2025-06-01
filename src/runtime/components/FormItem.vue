<script lang="ts">
import Input from '@nuxt/ui/components/Input.vue'
import InputMenu from '@nuxt/ui/components/InputMenu.vue'
import InputNumber from '@nuxt/ui/components/InputNumber.vue'
import Select from '@nuxt/ui/components/Select.vue'
import SelectMenu from '@nuxt/ui/components/SelectMenu.vue'
import RadioGroup from '@nuxt/ui/components/RadioGroup.vue'
import Checkbox from '@nuxt/ui/components/Checkbox.vue'
import CheckboxGroup from '@nuxt/ui/components/CheckboxGroup.vue'
import Switch from '@nuxt/ui/components/Switch.vue'
import Textarea from '@nuxt/ui/components/Textarea.vue'
import ColorPicker from '@nuxt/ui/components/ColorPicker.vue'
import Slider from '@nuxt/ui/components/Slider.vue'
import { defineProps, useAttrs, useSlots } from 'vue'
import type theme from '#build/fantasies/form-item'
import type { ComponentConfig } from '../types/tv'
import type { AppConfig } from '@nuxt/schema'
import type { ComponentEmit, ComponentProps, ComponentSlots } from 'vue-component-type-helpers'

type FormItem = ComponentConfig<typeof theme, AppConfig, 'formItem', 'fantasies'>

type Unzip<T> = /* @vue-ignore */ ComponentProps<T>
  & /* @vue-ignore */ ComponentEmit<T>
  & { inline?: boolean, slots?: /* @vue-ignore */ ComponentSlots<T> }

export type FormItemProps =
  | { type: 'input' } & Unzip<typeof Input>
  | { type: 'input-menu' } & Unzip<typeof InputMenu>
  | { type: 'select' } & Unzip<typeof Select>
  | { type: 'textarea' } & Unzip<typeof Textarea>
  | { type: 'input-number' } & Unzip<typeof InputNumber>
  | { type: 'select-menu' } & Unzip<typeof SelectMenu>
  | { type: 'radio-group' } & Unzip<typeof RadioGroup>
  | { type: 'checkbox' } & Unzip<typeof Checkbox>
  | { type: 'checkbox-group' } & Unzip<typeof CheckboxGroup>
  | { type: 'switch' } & Unzip<typeof Switch>
  | { type: 'color-picker' } & Unzip<typeof ColorPicker>
  | { type: 'slider' } & Unzip<typeof Slider>

const componentMap = {
  'input': Input,
  'select': Select,
  'textarea': Textarea,
  'input-menu': InputMenu,
  'input-number': InputNumber,
  'select-menu': SelectMenu,
  'radio-group': RadioGroup,
  'checkbox': Checkbox,
  'checkbox-group': CheckboxGroup,
  'switch': Switch,
  'color-picker': ColorPicker,
  'slider': Slider
}
</script>

<script setup lang="ts">
const attrs: any = useAttrs()
defineProps<FormItemProps>()
</script>

<template>
  <component :is="componentMap[type]" v-bind="attrs">
    <template
      v-for="(slotRenderFn, slotName) in attrs.slots"
      :key="slotName"
      #[slotName]="slotGeneratedProps"
    >
      <component :is="slotRenderFn" v-bind="slotGeneratedProps" />
    </template>
  </component>
</template>
