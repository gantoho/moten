export interface propData {
  /**
   * 图片地址
   */
  src?: string
  /**
   * 图片链接
   */
  link?: string
}

export const propDataDefaults = {
  src: '',
  link: '',
}

export const props = {
  data: {
    type: Object,
    default: () => propDataDefaults,
  },
}
