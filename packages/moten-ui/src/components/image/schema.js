import { Type } from '@sinclair/typebox'

export default Type.Object({
  content: Type.Object({
    groupName: Type.String({
      default: '基础设置',
    }),
    display: Type.String({
      code: 'config-viewport',
      label: '屏幕',
      defaultValue: 'all',
    }),
    src: Type.String({
      code: 'config-files',
      label: '图片',
      defaultValue: '',
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
  style: Type.Object({
    groupName: Type.String({
      default: '样式设置',
    }),
    width: Type.String({
      code: 'config-input',
      label: '宽度',
      placeholder: '请输入宽度',
      defaultValue: '100%',
    }),
    height: Type.String({
      code: 'config-input',
      label: '高度',
      placeholder: '请输入高度',
      defaultValue: '295px',
    }),
  }),
})
