import { defineStore } from 'pinia'
import { baseBlocks } from '@/config/blocks'

export type BaseBlocksType = typeof baseBlocks
export type BaseBlocksTypeNull = BaseBlocksType | null
export type ViewportType = 'mobile' | 'desktop'
export type BlockConfigTypeNull = Array<BaseBlocksType> | null

export const useEditStore = defineStore('edit', {
  state: () => {
    return {
      currentSelect: null as BaseBlocksTypeNull,
      pageConfig: null as object | null,
      blockConfig: null as BlockConfigTypeNull,
      viewport: 'desktop' as ViewportType,
      configPanelShow: false,
    }
  },
  getters: {
    isMobileViewport: (state) => state.viewport === 'mobile',
  },
  actions: {
    setCurrentSelect(value: BaseBlocksTypeNull) {
      this.currentSelect = value
    },
    setBlockConfig(value: BlockConfigTypeNull) {
      this.blockConfig = value
    },
    setPageConfig(value: object) {
      this.pageConfig = value
    },
    setViewport(value: ViewportType) {
      this.viewport = value
    },
    setConfigPanelShow(value: boolean) {
      this.configPanelShow = value
    },
  },
})
