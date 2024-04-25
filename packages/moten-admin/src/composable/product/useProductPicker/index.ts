import { h, render } from 'vue'
import {
  type ProductPickerProps,
  type PageDesignerProductPickerConfig,
  type PageDesignerProduct,
} from './product-picker'
import ProductPicker from './product-picker.vue'

export * from './product-picker'

export type UseProductPickerOptions = Partial<Pick<ProductPickerProps, 'multiple' | 'max'>>

const div = document.createElement('div')
document.body.appendChild(div)

export const useProductPicker = (config: PageDesignerProductPickerConfig) => {
  const open = (options?: UseProductPickerOptions) =>
    new Promise<PageDesignerProduct[] | null>(resolve => {
      const NODE = h(ProductPicker, {
        ...config,
        ...options,
        onChange: (val: PageDesignerProduct[]) => {
          resolve(val)
        },
        onCancel: () => {
          resolve(null)
        },
      })
      render(NODE, div)

      NODE?.component?.exposed?.open()
    })
  return {
    open,
  }
}
