import { Type } from '@sinclair/typebox'

export default Type.Object({
  content: Type.Object({
    groupName: Type.String({
      default: '基础设置',
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
  style: Type.Object({
    groupName: Type.String({
      default: '样式设置',
    }),
    paddingLeft: Type.Number({
      code: 'config-slider',
      label: '左间距',
      step: 1,
      showInput: true,
      defaultValue: 0,
      maxLength: 100,
      minLength: 0,
    }),
    paddingRight: Type.Number({
      code: 'config-slider',
      label: '右间距',
      step: 1,
      showInput: true,
      defaultValue: 0,
      maxLength: 100,
      minLength: 0,
    }),
    paddingTop: Type.Number({
      code: 'config-slider',
      label: '上边距',
      step: 1,
      showInput: true,
      defaultValue: 0,
      maxLength: 100,
      minLength: 0,
    }),
    paddingBottom: Type.Number({
      code: 'config-slider',
      label: '下边距',
      step: 1,
      showInput: true,
      defaultValue: 0,
      maxLength: 100,
      minLength: 0,
    }),
  }),
})
