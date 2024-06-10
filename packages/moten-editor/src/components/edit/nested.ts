import type { BaseBlock } from '@/types/edit'
import { nanoid } from '@/utils/index'
import { cloneDeep, isEqual } from 'lodash'
import deepmerge from 'deepmerge'

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

/**
 * draggable克隆事件
 * @param e
 * @returns
 */
export const clone = (e: object) => {
  return cloneDeep({ ...e, id: nanoid(8) })
}

/**
 * 找到相应id里的FormData做更新
 * @param arr
 * @param nodeId
 * @param data
 * @returns
 */
export const findNodeById = (arr: BaseBlock[], nodeId: string, data: object) => {
  const array = cloneDeep(arr)

  for (let i = 0; i < array.length; i++) {
    const element = array[i] as any
    if (element.id === nodeId) {
      const overwriteMerge = (_destinationArray: any, sourceArray: any, _options: any) =>
        sourceArray
      element.formData = deepmerge(element.formData, data, {
        arrayMerge: overwriteMerge,
      })

      if (element.nested && element.code === 'column') {
        const cols = element.formData?.cols?.desktop || [0.5, 0.5]
        const oldCols = element.children || [[], []]
        if (oldCols.length > cols.length) {
          const count = oldCols.length - cols.length
          element.children?.splice(oldCols.length - count, count)
        } else {
          const count = cols.length - oldCols.length
          const diff = Array.from({ length: count }, (_) => [])
          element.children?.push(...diff)
        }
      }

      return array
    }

    if (element.children.length) {
      // 如果节点有子节点，则递归调用 findNodeById 函数
      for (let j = 0; j < element.children.length; j++) {
        const elementChildren = element.children[j]
        if (!elementChildren.length) continue
        const newChildren = findNodeById(elementChildren, nodeId, data)
        if (!isEqual(newChildren, elementChildren)) {
          // 如果子节点数组有更新，则更新当前节点的子节点数组
          if (newChildren) element.children[j] = newChildren
          return array
        }
      }
    }
  }

  return array
}
