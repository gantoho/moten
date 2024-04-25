import { PropType } from 'vue'
export const treeProps = {
  /**
   * 树结构数据
   */
  data: {
    type: Array as PropType<Record<string, any>[]>,
    required: true,
  },
  /**
   * 节点的唯一key字段
   */
  nodeKey: {
    type: String,
    required: true,
  },
  /**
   * 节点的children字段
   */
  childrenKey: {
    type: String,
    default: 'children',
  },
  /**
   * 当前选中的节点的key
   */
  currentKey: {
    type: String,
    required: true,
  },
  /**
   * 是否默认展开
   */
  expand: {
    type: Boolean,
    default: true,
  },
} as const
export const treeEmits = {
  /**
   * 节点的点击事件
   * @param node 节点数据
   * @returns
   */
  nodeClick: (node: Record<string, any>) => true,
}
