<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'Index',
  description: 'This is the index page of the docs section.'
})

const state = reactive({
  titleCompiled: false
})

onMounted(async () => {
  await useBackgroundSound({
    url: '/sounds/prelude.mp3',
    autoPlay: true,
    volume: 0.5,
    loop: true
  })
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center flex-col gap-[4rem] text-center">
    <FTextLoading
      :duration="5"
      :color="'primary'"
      :font-weight="'font-extrabold'"
      @complete="state.titleCompiled =true"
    >
      <div>
        <div class="text-9xl">
          <span>幻想 UI</span>
          <span class="text-sm align-bottom">&trade;</span>
          <span>1.0.3</span>
        </div>
        <div class="relative flex items-center my-4">
          <div class="flex-grow border-t border-4 border-primary" />
          <span class="flex-shrink mx-4 text-primary text-sm tracking-widest">NUXT</span>
          <div class="flex-grow border-t border-4 border-primary" />
        </div>
        <div class="text-xl">
          <span>Fantasies User Interface</span>
          <span class="text-sm align-bottom">&trade;</span>
        </div>
      </div>
    </FTextLoading>

    <div v-if="state.titleCompiled" class="mt-[8rem] min-w-[30%]">
      <div class="flex flex-row justify-between items-center">
        <FTextBlink
          :size="'text-lg'"
          :opacity="0"
          :font-weight="'font-semibold'"
          @click="console.log('Text clicked')"
        >
          <span>CONTINUE</span>
        </FTextBlink>
        <FTextBlink
          :size="'text-lg'"
          :opacity="0"
          :font-weight="'font-semibold'"
          @click="console.log('Text clicked')"
        >
          <span>PLAY</span>
        </FTextBlink>
      </div>
    </div>
  </div>
</template>
