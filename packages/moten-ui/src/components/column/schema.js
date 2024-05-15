import { Type } from '@sinclair/typebox'

export default Type.Object({
  content: Type.Object({
    groupName: Type.String({
      default: '基础设置',
    }),
    // TODO
    cols: Type.String({
      code: 'config-column',
      label: '列数',
      defaultValue: [0.5, 0.5],
    }),
  }),
  style: Type.Object({
    groupName: Type.String({
      default: '样式设置',
    }),
    background: Type.String({
      code: 'config-color',
      label: '背景',
      defaultValue: '#fff',
    }),
  }),
})
