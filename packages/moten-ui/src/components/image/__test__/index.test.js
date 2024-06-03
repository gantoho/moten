import Component from '..'
import CurrentComponent from '../index.vue'
import { expect, describe, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { createApp } from 'vue-demi'

const componentCode = 'image'
const COMPONENT_PREFIX = 'mo'
const componentClass = `.${COMPONENT_PREFIX}-${componentCode}`

describe(`${componentCode} 基本测试`, () => {
  test('测试组件名', () => {
    const app = createApp({}).use(Component)
    expect(app.component(Component.name || '')).toBeTruthy()
  })
})
