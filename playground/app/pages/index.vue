<script setup lang="ts">
const routes = [
  { path: '/form', name: 'Form 组件', description: '测试 Form 组件的基本功能、按钮列表、插槽和事件处理' },
  { path: '/form-field', name: 'FormField 组件', description: '测试 Form 组件的基本功能、按钮列表、插槽和事件处理' },
  { path: '/form-item', name: 'FormItem 组件', description: '测试 Form 组件的基本功能、按钮列表、插槽和事件处理' },
  { path: '/button', name: 'Button 组件', description: '测试 Button 组件的各种变体和功能' }
]
</script>

<template>
  <div class="container mx-auto p-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        Fantasies UI 组件测试
      </h1>
      <p class="text-gray-600">
        选择要测试的组件页面
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        class="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 hover:border-gray-300"
      >
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ route.name }}</h3>
        <p class="text-sm text-gray-600">{{ route.description }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
