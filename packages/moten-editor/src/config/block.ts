import type { BlockSchema, BlockSchemaKeys } from './schema'

export interface BaseBlock {
  /**
   * id 区分组件
   */
  id: string
  /**
   * 组件名
   */
  code: string
  /**
   * 物料区标题
   */
  name: string
  /**
   * 物料区图标
   */
  icon: string
  /**
   * 是否是嵌套组件
   */
  nested?: boolean
  /**
   * 嵌套子项
   */
  children?: BaseBlock[][]
  /**
   * 配置内容
   */
  formData: BlockSchema[BlockSchemaKeys] | Object
}

export const baseBlocks: BaseBlock[] = [
  {
    id: '',
    name: '图片',
    code: 'image',
    icon: 'image',
    formData: {},
  },
  {
    id: '',
    name: '视频',
    code: 'video',
    icon: 'video',
    formData: {},
  },
  {
    id: '',
    name: '文本',
    code: 'text',
    icon: 'text',
    formData: {},
  },
  {
    id: '',
    name: '幻灯片',
    code: 'swiper',
    icon: 'swiper',
    formData: {},
  },
  {
    id: '',
    name: '留白',
    code: 'blank',
    icon: 'blank',
    formData: {},
  },
]

export const seniorBlocks: BaseBlock[] = [
  {
    id: '',
    name: '多行',
    code: 'row',
    icon: 'row',
    nested: true,
    children: [[], []],
    formData: {},
  },
  {
    id: '',
    name: '多列',
    code: 'column',
    icon: 'column',
    nested: true,
    children: [[], []],
    formData: {},
  },
  {
    id: '',
    name: '画布',
    code: 'canvas',
    icon: 'canvas',
    nested: true,
    children: [[], []],
    formData: {},
  },
]

export const canvasBlocks: BaseBlock[] = [
  {
    id: '',
    name: '图片',
    code: 'image',
    icon: 'image',
    formData: {},
  },
  {
    id: '',
    name: '文本',
    code: 'text',
    icon: 'text',
    formData: {},
  },
]
