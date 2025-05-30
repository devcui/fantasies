import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fantasies from '@fantasies/ui/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    fantasies({
      prefix:"U",
      fantasies:{
        prefix:'F',
      },
      ui: {
        colors: {
          primary: 'green',
          neutral: 'slate'
        }
      },
      autoImport: {
        imports: ['vue']
      }
    })
  ]
})
