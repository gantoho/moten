import { TSchema, Type } from '@sinclair/typebox'
import { App, Component, Plugin } from 'vue-demi'

export const schemaAllViewport = <T extends TSchema>(params: T) => {
  return Type.Object({
    desktop: params,
    mobile: params,
  })
}

export function withInstall(component: Component) {
  ;(component as Component & Plugin).install = function (app: App) {
    const { name } = component
    if (name) app.component(name, component)
  }
  return component
}
