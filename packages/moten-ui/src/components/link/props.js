export const props = {
  /**
   * 链接
   */
  to: {
    type: String,
    default: '',
  },
  /**
   * 图片链接
   */
  target: {
    type: String,
    default: '_self',
    validator(val) {
      return ['_blank', '_self', '_parent', '_top'].includes(val)
    },
  },
}
