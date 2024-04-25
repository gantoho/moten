<template>
  <el-form-item size="small" :label="label" :required="required">
    <div class="private-lattice-product-select">
      <div class="private-lattice-product-select-style">
        <el-radio-group v-model="radioValue" @change="radioChange" v-if="radioList.length">
          <el-radio-button
            v-for="(item, index) in radioList"
            :label="item.label"
            :name="item.label"
            :key="index"
          />
        </el-radio-group>
        <el-select
          v-if="pageList.length > 1"
          v-model="currentPage"
          placeholder="请选择"
          @change="currentPageChange"
          :width="50"
        >
          <el-option
            v-for="item in pageList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <draggable
        :list="currentProducts"
        :style="latticeStyle"
        @end="productDraggableEnd"
        handle=".handle"
        item-key="product-draggable"
      >
        <template #item="{ element, index }">
          <div class="select-product-item">
            <el-row style="width: 100%" :getter="10" align="middle">
              <el-col :span="3">
                <span>{{ index + 1 }}</span>
              </el-col>
              <el-col :span="5">
                <img
                  v-if="element && element.image"
                  class="select-product-item-image handle"
                  :src="element.image"
                  @click="refreshItem(element, index)"
                />
                <div v-else class="select-item-container">
                  <div class="select-product-item-add p-t-15 m-r-15" @click="productClick(element)">
                    <div class="flex c">
                      <el-icon :size="20">
                        <Plus />
                      </el-icon>
                    </div>

                    <div class="tc m-t-5">选择商品</div>
                  </div>
                  <div
                    v-if="showSelectImage"
                    class="select-product-item-add p-t-15"
                    @click="selectImage(index)"
                  >
                    <div class="flex c">
                      <el-icon :size="20">
                        <Plus />
                      </el-icon>
                    </div>

                    <div class="tc m-t-5">选择图片</div>
                  </div>
                </div>
              </el-col>
              <el-col :span="1"></el-col>
              <el-col :span="12" v-if="element">
                <div v-if="element.sku">
                  <span>{{ element.isImage ? 'image' : element.sku }}</span>
                </div>
                <div class="ellipsis" v-if="showProductName">{{ element.name }}</div>
                <el-input
                  v-if="showCustomRouteLinkInput && element.image"
                  v-model="element.customRouteLink"
                  placeholder="请输入自定义链接"
                  @input="customRouteLinkInput"
                />
              </el-col>
              <el-col :span="1"></el-col>
              <el-col :span="1" v-if="element && element.image">
                <el-icon
                  v-if="showSelectImage"
                  @click="changeItemType(element, index)"
                  class="el-icon-delete"
                  :title="element.isImage ? '切换商品' : '切换图片'"
                  ><Switch
                /></el-icon>
                <el-icon @click="deleteProduct(index)" class="el-icon-delete"><Delete /></el-icon>
              </el-col>
            </el-row>
          </div>
        </template>
      </draggable>
      <!-- 九宫格样式 -->
      <!-- <draggable
        :list="currentProducts"
        id="content-draggable-box"
        class="product-select-lattice"
        :class="[`product-select-lattice-grid-hidden-${productRow}`]"
        :style="latticeStyle"
        @end="productDraggableEnd"
      >
        <template #item="{ element, index }">
          <div>
            <el-popover
              placement="bottom"
              trigger="manual"
              :width="250"
              :visible="selectProduct && selectProduct == element"
            >
              <template #reference>
                <div
                  class="product-select-lattice-item"
                  @click="productClick(element)"
                  :class="{
                    'product-select-lattice-item-active': selectProduct && selectProduct == element
                  }"
                >
                  <img v-if="element && element.id" :src="element.image" />
                </div>
              </template>
              <div>
                <el-form label-position="left" :inline="true" >
                  <el-form-item size="small" label="名称：">
                    <el-text truncated>{{ element.name }}</el-text>
                  </el-form-item>
                  <el-form-item size="small" label="链接：">
                    <el-input v-model="element.link" placeholder="请输入跳转链接" />
                  </el-form-item>
                </el-form>
                <el-button @click="refreshProduct(index)">替换</el-button>
                <el-button @click="deleteProduct(index)">删除</el-button>
              </div>
            </el-popover>
          </div>
        </template>
      </draggable> -->
    </div>
  </el-form-item>
