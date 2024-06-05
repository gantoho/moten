import Component from '..'
import CurrentComponent from '../index.vue'
import { expect, describe, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { createApp } from 'vue-demi'
import { COMPONENT_PREFIX } from '@/config'

const componentCode = 'column'
const componentClass = `.${COMPONENT_PREFIX}-${componentCode}`

describe(`${componentCode} 基本测试`, () => {
  test('测试组件名', () => {
    const app = createApp({}).use(Component)
    expect(app.component(Component.name || '')).toBeTruthy()
  })

  test('测试主要class', () => {
    const wrapper = mount(CurrentComponent)
    expect(wrapper.find(componentClass).classes()).toBeTruthy()
    wrapper.unmount()
  })
})

describe(`${componentCode} 测试组件的props`, () => {
  //   test('测试src', () => {
  //     const src = 'https://via.placeholder.com/200'
  //     const wrapper = mount(CurrentComponent, {
  //       props: {
  //         data: {
  //           src: {
  //             desktop: src,
  //             mobile: src,
  //           },
  //         },
  //       },
  //     })
  //     expect(wrapper.find(componentClass + ' .image').attributes('src')).toContain(src)
  //   })
})
