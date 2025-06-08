import type { Options } from '@pixi/sound'

export async function useSoundFrom(source: string | string[] | Options | ArrayBuffer | HTMLAudioElement | AudioBuffer) {
  if (import.meta.client) {
    const pixi = await import('@pixi/sound')
    pixi.Sound.from(source)
  }
}
