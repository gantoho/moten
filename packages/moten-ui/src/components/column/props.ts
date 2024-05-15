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
    /**
     * 每列数据
     */
    list?: {
      desktop: any[][]
      mobile: any[][]
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
  list: {
    type: Array,
    default: {
      desktop: [[], []],
      mobile: [[], []],
    },
  },
  /**
   * 视口
   */
  viewport: {
    type: String as PropType<ComponentViewport>,
    default: 'desktop',
  },
}
