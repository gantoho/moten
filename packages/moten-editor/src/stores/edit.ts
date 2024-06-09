import type { BaseBlockNull, Viewport } from '@/types/edit'
import { defineStore } from 'pinia'

export const useEditStore = defineStore('edit', {
  state: () => ({
    currentSelect: {} as BaseBlockNull,
    viewport: 'desktop' as Viewport,
    configPanelShow: false,
  }),
  getters: {
    isMobileViewport: (state) => state.viewport === 'mobile',
  },
  actions: {
    setCurrentSelect(value: BaseBlockNull) {
      this.currentSelect = value
    },
    setViewport(value: Viewport) {
      this.viewport = value
    },
    setConfigPanelShow(value: boolean) {
      this.configPanelShow = value
    },
  },
})
