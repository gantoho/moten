import { PropType } from 'vue'
export const treeNodeProps = {
  /**
   * 节点对象
   */
  node: {
    type: Object as PropType<Record<string, any>>,
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
   * 节点层级
   */
  level: {
    type: Number,
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
export const treeNodeEmits = {
  /**
   * 节点的点击事件
   * @param node 节点数据
   * @returns
   */
  nodeClick: (node: Record<string, any>) => true,
}
