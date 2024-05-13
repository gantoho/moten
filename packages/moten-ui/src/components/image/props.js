export const defaultData = {
  content: {
    /**
     * 图片地址
     */
    src: {
      desktop: '',
      mobile: '',
    },
    /**
     * 图片链接
     */
    link: {
      desktop: '',
      mobile: '',
    },
  },
}

export const props = {
  /**
   * 数据
   */
  data: {
    type: Object,
    default: () => defaultData,
  },
  /**
   * 视口
   */
  viewport: {
    type: String,
    default: 'desktop',
    validator: (value) => ['desktop', 'mobile'].includes(value),
  },
}
