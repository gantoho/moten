import Component from '..'
import DeComponent from '../index.vue'
import { mount } from '@vue/test-utils'
import { createApp } from 'vue-demi'
import { expect, describe, test } from 'vitest'
import { COMPONENT_PREFIX } from '@/config'

const componentCode = 'image'
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
  test('test src', () => {
    const src = 'https://via.placeholder.com/200'
    const wrapper = mount(DeComponent, {
      props: { data: { src } },
    })
    expect(wrapper.find(componentClass + ' .image').attributes('src')).toContain(src)
    wrapper.unmount()
  })

  test('test mode', () => {
    const mode = 'fill'
    const src = 'https://via.placeholder.com/200'
    const wrapper = mount(DeComponent, {
      props: { data: { mode, src } },
    })
    const element = wrapper.find(componentClass + ' .image').element
    const computedStyle = window.getComputedStyle(element)
    expect(computedStyle.getPropertyValue('object-fit')).toContain(mode)
    wrapper.unmount()
  })

  test('test alt', () => {
    const alt = '图片alt'
    const src = 'https://via.placeholder.com/200'
    const wrapper = mount(DeComponent, {
      props: { data: { alt, src } },
    })
    expect(wrapper.find(componentClass + ' .image').attributes('alt')).toContain(alt)
    wrapper.unmount()
  })
})
