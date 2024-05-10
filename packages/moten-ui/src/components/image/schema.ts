import { Type } from '@sinclair/typebox'

export default Type.Object({
  content: Type.Object({
    groupName: Type.String({
      default: '基础设置',
    }),
    display: Type.String({
      code: 'config-viewport',
      label: '选择终端',
      defaultValue: 'all',
    }),
    src: Type.String({
      code: 'config-files',
      label: '选择图片',
      placeholder: '请输入标题',
      isAlt: false,
      isLink: true,
      errorMessage: {
        required: '请上传图片',
      },
    }),
    mode: Type.String({
      code: 'config-image-mode',
      label: '裁剪模式',
      defaultValue: 'cover',
    }),
  }),
})
