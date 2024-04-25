<template>
  <el-form-item size="small">
    <div class="public-product-list">
      <draggable
        :list="productList"
        @end="productDraggableEnd"
        item-key="product-draggable"
        handle=".handle"
      >
        <template #item="{ element: productItem, index: productIndex }">
          <el-row class="product-list-item">
            <el-col :span="6">
              <img class="product-list-item-image handle" :src="productItem.image" />
            </el-col>
            <el-col :span="14" class="product-list-item-info">
              <div>
                <div class="ellipsis">{{ productItem.sku }}</div>
                <div class="ellipsis product-list-item-info-name">{{ productItem.name }}</div>
              </div>
            </el-col>
            <el-col :span="4" class="product-list-item-operate">
              <el-button :icon="Edit" @click="refreshProduct(productIndex)" />
              <el-button :icon="Delete" @click="deleteProduct(productIndex)" />
            </el-col>
          </el-row>
        </template>
      </draggable>
      <el-row
        v-if="!isSingle || (isSingle && productList.length < 1)"
        style="width: 100%"
        :getter="10"
        align="middle"
      >
        <el-col :span="24">
          <div class="select-image-item-add p-t-15" @click="selectProduct()">
            <div class="flex c">
              <el-icon :size="20">
                <Plus />
              </el-icon>
            </div>

            <div class="tc m-t-5">选择商品</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-form-item>
</template>

<script lang="ts">
import { toRefs, reactive, watch, shallowRef } from 'vue'
import { Minus, Plus, Delete, Edit } from '@element-plus/icons-vue'

import { useProductPicker } from '@/composable/product/useProductPicker'
import { pageDesignerProductPickerConfig } from '@/composable/product/pageDesignerProductPickerConfig'

const { open } = useProductPicker(pageDesignerProductPickerConfig)

interface State {
  FormData: any
  productList: Array<object>
  isSingle: boolean
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
      FormData: {},
      productList: [],
      isSingle: false,
    })

    const init = () => {
      if (!props.data) return
      console.log('props.data: ', props.data)

      resetControl()
      resetFormData()
    }

    const resetControl = () => {
      state.isSingle = props.data.isSingle
    }

    const resetFormData = () => {
      if (props?.formData[props.data.key]) {
        const FormData = props?.formData[props.data.key]

        if (FormData) {
          const content = JSON.parse(FormData)

          // 商品显示
          if (content && content.skus) {
            const skus = content.skus
            let products: any = []
            skus.forEach((v: any) => {
              const p = props.skus[v.sku]
              if (p) {
                products.push(p)
              }
            })
            state.productList = products
          }
        }
      }
    }

    const selectProduct = async () => {
      const { productList } = state
      const plusProducts: any = await open({
        multiple: !state.isSingle,
      })
      state.productList = [...productList, ...plusProducts]

      dataCallback()
    }

    // 替换商品
    const refreshProduct = async (index: number) => {
      let res: any = await open({
        multiple: !state.isSingle,
      })

      state.productList.splice(index, 1, ...res)

      dataCallback()
    }

    // 删除商品
    const deleteProduct = (index: number) => {
      state.productList.splice(index, 1)

      dataCallback()
    }

    const productDraggableEnd = () => {
      dataCallback()
    }

    const dataCallback = () => {
      const { productList } = state
      context.emit('callback', {
        type: 'product-list',
        key: props.data.key,
        value: JSON.stringify({
          skus: productList.map((v: any) => {
            return {
              sku: v.sku,
            }
          }),
          $skus: {
            skuProducts: productList,
            skus: productList.map((v: any) => v.sku),
          },
        }),
      })
    }

    init()

    return {
      selectProduct,
      deleteProduct,
      refreshProduct,
      productDraggableEnd,
      Minus: shallowRef(Minus),
      Plus: shallowRef(Plus),
      Delete: shallowRef(Delete),
      Edit: shallowRef(Edit),
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss">
.public-product-list {
  width: 100%;

  .product-list-item {
    border: 1px solid transparent;
    box-sizing: border-box;

    &:hover {
      border: 1px solid var(--el-color-primary);
    }
  }
  .product-list-item-image {
    width: 70px;
    height: 70px;
  }

  .product-list-item-info {
    line-height: normal;
    display: flex;
    align-items: center;

    > div {
      width: 100%;
    }

    .product-list-item-info-name {
      padding-top: 10px;
    }
  }

  .product-list-item-operate {
    display: flex;
    align-items: center;
    justify-content: right;
    flex-wrap: wrap;
  }

  .select-image-item-add {
    width: 100%;
    height: 70px;
    margin-top: 10px;
    border: 1px solid #f2f2f2;
    cursor: pointer;
    overflow: hidden;
    &:hover {
      border: 1px solid var(--el-color-primary);
    }
  }

  .el-color-picker__trigger {
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }
}
</style>
