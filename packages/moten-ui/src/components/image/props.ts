import { ComponentViewport } from '@/types/component'
import { PropType } from 'vue-demi'

export interface MoImagePropsData {
  content?: {
    /**
     * 图片地址
     */
    src?: {
      desktop: string
      mobile: string
    }
    /**
     * 图片链接
     */
    link?: {
      desktop: string
      mobile: string
    }
  }
  style?: {
    /**
     * 图片宽度
     */
    width?: {
      desktop: string
      mobile: string
    }
    /**
     * 图片高度
     */
    height?: {
      desktop: string
      mobile: string
    }
  }
}

export const props = {
  data: {
    type: Object as PropType<MoImagePropsData>,
    default: () => ({
      content: {
        src: {
          desktop: '',
          mobile: '',
        },
        link: {
          desktop: '',
          mobile: '',
        },
      },
      style: {
        width: {
          desktop: '100%',
          mobile: '100%',
        },
        height: {
          desktop: '295px',
          mobile: '295px',
        },
      },
    }),
  },
  viewport: {
    type: String as PropType<ComponentViewport>,
    default: 'desktop',
  },
}
