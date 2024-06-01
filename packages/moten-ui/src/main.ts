import './style.css'

import MoImage from './components/mo-image.vue'

import imageSchema from '@/components/image/schema'

import { schemaAllViewport as _schemaAllViewport } from '@/utils/components'

export const schema = {
  image: imageSchema,
}

export const schemaAllViewport = _schemaAllViewport

export default { MoImage }
