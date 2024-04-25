const importImage = (path: string): string => {
  return new URL(`../assets/images/blocks/${path}.png`, import.meta.url).href
}

export const baseBlocks = [
  {
    id: '',
    name: '多列',
    code: 'column',
    icon: importImage('column'),
    nested: true,
    children: [[], []],
    formData: {},
  },
  {
    id: '',
    name: '图片',
    code: 'image',
    icon: importImage('image'),
    formData: {},
  },
  {
    id: '',
    name: '视频',
    code: 'video',
    icon: importImage('video'),
    formData: {},
  },
  {
    id: '',
    name: '文本',
    code: 'text',
    icon: importImage('text'),
    formData: {},
  },
  {
    id: '',
    name: '幻灯片',
    code: 'swiper',
    icon: importImage('swiper'),
    formData: {},
  },
  {
    id: '',
    name: '留白',
    code: 'blank',
    icon: importImage('blank'),
    formData: {},
  },
]

export const marketingBlocks = [
  {
    id: '',
    name: '幻灯片',
    code: 'slider',
    icon: importImage('swiper'),
    formData: {},
  },
]
