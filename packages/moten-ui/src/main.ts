import { App } from 'vue-demi'

import '@/assets/styles/index.scss'

import MoImage from '@/components/image'

import imageSchema from '@/components/image/schema'

import { schemaAllViewport as _schemaAllViewport } from '@/utils/components'

export const schema = {
  image: imageSchema,
}

const components = [MoImage]

const install = (app: App) => {
  components.forEach((component) => {
    const { name } = component
    if (name) app.component(name, component)
  })
}

export default { install, MoImage }

export const schemaAllViewport = _schemaAllViewport
