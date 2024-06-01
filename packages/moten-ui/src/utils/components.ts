import { TSchema, Type } from '@sinclair/typebox'

export const schemaAllViewport = <T extends TSchema>(params: T) => {
  return Type.Object({
    desktop: params,
    mobile: params,
  })
}
