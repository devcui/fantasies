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
  await useSoundFrom({
    url: '/sounds/prelude.mp3',
    autoPlay: true,
    volume: 0.5,
    loop: true
  })
})

const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  }
})
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <UButton
      class="fixed top-4 right-4 z-50"
      :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
      color="neutral"
      variant="ghost"
      @click="isDark = !isDark"
    />

    <template #fallback>
      <div class="size-8" />
    </template>
  </ClientOnly>
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

    <div class="mt-[8rem] min-w-[30%] min-h-[3rem]">
      <div v-if="state.titleCompiled" class="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
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
