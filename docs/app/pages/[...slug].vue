<script lang="ts" setup>
definePageMeta({
  layout: 'docs'
})

const onChecked = (keys: string[]) => {
  console.log('Checked keys:', keys)
}

const items = ref([
  {
    label: 'app/',
    key: 'app',
    defaultExpanded: true,
    children: [
      {
        label: 'composables/',
        key: 'composables',
        children: [
          {
            label: 'useAuth.ts',
            key: 'auth',
            icon: 'i-vscode-icons-file-type-typescript'
          },
          {
            label: 'useUser.ts',
            key: 'user',
            icon: 'i-vscode-icons-file-type-typescript'
          }
        ]
      },
      {
        label: 'components/',
        key: 'components',
        defaultExpanded: true,
        children: [
          {
            label: 'Card.vue',
            key: 'card',
            icon: 'i-vscode-icons-file-type-vue'
          },
          {
            label: 'Button.vue',
            key: 'button',
            icon: 'i-vscode-icons-file-type-vue'
          }
        ]
      }
    ]
  },
  {
    label: 'app.vue',
    key: 'app2',
    icon: 'i-vscode-icons-file-type-vue'
  },
  {
    label: 'nuxt.config.ts',
    key: 'nuxt',
    icon: 'i-vscode-icons-file-type-nuxt'
  }
])
</script>

<template>
  <FCheckTree :items="items" @update:checked-keys="onChecked($event)" />
</template>
