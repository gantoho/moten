import '@/assets/styles/index.scss'

import MoImage from '@/components/image'
import MoColumn from '@/components/column'

import imageSchema from '@/components/image/schema'
import columnSchema from '@/components/column/schema'
import { COMPONENT_PREFIX as _COMPONENT_PREFIX } from '@/config'
import { schemaAllViewport as _schemaAllViewport } from '@/utils/components'

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

export const COMPONENT_PREFIX = _COMPONENT_PREFIX

export const schemaAllViewport = _schemaAllViewport

export default { install, MoImage, MoColumn }
