export interface propData {
  /**
   * 图片地址
   */
  src?: string
  /**
   * 图片模式
   * 遵循 img 标签 object-fit 属性
   */
  mode?: 'cover' | 'fill' | 'contain' | 'none' | 'scale-down'
  /**
   * 图片描述
   */
  alt?: string
}

export const propDataDefaults = {
  src: '',
  mode: 'cover',
  alt: '',
}

export const props = {
  data: {
    type: Object,
    default: () => propDataDefaults,
  },
}
