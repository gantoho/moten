import { schemaAllViewport } from '@/utils/components'
import { Static, Type } from '@sinclair/typebox'

const display = Type.Boolean({
  code: 'config-viewport',
  label: '屏幕',
  defaultValue: true,
})
const src = Type.String({
  code: 'config-files',
  label: '图片',
  defaultValue: '',
  errorMessage: {
    required: '请上传图片',
  },
})
const link = Type.String({
  code: 'config-input',
  label: '链接',
  placeholder: '请输入链接',
  defaultValue: '',
})
const width = Type.String({
  code: 'config-input',
  label: '宽度',
  placeholder: '请输入宽度',
  defaultValue: '100%',
})
const height = Type.String({
  code: 'config-input',
  label: '高度',
  placeholder: '请输入高度',
  defaultValue: '295px',
})

const T = Type.Object({
  content: Type.Object({
    groupName: Type.Optional(Type.String({ default: '基础设置' })),
    display: schemaAllViewport(display),
    src: schemaAllViewport(src),
    link: schemaAllViewport(link),
  }),
  style: Type.Object({
    groupName: Type.Optional(Type.String({ default: '样式设置' })),
    width: schemaAllViewport(width),
    height: schemaAllViewport(height),
  }),
})

export type MoImageSchemaType = Static<typeof T>

export default T
