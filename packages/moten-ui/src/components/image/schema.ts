import { Type } from '@sinclair/typebox'

const display = Type.Boolean({
  code: 'config-viewport',
  label: '选择终端',
  defaultValue: 'all',
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
})
