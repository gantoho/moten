import { Type } from '@sinclair/typebox'

const display = Type.Boolean({
  code: 'config-switch',
  label: '显示组件',
  defaultValue: true,
})

const src = Type.String({
  code: 'config-files',
  label: '选择图片',
  placeholder: '请输入标题',
  isAlt: false,
  isLink: true,
  errorMessage: {
    required: '请上传图片',
  },
})

const mode = Type.String({
  code: 'config-image-mode',
  label: '裁剪模式',
  defaultValue: 'cover',
})

export default Type.Object({
  content: Type.Object({
    groupName: Type.String({
      default: '基础设置',
    }),
    display: Type.Object({
      desktop: display,
      mobile: display,
    }),
    src: Type.Object({
      desktop: src,
      mobile: src,
    }),
    mode: Type.Object({
      desktop: mode,
      mobile: mode,
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
