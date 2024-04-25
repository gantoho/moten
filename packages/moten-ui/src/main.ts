import { type App } from 'vue-demi'

import '@/assets/styles/index.scss'

import DeImage from '@/components/image'
import DeColumn from '@/components/column'

import imageSchema from '@/components/image/schema'
import columnSchema from '@/components/column/schema'
import { COMPONENT_PREFIX as componentPrefix } from '@/config'

const components = [DeImage, DeColumn]

const install = (app: App) => {
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

export default { install, DeImage }
