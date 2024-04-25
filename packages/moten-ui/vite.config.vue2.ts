/// <reference types="vitest" />

import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import dts from 'vite-plugin-dts'
import commonConfig from './vite.config.common'

export default defineConfig({
  plugins: [createVuePlugin(), dts()],
  ...commonConfig,
})
