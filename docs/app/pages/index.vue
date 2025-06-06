<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'Index',
  description: 'This is the index page of the docs section.'
})
</script>

<template>
  <div class="min-h-screen bg-black flex items-center justify-center text-center">
    <FTextLoading
      :duration="5"
      :color="'#ffffff'"
      :font-weight="'font-extrabold'"
      @complete="console.log('Loading complete')"
    >
      <div>
        <div class="text-6xl">
          <span>幻想 UI</span>
          <span class="text-sm align-bottom">&trade;</span>
          <span>1.0.3</span>
        </div>
        <div class="relative flex items-center my-4">
          <div class="flex-grow border-t border-4 border-white" />
          <span class="flex-shrink mx-4 text-white text-sm tracking-widest">NUXT</span>
          <div class="flex-grow border-t border-4 border-white" />
        </div>
        <div class="text-xl">
          <span>Fantasies User Interface</span>
          <span class="text-sm align-bottom">&trade;</span>
        </div>
      </div>
    </FTextLoading>
  </div>
</template>
