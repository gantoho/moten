import { Type } from '@sinclair/typebox'
import { schema } from '@moten/ui'

export const blockSchema = schema

const background = Type.String({
  code: 'config-background',
  label: '设置背景',
  defaultValue: '',
})
const title = Type.String({
  code: 'config-input',
  label: '页面标题',
  placeholder: '请输入页面标题',
})
const keywords = Type.String({
  code: 'config-input',
  label: '页面关键字',
  placeholder: '请输入页面关键字',
})
const description = Type.String({
  code: 'config-input',
  label: '页面描述',
  placeholder: '请输入页面描述',
})

export const pageSchema = Type.Object({
  content: Type.Object({
    groupName: Type.String({
      default: '基础设置',
    }),
    background: Type.Object({
      desktop: background,
      mobile: background,
    }),
  }),
  share: Type.Object({
    groupName: Type.String({
      default: '分享设置',
    }),
    title: Type.Object({
      desktop: title,
      mobile: title,
    }),
    keywords: Type.Object({
      desktop: keywords,
      mobile: keywords,
    }),
    description: Type.Object({
      desktop: description,
      mobile: description,
    }),
  }),
})
