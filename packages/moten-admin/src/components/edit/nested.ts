import { BlockConfigTypeNull, BlockConfigType } from '@/stores/edit'
import { nanoid } from '@/utils/index'
import { cloneDeep, isEqual } from 'lodash'

/**
 * column嵌套class
 * 用来在move里判断是否可以嵌套
 */
export const nestedClass = 'nested-container'

/**
 * 多个draggable组件的group名
 * 相同名可以相互拖拽
 */
export const dragGroup = 'blocks'

/**
 * draggable移动事件
 * 判断是否可以拖入
 * @returns
 */
export const move = (e: any) => {
  const classList = Array.from(e?.to?.classList)
  const isRelatedNested = classList?.includes(nestedClass)
  if (e?.draggedContext?.element?.nested && isRelatedNested) return false
  return true
}

export const clone = (e: object) => {
  return cloneDeep({ ...e, id: nanoid(8) })
}

export const replaceNodeId = (node: any) => {
  if (!node) return node
  const newNode = cloneDeep(node)
  const { children } = newNode || {}
  if (children?.length) {
    for (let i = 0; i < children.length; i++) {
      for (let j = 0; j < children[i].length; j++) {
        children[i][j] = replaceNodeId(children[i][j])
      }
    }
  }
  return clone(newNode)
}

export interface FindNodeByIdCallBack {
  array: BlockConfigType
  node: BlockConfigType[number]
  index: number
}

export const findNodeById = (
  arr: BlockConfigTypeNull,
  nodeId: string,
  callback: (params: FindNodeByIdCallBack) => void,
) => {
  if (!arr) return arr
  const array = cloneDeep(arr)
  for (let i = 0; i < array.length; i++) {
    const node = array[i]
    if (node.id === nodeId) {
      // 如果找到了匹配的节点，直接删除并返回
      callback({
        array,
        node,
        index: i,
      })
      return array
    }
    if (node.children && node.children.length > 0) {
      // 如果节点有子节点，则递归调用 findNodeById 函数
      for (let j = 0; j < node.children.length; j++) {
        if (!node.children[j].length) continue
        const updatedChildren = findNodeById(node.children[j], nodeId, callback)
        if (!isEqual(updatedChildren, node.children[j])) {
          // 如果子节点数组有更新，则更新当前节点的子节点数组
          node.children[j] = updatedChildren
          return array // 返回更新后的数组
        }
      }
    }
  }
  return array // 如果未找到匹配的节点，则返回原始数组
}
