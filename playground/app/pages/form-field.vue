<script setup lang="ts">
import type { FormFieldProps } from '#fantasies/types'
import { ref, reactive, h } from 'vue' // Import reactive and h
import z from 'zod'

const name = ref('')
const email = ref('')

// Create a reactive state object for the form
const state = reactive({
  name: '111',
  email: '222@qq.com',
  role: '' // Add new state for role
})

const schema = z.object({
  name: z.string().min(1, '名称不能为空'),
  email: z.string().email('请输入有效的邮箱地址')
})

const nameField: FormFieldProps = {
  label: '名称',
  inline: false,
  name: 'name',
  help: '请输入您的全名',
  widget: {
    modelValue: state.name,
    type: 'input',
    placeholder: '例如：张三'
  }
}

const emailField: FormFieldProps = {
  label: '邮箱地址',
  name: 'email',
  class: 'w-128',
  required: true,
  description: '我们不会分享您的邮箱地址。',
  widget: {
    class: 'w-full',
    modelValue: state.email,
    inline: false,
    type: 'input',
    placeholder: 'you@example.com'
  }
}

const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '用户', value: 'user' },
  { label: '访客', value: 'guest' }
]

const roleField: FormFieldProps = {
  label: '角色',
  name: 'role',
  required: true,
  slots: {
    default: () => [h('span', { class: 'text-lg text-purple-600 dark:text-purple-400' }, '请选择您的角色')],
    label: ({ label }) => [h('span', { class: 'text-purple-700 dark:text-purple-300 font-bold' }, `${label} (FFormField Label Slot)`)],
    description: ({ description }) => [h('span', { class: 'text-xs text-purple-500 dark:text-purple-400 mt-1' }, `Hint: ${description} (FFormField Description Slot)`)],
    help: () => [h('span', { class: 'text-xs text-orange-500 dark:text-orange-400 mt-1' }, 'This is a custom help slot for Role field!')]
  },
  widget: {
    type: 'select-menu',
    items: roleOptions,
    modelValue: state.role,
    placeholder: '请选择一个角色',
    slots: {
      leading: () => [h('span', { class: 'i-heroicons-user-circle text-gray-400 dark:text-gray-500 w-5 h-5' })],
      default: ({ modelValue, open, selectedOption }: any) => {
        const currentLabel = selectedOption ? selectedOption.label : '请选择...'
        return [h('span', { class: 'text-green-600 dark:text-green-400' },
          `${currentLabel} ${open ? '🔼' : '🔽'} (Widget Slot)`
        )]
      },
      item: ({ item, active, selected }: any) => {
        return [h('div',
          {
            class: `px-2 py-1.5 text-sm cursor-pointer flex items-center justify-between ${active ? 'bg-gray-100 dark:bg-gray-700' : ''} ${selected ? 'font-semibold text-green-700 dark:text-green-300' : ''}`
          },
          [
            h('span', `角色: ${item.label}`),
            selected ? h('span', { class: 'i-heroicons-check-circle w-4 h-4 text-green-500' }) : null
          ]
        )]
      }
    }
  }
}

async function handleSubmit() {
  console.log('Form submitted:', state)
}
</script>

<template>
  <div class="container mx-auto p-8">
    <h1 class="text-2xl font-bold mb-6">
      FormField 组件用例
    </h1>

    <UForm :state="state" :schema="schema" @submit="handleSubmit">
      <div class="space-y-6 max-w-md">
        <FFormField v-bind="nameField" v-model="state.name" />
        <FFormField v-bind="emailField" v-model="state.email" />
        <FFormField v-bind="roleField" v-model="state.role" />

        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          提交
        </button>

        <div class="mt-8 p-4 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <h3 class="text-lg font-semibold mb-2">
            表单数据:
          </h3>
          <pre class="text-sm">名称: {{ state.name }}</pre>
          <pre class="text-sm">邮箱: {{ state.email }}</pre>
          <pre class="text-sm">角色: {{ state.role }}</pre>
        </div>
      </div>
    </UForm>
  </div>
</template>
