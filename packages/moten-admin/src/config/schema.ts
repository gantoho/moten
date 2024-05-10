import { Type } from '@sinclair/typebox'
import { schema } from '@moten/ui'

export const blockSchema = schema

export const pageSchema = Type.Object({
  content: Type.Object({
    groupName: Type.String({
      default: '基础设置',
    }),
    background: Type.String({
      code: 'config-background',
      label: '背景',
      defaultValue: '',
    }),
  }),
  share: Type.Object({
    groupName: Type.String({
      default: '分享设置',
    }),
    title: Type.String({
      code: 'config-input',
      label: '标题',
      placeholder: '请输入页面标题',
    }),
    keywords: Type.String({
      code: 'config-input',
      label: '关键字',
      placeholder: '请输入页面关键字',
    }),
    description: Type.String({
      code: 'config-input',
      label: '描述',
      placeholder: '请输入页面描述',
    }),
  }),
})
