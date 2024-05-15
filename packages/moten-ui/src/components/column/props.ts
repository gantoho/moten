import { ComponentViewport } from '@/types/component'
import { PropType } from 'vue-demi'

export interface MoColumnPropsData {
  content?: {
    /**
     * 列数信息
     */
    cols?: {
      desktop: number[]
      mobile: number[]
    }
  }
  style?: {
    /**
     * 图片宽度
     */
    background?: {
      desktop: string
      mobile: string
    }
  }
}
export interface MoColumnPropsList {
  desktop: any[][]
  mobile: any[][]
}
export const props = {
  /**
   * 数据
   */
  data: {
    type: Object as PropType<MoColumnPropsData>,
    default: () => ({
      content: {
        cols: {
          desktop: [0.5, 0.5],
          mobile: [0.5, 0.5],
        },
      },
      style: {
        background: {
          desktop: '',
          mobile: '',
        },
      },
    }),
  },
  /**
   * 每列数据
   */
  list: {
    type: Object as PropType<MoColumnPropsList>,
    default: () => ({
      desktop: [[], []],
      mobile: [[], []],
    }),
  },
  /**
   * 视口
   */
  viewport: {
    type: String as PropType<ComponentViewport>,
    default: 'desktop',
  },
}
