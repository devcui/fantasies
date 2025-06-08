type PixiType = typeof import('pixi.js')
type PixiSoundType = typeof import('@pixi/sound')

export default async function usePixi() {
  const pixi = useState<PixiType | null>('pixi', () => null)
  const pixiSound = useState<PixiSoundType | null>('pixiSound', () => null)

  if (!pixi.value) {
    const Pixi = await import('pixi.js')
    const PixiSound = await import('@pixi/sound')

    pixi.value = Pixi
    pixiSound.value = PixiSound

    Pixi.Assets.addBundle('sounds', {
      prelude: '/sounds/prelude.mp3',
      select: '/sounds/select.mp3'
    })

    await Pixi.Assets.loadBundle('sounds')
  }

  return { pixi: pixi.value!, pixiSound: pixiSound.value! }
}
