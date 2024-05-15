import { defineStore } from 'pinia'
import { baseBlocks, seniorBlocks } from '@/config/blocks'

export type BaseBlocksType = typeof baseBlocks & typeof seniorBlocks
export type BaseBlockType = BaseBlocksType[number]
export type BaseBlocksTypeNull = BaseBlocksType | null
export type BaseBlockTypeNull = BaseBlockType | null
export type ViewportType = 'mobile' | 'desktop'
export type BlockConfigTypeNull = BaseBlockType[] | null
export type BlockConfigType = BaseBlockType[]

export const useEditStore = defineStore('edit', {
  state: () => {
    return {
      currentSelect: null as BaseBlockTypeNull,
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
    setCurrentSelect(value: BaseBlockTypeNull) {
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
