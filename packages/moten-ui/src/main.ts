import '@/assets/styles/index.scss'

import MoImage from '@/components/image'
import MoColumn from '@/components/column'

import imageSchema from '@/components/image/schema'
import columnSchema from '@/components/column/schema'
import { COMPONENT_PREFIX as componentPrefix } from '@/config'

const components = [MoImage, MoColumn]

const install = (app: any) => {
  components.forEach((component) => {
    const { name } = component
    if (name) app.component(name, component)
  })
}

export const schema = {
  image: imageSchema,
  column: columnSchema,
}

export const COMPONENT_PREFIX = componentPrefix

export default { install, MoImage, MoColumn }
