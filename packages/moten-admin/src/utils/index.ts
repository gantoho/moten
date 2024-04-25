import { defineAsyncComponent, markRaw } from 'vue'
import { customAlphabet } from 'nanoid'

/**
 * 随机id生成
 * @param length 长度
 * @returns
 */
export const nanoid = (length = 8) => {
  const nanoid = customAlphabet('123456789abcdefghijklmnopqrstuvwxyz', length)
  return nanoid()
}

/**
 * 动态引入组件
 * 注：Vue3引入动态组件只能通过引入组件，Vue2指定名字的方式失效了
 * @param name 组件名
 * @param importUrl 引入所有的组件 import.meta.glob('@/components/config/**')
 * @returns
 */
export const batchDynamicComponents = (name: string, importUrl: any) => {
  const components = importUrl
  const componentMap = Object.assign(
    {},
    ...Object.keys(components).map((item) => {
      const name = item?.split('/')?.pop()?.replace('.vue', '') || ''
      return {
        [name]: components[item],
      }
    }),
  )
  const importComponent = componentMap[name]

  if (!importComponent) return ''

  return markRaw(defineAsyncComponent(importComponent))
}

/**
 * 延迟函数
 * @param delay 延迟时间
 * @returns
 */
export const sleep = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay))
}
