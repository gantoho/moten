import type { PageDesignerProductPickerConfig } from './useProductPicker/product-picker'
import { getProductList, getProductCMSListFn, getProductCategoryFn } from '@/apis/common'

interface ApiResponse<T> {
  code: number
  message: string
  data: T
  [key: string]: any
}

export const pageDesignerProductPickerConfig: PageDesignerProductPickerConfig = {
  resetProductListFn: getProductList,
  getProductListFn: getProductCMSListFn,
  getProductCategoryFn: getProductCategoryFn,
}
