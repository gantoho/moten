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
      blockConfigTemp: null as BlockConfigTypeNull,
      viewport: 'desktop' as ViewportType,
      rightPanelShow: false,
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
    setBlockConfigTemp(value: BlockConfigTypeNull) {
      this.blockConfigTemp = value
    },
    setPageConfig(value: object) {
      this.pageConfig = value
    },
    setViewport(value: ViewportType) {
      this.viewport = value
    },
    setRightPanelShow(value: boolean) {
      this.rightPanelShow = value
    },
  },
})
