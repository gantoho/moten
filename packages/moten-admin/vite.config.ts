import { resolve } from 'path'
import { defineConfig } from 'vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true,
      dts: true,
    }),
  ],
  base: './',
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },
  server: {
    open: true,
    port: 3000,
  },
})
