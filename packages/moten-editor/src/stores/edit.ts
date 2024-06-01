import type { BaseBlockNull, Viewport } from '@/types/edit'
import { defineStore } from 'pinia'

export const useEditStore = defineStore('edit', {
  state: () => ({
    currentSelect: null as BaseBlockNull,
    viewport: 'desktop' as Viewport,
  }),
  getters: {
    // double: (state) => state.count * 2,
  },
  actions: {
    setCurrentSelect(value: BaseBlockNull) {
      this.currentSelect = value
    },
    setViewport(value: Viewport) {
      this.viewport = value
    },
  },
})
