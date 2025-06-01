<template>
  <FFormItem
    v-model="selectedValue"
    type="select"
    class="w-64"
    :items="selectOptions"
    :slots="customSelectSlots"
  />
  {{ selectedValue }}
</template>

<script setup>
import { h, ref } from 'vue'

const selectedValue = ref('opt1')
const selectOptions = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' }
]

const customSelectSlots = {
  item: ({ item, index }) => {
    console.log('Rendering item slot for:', item, 'at index:', index)
    return h('div', { style: 'color: blue;' }, `Custom: ${item.label}`)
  },
  default: ({ modelValue, open }) => {
    console.log('Rendering default slot. Open:', open, 'ModelValue:', modelValue)
    const selectedOption = selectOptions.find(opt => opt.value === modelValue)
    return h('h1', `Selected: ${selectedOption ? selectedOption.label : 'None'}`)
  }
}
</script>
