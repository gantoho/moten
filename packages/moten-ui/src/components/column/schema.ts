import { schemaAllViewport } from '@/utils/components'
import { Static, Type } from '@sinclair/typebox'

const cols = Type.Array(Type.Number(), {
  code: 'config-column',
  label: '列数',
  defaultValue: 0.5,
  minItems: 2,
  maxItems: 5,
})
const background = Type.String({
  code: 'config-color',
  label: '背景',
  defaultValue: '#fff',
})

const T = Type.Object({
  content: Type.Object({
    groupName: Type.Optional(Type.String({ default: '基础设置' })),
    cols: schemaAllViewport(cols),
  }),
  style: Type.Object({
    groupName: Type.Optional(Type.String({ default: '样式设置' })),
    background: schemaAllViewport(background),
  }),
})

export type MoColumnSchemaType = Static<typeof T>

export default T
