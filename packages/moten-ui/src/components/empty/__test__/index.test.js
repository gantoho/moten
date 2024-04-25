import Component from '..'
import DeComponent from '../index.vue'
import { mount } from '@vue/test-utils'
import { createApp } from 'vue-demi'
import { expect, describe, test } from 'vitest'
import { COMPONENT_PREFIX } from '@/config'

const componentCode = 'empty'
const componentClass = `.${COMPONENT_PREFIX}-${componentCode}`

describe(`${componentCode} base test`, () => {
  test('test component name', () => {
    const app = createApp({}).use(Component)
    expect(app.component(Component.name)).toBeTruthy()
  })

  test('test main class', () => {
    const wrapper = mount(DeComponent)
    expect(wrapper.find(componentClass).classes()).toBeTruthy()
    wrapper.unmount()
  })
})

describe(`${componentCode} test component props`, () => {
  test('test image', () => {
    const image = 'https://via.placeholder.com/200'
    const wrapper = mount(DeComponent, {
      props: { image },
    })
    expect(wrapper.find(componentClass + ' .image').attributes('src')).toContain(image)
    wrapper.unmount()
  })

  test('test description', () => {
    const description = '暂无数据'
    const wrapper = mount(DeComponent, {
      props: { description },
    })
    expect(wrapper.find(componentClass + ' .description').text()).toContain(description)
    wrapper.unmount()
  })
})
