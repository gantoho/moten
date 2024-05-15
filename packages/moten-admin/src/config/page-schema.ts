import { Static, Type } from '@sinclair/typebox'
import { schemaAllViewport } from '@moten/ui'

const background = Type.String({
  code: 'config-color',
  label: '背景',
  defaultValue: '',
})
const title = Type.String({
  code: 'config-input',
  label: '标题',
  placeholder: '请输入页面标题',
})
const keywords = Type.String({
  code: 'config-input',
  label: '关键字',
  placeholder: '请输入页面关键字',
})
const description = Type.String({
  code: 'config-input',
  label: '描述',
  placeholder: '请输入页面描述',
})

const T = Type.Object({
  content: Type.Object({
    groupName: Type.Optional(Type.String({ default: '基础设置' })),
    background: schemaAllViewport(background),
  }),
  share: Type.Object({
    groupName: Type.Optional(Type.String({ default: '分享设置' })),
    title: schemaAllViewport(title),
    keywords: schemaAllViewport(keywords),
    description: schemaAllViewport(description),
  }),
})

export type PageSchemaType = Static<typeof T>

export default T
