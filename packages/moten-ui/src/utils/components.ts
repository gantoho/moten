import { COMPONENT_PREFIX } from '@/config'
import { type App } from 'vue-demi'

export function withInstall(component: any) {
  const componentWithInstall = component

  componentWithInstall.install = function (app: App) {
    const { name } = component
    if (name) app.component(name, component)
  }

  return componentWithInstall
}

export const bigCamelize = (s: string): string =>
  camelize(s).replace(s.charAt(0), s.charAt(0).toUpperCase())

export const camelize = (s: string): string =>
  s.replace(/-(\w)/g, (_: any, p: string) => p.toUpperCase())

export const kebabCase = (s: string): string => {
  const ret = s.replace(/([A-Z])/g, ' $1').trim()
  return ret.split(' ').join('-').toLowerCase()
}

export function createNamespaceFn(prefix: string) {
  return (name: string) => {
    const componentName = `${prefix}-${name}`

    const createBEM = (suffix?: string): string => {
      if (!suffix) return componentName
      return suffix.startsWith('--') ? `${componentName}${suffix}` : `${componentName}__${suffix}`
    }

    return {
      name: bigCamelize(componentName),
      n: createBEM,
    }
  }
}

export const createNamespace = createNamespaceFn(COMPONENT_PREFIX)
