<script lang="ts" setup>
import theme from '#build/fantasies/button'
import { useLocaleFantasies } from '../composables/useLocaleFantasies'

const { t } = useLocaleFantasies()
console.log(theme)
</script>

<template>
  <UButton>
    {{ t('button.submit') }}
    <div>123</div>
  </UButton>
</template>
