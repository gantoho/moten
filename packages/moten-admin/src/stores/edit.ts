import { defineStore } from 'pinia'
import { baseBlocks } from '@/config/blocks'

export type baseBlocksType = typeof baseBlocks
export type baseBlocksTypeNull = baseBlocksType | null
export type viewportType = 'mobile' | 'desktop'

export const useEditStore = defineStore('edit', {
  state: () => {
    return {
      currentSelect: null as baseBlocksTypeNull,
      pageConfig: null as object | null,
      blockConfig: null as object | null,
      pageData: {},
      blockData: {},
      viewport: 'desktop' as viewportType,
      rightPanelShow: false,
    }
  },
  getters: {
    isMobileViewport: (state) => state.viewport === 'mobile',
  },
  actions: {
    setCurrentSelect(value: baseBlocksTypeNull) {
      this.currentSelect = value
    },
    setBlockConfig(value: object) {
      this.blockConfig = value
    },
    setPageConfig(value: object) {
      this.pageConfig = value
    },
    updatePageData(value: object) {
      this.pageData = { ...this.pageData, ...value }
    },
    setBlockData(value: object) {
      this.blockData = value
    },
    setViewport(value: viewportType) {
      this.viewport = value
    },
    setRightPanelShow(value: boolean) {
      this.rightPanelShow = value
    },
  },
})
