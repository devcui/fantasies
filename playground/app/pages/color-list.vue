<template>
  <FColorList
    :value="state"
    @on-change="pick($event)"
  />
</template>

<script setup lang="ts">
const state = ref('#3b82f6')

const pick = (color: string) => {
  state.value = color
}
</script>
