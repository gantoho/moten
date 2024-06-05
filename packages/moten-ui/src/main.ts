import { App } from 'vue-demi'

import '@/assets/styles/index.scss'

import MoImage from '@/components/image'
import MoColumn from '@/components/column'

import imageSchema from '@/components/image/schema'
import columnSchema from '@/components/column/schema'

import { schemaAllViewport as _schemaAllViewport } from '@/utils/components'
import { COMPONENT_PREFIX as _COMPONENT_PREFIX } from '@/config'

export const schema = {
  image: imageSchema,
  column: columnSchema,
}

const components = [MoImage, MoColumn]

const install = (app: App) => {
  components.forEach((component) => {
    const { name } = component
    if (name) app.component(name, component)
  })
}

export default { install, MoImage, MoColumn }

export const schemaAllViewport = _schemaAllViewport
export const COMPONENT_PREFIX = _COMPONENT_PREFIX
