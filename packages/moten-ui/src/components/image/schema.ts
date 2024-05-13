import { Type } from '@sinclair/typebox'

export default Type.Object({
  content: Type.Object({
    groupName: Type.String({
      default: '基础设置',
    }),
    display: Type.String({
      code: 'config-viewport',
      label: '终端',
      defaultValue: 'all',
    }),
    src: Type.String({
      code: 'config-files',
      label: '图片',
      placeholder: '请输入标题',
      errorMessage: {
        required: '请上传图片',
      },
    }),
    link: Type.String({
      code: 'config-input',
      label: '链接',
      placeholder: '请输入链接',
      defaultValue: '',
    }),
  }),
})
