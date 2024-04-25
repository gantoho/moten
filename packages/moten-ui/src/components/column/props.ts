export interface propData {
  /**
   * 列数
   */
  cols?: number
}

export const propDataDefaults = {
  cols: 2,
}

export const props = {
  data: {
    type: Object as () => propData,
    default: () => propDataDefaults,
  },
  list: {
    type: Array as () => Array<any>,
    default: () => [],
  },
}
