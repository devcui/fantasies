<template>
  <div>
    <canvas ref="canvasRef" />
  </div>
</template>

<script lang="ts" setup>
const canvasRef = ref<HTMLCanvasElement>()

onMounted(async () => {
  if (!canvasRef.value) {
    console.error('Canvas element not found in onMounted')
    return
  }
  const { pixi } = await usePixi()
  const app = new pixi.Application()
  await app.init({ view: canvasRef.value, background: '#1099bb', resizeTo: window })
  const container = new pixi.Container()
  app.stage.addChild(container)

  const sprites = 21 // 修正拼写错误
  const rows = 7
  const columns = 3 // 修正拼写错误
  const countWidth = 1467
  const countHeight = 1400
  const perWidth = countWidth / columns
  const perHeight = countHeight / rows

  const data: Record<string, any> = {} // 修复：添加类型定义
  for (let i = 0; i < sprites; i++) {
    const name = `sprite-${i}`
    const row = Math.floor(i / columns)
    const col = i % columns
    const frame = {
      x: col * perWidth,
      y: row * perHeight,
      w: perWidth,
      h: perHeight
    }
    const sourceSize = { w: perWidth, h: perHeight }
    const spriteSourceSize = {
      x: 0,
      y: 0,
      w: perWidth,
      h: perHeight
    }
    data[name] = {
      frame,
      sourceSize,
      spriteSourceSize,
      rotated: false, // 修复：添加必需属性
      trimmed: false // 修复：添加必需属性
    }
  }
  const json = {
    frames: data,
    meta: {
      image: '/sprits/b.png',
      size: { w: countWidth, h: countHeight },
      scale: 0.5, // 修复：添加必需的scale属性
      format: 'RGBA8888' // 修复：添加format属性
    },
    animations: {
      talk: Object.keys(data)
    }
  }
  const texture = await pixi.Assets.load(json.meta.image)
  const spritesheet = new pixi.Spritesheet(texture, json)
  await spritesheet.parse()

  // 修复：确保动画存在且有帧
  const animationFrames = spritesheet.animations.talk
  if (animationFrames && animationFrames.length > 0) {
    const animatedSprite = new pixi.AnimatedSprite(animationFrames)
    animatedSprite.anchor.set(0.5)
    animatedSprite.x = app.screen.width / 2
    animatedSprite.y = app.screen.height / 2
    container.addChild(animatedSprite)
    animatedSprite.play()
    animatedSprite.animationSpeed = 0.13
  } else {
    console.error('Animation frames not found')
  }
})
</script>
