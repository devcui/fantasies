<script setup lang="ts">
defineOptions({ inheritAttrs: false })
defineProps<{ theme: string }>()
</script>

<template>
  <UAvatar :src="theme" class="dark:hidden" />
  <UAvatar :src="theme" class="hidden dark:block" />
</template>