</template>

<script lang="ts">
import { toRefs, reactive, watch } from 'vue'

import { useProductPicker } from '@/composable/product/useProductPicker'
import { pageDesignerProductPickerConfig } from '@/composable/product/pageDesignerProductPickerConfig'

import { useFilePicker } from '@/composable/files/lib/hooks'
import { pageDesignerFilePickerConfig } from '@/composable/files/pageDesignerFilePickerConfig'

const { open: openProduct } = useProductPicker(pageDesignerProductPickerConfig)
const { open: openFile } = useFilePicker(pageDesignerFilePickerConfig)

interface RadioItem {
  label: string
  id: string
}

interface State {
  label: string
  radioValue: string
  required: boolean
  radioList: RadioItem[]
  productRow: number
  productColumn: number
  currentPage: number
  pageList: any
  products: any
  currentProducts: any
  selectProduct: any
  latticeStyle: any
  showProductName: boolean
  showCustomRouteLinkInput: boolean
  showSelectImage: boolean
}

export default {
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    formData: {
      type: Object,
      default: () => {},
    },
    skus: {
      type: Object,
      default: () => {},
    },
  },
  setup(props: any, context: any) {
    const state: State = reactive({
      label: props.data?.label,
      required: false,
      radioValue: '',
      radioList: [],
      productRow: 0,
      productColumn: 0,
      latticeStyle: {},
      products: [],
      currentPage: 1,
      currentProducts: [],
      selectProduct: undefined,
      radioData: {
        data: {},
        formData: {},
      },
      showProductName: false,
      showCustomRouteLinkInput: false,
      showSelectImage: false,
    })

    const init = () => {
      if (!props.data) return
      resetControl()
      resetFormData()
    }

    const resetControl = () => {
      if (props.data.radio) {
        // radio 选项
        state.radioList = props.data.radio.list
        let radioDefaultValue = props.data.radio.defaultValue

        const findId = state.radioList.find((item: RadioItem) => {
          return item.id === radioDefaultValue
        })
        if (findId) {
          state.radioValue = findId.label
          adjustLattice(findId)
        }

        // 默认值
        state.showProductName = props.data.showProductName
        state.showCustomRouteLinkInput = props.data.showCustomRouteLinkInput
        state.showSelectImage = props.data.showSelectImage
      }
    }

    const resetFormData = () => {
      if (props?.formData[props.data.key]) {
        const FormData = props?.formData[props.data.key]

        if (!FormData) return
        const content = JSON.parse(FormData)

        // 商品显示
        if (content && content.skus) {
          const skus = content.skus || []
          const imageList = content.imageList || []
          let products: any = []
          skus.forEach((v: any) => {
            const p = props.skus[v.sku] || imageList.find((image: any) => image.sku == v.sku)
            if (p) {
              // 处理自定义属性
              products.push({
                ...p,
                customRouteLink: v.customRouteLink || '',
              })
            }
          })
          state.products = products
        }

        state.currentPage = content.formRenderPage || 1

        let radioDefaultValue = ''
        if (content.gridType) radioDefaultValue = content.gridType

        const findId = state.radioList.find((item: RadioItem) => {
          return item.id === radioDefaultValue
        })
        if (findId) {
          state.radioValue = findId.label
          adjustLattice(findId)
        }
      }
    }

    // 九宫格显示类型切换
    const radioChange = (e: string) => {
      const findId = state.radioList.find((item: RadioItem) => e === item.label)
      state.currentPage = 1
      if (findId) adjustLattice(findId)
      dataCallback()
    }

    // 添加商品
    const plusProduct = async () => {
      const plusProducts: any = await openProduct()
      const validProducts = state.products.filter((v: any) => !v.seat)
      state.products = [...validProducts, ...plusProducts]

      seatProduct()
      dataCallback()
    }

    // 替换商品
    const refreshProduct = async (index: number) => {
      const products: any = await openProduct()

      // 全部商品的开始与结束下标
      const { currentPage, productRow, productColumn } = state
      const startIndex = (currentPage - 1) * productRow * productColumn
      products[0].customRouteLink = state.products[startIndex + index].customRouteLink

      state.products.splice(startIndex + index, 1, ...products)

      seatProduct()
      dataCallback()
    }

    // 删除商品
    const deleteProduct = (index: number) => {
      const { currentPage, productRow, productColumn } = state
      const startIndex = (currentPage - 1) * productRow * productColumn

      state.products.splice(startIndex + index, 1)

      seatProduct()
      dataCallback()
    }

    // 选择图片
    const selectImage = async (index: number) => {
      const openParams: any = {
        accept: 'image/*',
        exts: ['.png', '.gif', '.jpeg', '.jpg', '.webp', '.bmp', '.svg', '.apng'],
      }

      let res: any = await openFile(openParams)
      if (res && res.length) {
        // 全部商品的开始与结束下标
        const { currentPage, productRow, productColumn } = state
        const startIndex = (currentPage - 1) * productRow * productColumn

        const customRouteLink = state.products[startIndex + index].customRouteLink

        state.products[startIndex + index] = {
          image: res[0].url,
          sku: `image${generateRandomAlphaNumeric(5)}`,
          customRouteLink,
          isImage: true,
        }
      }

      dataCallback()
    }

    const generateRandomAlphaNumeric = (length: number) => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let result = ''

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length)
        result += chars.charAt(randomIndex)
      }

      return result
    }

    const changeItemType = (item: any, index: number) => {
      if (item.image && item.isImage) {
        refreshProduct(index)
      } else if (item.sku) {
        selectImage(index)
      }
    }

    // 替换商品或图片
    const refreshItem = (item: any, index: number) => {
      if (item.image && item.isImage) {
        selectImage(index)
      } else if (item.sku) {
        refreshProduct(index)
      }
    }

    // 计算商品个数，增加占位
    const seatProduct = () => {
      const { products, productRow, productColumn } = state
      state.products = products.filter((v: any) => !v.seat)
      const curProdCount = state.products.length
      // 每页最大显示数量
      const pageProductCount = productRow * productColumn
      // 根据 行&列 计算一共多少页
      let pageCount = Math.ceil(curProdCount / pageProductCount) || 1
      // 当商品正好填充满一页时，增加一页空白
      let isBlank = curProdCount > 0 && curProdCount % (productRow * productColumn) == 0
      if (isBlank) pageCount += 1
      // 填充页码
      let pageList = []
      for (let i = 1; i <= pageCount; i++) {
        pageList.push({
          label: `第${i}页${isBlank && i == pageCount ? '(空)' : ''}`,
          value: i,
        })
      }

      state.pageList = pageList

      // 空缺商品增加占位
      if (curProdCount < pageCount * pageProductCount) {
        for (let i = 0; i < pageCount * pageProductCount - curProdCount; i++) {
          state.products.push({
            seat: true,
          })
        }
      }

      getCurrentProducts()
    }

    // 页数变化，切换当前显示的商品
    const currentPageChange = (e: number) => {
      const { productRow, productColumn, products } = state

      const startIndex = (e - 1) * productRow * productColumn
      state.currentPage = e
      state.currentProducts = products.slice(startIndex, startIndex + productRow * productColumn)

      dataCallback()
    }

    // 根据 页*行*列 获取当前显示的商品
    const getCurrentProducts = () => {
      // 当前页
      const page = state.currentPage
      // 当前页商品数量 行*列
      const pageProductCount = state.productRow * state.productColumn

      state.currentProducts = state.products.slice(
        (page - 1) * pageProductCount,
        (page - 1) * pageProductCount + pageProductCount,
      )
    }

    const productClick = (item: any) => {
      if (item && item.sku) {
        state.selectProduct = state.selectProduct && state.selectProduct == item ? {} : item
      } else {
        plusProduct()
      }
    }

    // 计算九宫格 grid 样式
    const adjustLattice = (radio: RadioItem) => {
      if (radio) {
        const [row, column] = radio.id.split('-')
        state.productRow = Number(row)
        state.productColumn = Number(column)
        state.latticeStyle.gridTemplateColumns = `repeat(${column}, 1fr)`
        state.latticeStyle.gridTemplateRows = `repeat(${row}, 1fr)`

        seatProduct()
      }
    }

    // 商品拖拽
    const productDraggableEnd = () => {
      // 全部商品的开始与结束下标
      const { currentPage, productRow, productColumn, currentProducts } = state
      const startIndex = (currentPage - 1) * productRow * productColumn

      state.products.splice(startIndex, productRow * productColumn, ...currentProducts)
      dataCallback()
    }

    // 数据传递
    const dataCallback = () => {
      const validProducts = state.products.filter((v: any) => !v.seat)
      const findId = state.radioList.find((item: RadioItem) => state.radioValue === item.label)
      const imageList = state.products.filter((v: any) => v.isImage)
      context.emit('callback', {
        type: 'product-select',
        key: props.data.key,
        value: JSON.stringify({
          skus: validProducts.map((v: any) => {
            return {
              sku: v.sku,
              customRouteLink: v.customRouteLink,
            }
          }),
          imageList,
          gridType: findId ? findId.id : '',
          formRenderPage: state.currentPage,
          $skus: {
            skuProducts: validProducts,
            skus: validProducts.map((v: any) => v.sku),
          },
        }),
      })
    }

    const customRouteLinkInput = () => {
      seatProduct()
      dataCallback()
    }

    watch(props, () => {
      init()
    })

    init()

    return {
      radioChange,
      currentPageChange,
      plusProduct,
      refreshProduct,
      deleteProduct,
      productClick,
      selectImage,
      refreshItem,
      changeItemType,
      productDraggableEnd,
      customRouteLinkInput,
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss">
.private-lattice-product-select {
  width: 100%;

  .private-lattice-product-select-style {
    display: flex;
    justify-content: space-between;

    .el-select {
      width: 100px;
    }
  }

  .select-product-item {
    padding: 5px 0;

    .select-item-container {
      white-space: nowrap;
    }
    .select-product-item-add,
    .select-product-item-image {
      display: inline-block;
      width: 70px;
      height: 70px;
      border-radius: 5px;
      border: 1px solid #f2f2f2;
      cursor: pointer;
      overflow: hidden;
      &:hover {
        border: 1px solid var(--el-color-primary);
      }
    }

    .el-icon-delete {
      cursor: pointer;
      &:hover {
        color: var(--el-color-primary);
      }
    }
  }

  // 九宫格样式
  // .product-select-lattice {
  //   width: 100%;
  //   display: grid;
  //   grid-gap: 6px;

  //   .product-select-lattice-item {
  //     position: relative;
  //     width: 100%;
  //     height: 0;
  //     padding-top: 100%;
  //     background-color: #eee;
  //     border-width: 1px;
  //     border-style: solid;
  //     border-color: transparent;

  //     &.product-select-lattice-item-active {
  //       border-color: rgb(64, 158, 255);
  //       box-sizing: border-box;
  //     }

  //     img,
  //     .product-select-lattice-item-mask {
  //       position: absolute;
  //       width: 100%;
  //       height: 100%;
  //       left: 0;
  //       top: 0;
  //     }

  //     .product-select-lattice-item-mask {
  //       display: none;
  //       flex-wrap: wrap;
  //       align-items: center;

  //       .el-icon {
  //         width: 50%;
  //         cursor: pointer;
  //         &:hover {
  //           color: rgb(64, 158, 255);
  //         }
  //       }
  //     }

  //     &:hover {
  //       .product-select-lattice-item-mask {
  //         display: flex;
  //         color: #fff;
  //         background-color: rgba(0, 0, 0, 0.7);
  //       }
  //     }
  //   }
  // }
}
</style>
