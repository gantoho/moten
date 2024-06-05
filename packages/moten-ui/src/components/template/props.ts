import { ComponentViewport } from '@/types/component'
import { PropType } from 'vue-demi'

export type MoColumnPropsData = {
  /**
   * 图片地址
   */
  src?: {
    desktop: string
    mobile: string
  }
}

export const props = {
  data: {
    type: Object as PropType<MoColumnPropsData>,
    default: () => ({
      src: {
        desktop: '',
        mobile: '',
      },
    }),
  },
  viewport: {
    type: String as PropType<ComponentViewport>,
    default: 'desktop',
    validator(val: string) {
      return ['desktop', 'mobile'].includes(val)
    },
  },
}
