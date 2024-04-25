import { ExtractPropTypes, PropType } from 'vue'

export interface PageDesignerProduct {
  /**
   * 商品id
   */
  id: number
  /**
   * 商品缩略图
   */
  thumbnail: string
  /**
   * 商品名称
   */
  name: string
  /**
   * 商品类型
   */
  type: 'simple' | 'configurable' | 'virtual' | 'downloadable' | 'bundle'
  /**
   * 价格
   */
  price: string
  sku: string
  /**
   * 可见度，2-分类可见，3-搜索可见，4-分类搜索可见
   */
  visibility: '0' | '1' | '2' | '3' | '4'
  /**
   * 库存
   */
  salable_quantity: SalableQuantity[]
  /**
   * 是否开启，1开启，默认只有开启的产品才在此接口可见
   */
  status: number
  websites: string
}

interface SalableQuantity {
  /**
   * 库存源名称
   */
  stock_name: string
  /**
   * 库存数量
   */
  qty: number
  manage_stock: boolean
}

/**
 * 需提供的商品查询数据格式
 */
export interface ProductPaginationVo {
  page: number
  pageSize: number
  totalPages: number
  item: PageDesignerProduct[]
}

/**
 * 商品分类树
 */
export interface ProductCategory {
  id: string
  parentid: string
  name: string
  isactive: '0' | '1'
  child: ProductCategory[]
}

export interface ProductCategoryVo {
  category: ProductCategory[]
}

export interface resetProductList {
  [key: string]: any
}

/**
 * 配置
 */
export interface PageDesignerProductPickerConfig {
  /**
   * 获取商品分页列表
   * @param path 页码
   * @param path 每页条数
   * @return `Promise<ProductPaginationVo | false>` 商品分页数据
   */
  getProductListFn: (params: PageDesignerProductQueryParams) => Promise<ProductPaginationVo | false>
  /**
   * 获取商品分类树
   * @return `Promise<ProductCategoryVo | false>` 商品分类树
   */
  getProductCategoryFn: () => Promise<ProductCategoryVo | false>
  /**
   * 获取商品分类树
   * @return `Promise<ProductCategoryVo | false>` 商品分类树
   */
  resetProductListFn: () => Promise<resetProductList | false>
}

/**
 * 查询参数
 */
export interface PageDesignerProductQueryParams {
  page?: number
  pageSize?: number
  categoryId?: number
  searchKey?: 'sku' | 'name'
  keywords?: string
  sort?: string
  sortDir?: 'asc' | 'desc'
  storeCode?: string
  status?: '0' | '1' | '2'
  visibility?: '0' | '1' | '2' | '3' | '4'
}

export const productPickerProps = {
  /**
   * 是否可多选
   */
  multiple: {
    type: Boolean,
    default: true,
  },
  /**
   * 最多可以选多少条数据
   */
  max: {
    type: Number,
    default: 99999999,
  },
  /**
   * 获取商品列表方法
   */
  getProductListFn: {
    type: Function as PropType<PageDesignerProductPickerConfig['getProductListFn']>,
    required: true,
  },
  /**
   * 获取商品分类树的方法
   */
  getProductCategoryFn: {
    type: Function as PropType<PageDesignerProductPickerConfig['getProductCategoryFn']>,
    required: true,
  },
  /**
   * 获取商品分类树的方法
   */
  resetProductListFn: {
    type: Function as PropType<PageDesignerProductPickerConfig['getProductCategoryFn']>,
    required: true,
  },
} as const

export type ProductPickerProps = ExtractPropTypes<typeof productPickerProps>

export const productPickerEmits = {
  change: (val: PageDesignerProduct[]) => Array.isArray(val),
  cancel: () => true,
}
