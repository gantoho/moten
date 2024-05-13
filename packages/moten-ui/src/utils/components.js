import { COMPONENT_PREFIX } from '@/config'

export function withInstall(component) {
  const componentWithInstall = component

  componentWithInstall.install = function (app) {
    const { name } = component
    if (name) app.component(name, component)
  }

  return componentWithInstall
}

export const bigCamelize = (s) => camelize(s).replace(s.charAt(0), s.charAt(0).toUpperCase())

export const camelize = (s) => s.replace(/-(\w)/g, (_, p) => p.toUpperCase())

export const kebabCase = (s) => {
  const ret = s.replace(/([A-Z])/g, ' $1').trim()
  return ret.split(' ').join('-').toLowerCase()
}

export function createNamespaceFn(prefix) {
  return (name) => {
    const componentName = `${prefix}-${name}`

    const createBEM = (suffix) => {
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
