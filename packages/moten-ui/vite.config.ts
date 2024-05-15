/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import compiler from '@vue/compiler-sfc'
import commonConfig from './vite.config.common'

export default defineConfig({
  plugins: [vue({ compiler }), dts()],
  ...commonConfig,
})
