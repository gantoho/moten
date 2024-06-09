import type { BaseBlock } from '@/types/edit'
import { nanoid } from '@/utils/index'
import { cloneDeep } from 'lodash'
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
    const element = array[i]
    if (element.id === nodeId) {
      element.formData = deepmerge.all([element.formData, data])
      return array
    }
  }

  return array
}
