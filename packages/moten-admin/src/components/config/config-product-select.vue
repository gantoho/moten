<template>
  <div class="public-product-select-render">
    <draggable
      :list="productList"
      @end="productDraggableEnd"
      item-key="product-select-group"
      handle=".handle"
    >
      <template #item="{ element: productItem, index: productIndex }">
        <el-row :key="productItem.sku" class="product-list-item m-b-10">
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

    <el-row v-if="productList.length < maxProduct" style="width: 100%" :getter="10" align="middle">
      <el-col :span="24">
        <div class="select-image-item-add p-t-15" @click="selectProduct()">
          <div class="flex c">
            <el-icon :size="20">
              <Plus />
            </el-icon>
          </div>

          <div class="tc m-t-5 fz-12">选择商品</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { shallowRef } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { clone } from 'lodash'
import { useProductPicker } from '@/composable/product/useProductPicker'
import { pageDesignerProductPickerConfig } from '@/composable/product/pageDesignerProductPickerConfig'

const { open } = useProductPicker(pageDesignerProductPickerConfig)

export default {
  props: {
    productList: {
      type: Array,
      default: () => [],
    },
    maxProduct: {
      type: Number,
      default: 99999999,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    callback: {
      type: Function,
      default: () => {},
    },
  },
  components: {},
  setup(props: any) {
    const productDraggableEnd = () => {
      props.callback({
        type: 'change',
        product: props.productList,
      })
    }

    const refreshProduct = async (index: number) => {
      const res: any = await open({
        multiple: false,
      })

      if (res) {
        const p = clone(props.productList)
        p.splice(index, 1, res[0])

        props.callback({
          type: 'change',
          product: p,
        })
      }
    }

    const deleteProduct = (index: number) => {
      const product = clone(props.productList).filter(
        (item: any, filterIndex: number) => filterIndex !== index,
      )
      props.callback({
        type: 'delete',
        product: product,
      })
    }

    const selectProduct = async () => {
      const productInfo = await open({
        multiple: props.multiple,
        max: props.maxProduct,
      })
      if (productInfo) {
        props.callback({
          type: 'add',
          product: productInfo,
        })
      }
    }

    return {
      productDraggableEnd,
      selectProduct,
      refreshProduct,
      deleteProduct,
      Delete: shallowRef(Delete),
      Edit: shallowRef(Edit),
    }
  },
}
</script>

<style lang="scss">
.public-product-select-render {
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
