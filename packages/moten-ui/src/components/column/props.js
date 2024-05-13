export const defaultData = {
  /**
   * 列数
   */
  cols: 2,
}

export const props = {
  data: {
    type: Object,
    default: () => defaultData,
  },
  list: {
    type: Array,
    default: () => [],
  },
}
