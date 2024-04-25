<template>
  <el-form-item size="small">
    <div class="private-navigation">
      <el-collapse accordion v-if="categoryList.length">
        <draggable
          :list="categoryList"
          @end="categoryDraggableEnd"
          item-key="product-draggable"
          handle=".handle"
        >
          <template #item="{ element, index: categoryIndex }">
            <el-collapse-item :name="categoryIndex">
              <template #title>
                <div class="p-r-10">
                  <el-icon :size="16" style="vertical-align: middle" class="handle">
                    <Rank />
                  </el-icon>
                </div>
                <div>
                  <el-input
                    class="title-input"
                    v-model="element.title"
                    @input="titleInput"
                    placeholder="请输入分类名称"
                    @click.stop=""
                  />
                </div>
                <div>
                  <el-input
                    class="title-input m-l-5"
                    v-model="element.titleEN"
                    @input="titleInput"
                    placeholder="分类名英文(神策) 自定义element_name"
                  />
                </div>
              </template>

              <el-row class="category-item-operate">
                <el-col>
                  <el-button-group>
                    <el-button :icon="Delete" @click="deleteCategory(categoryIndex)" />
                  </el-button-group>
                </el-col>
              </el-row>

              <el-form-item size="small" label="是否显示标题">
                <el-switch v-model="element.showTitle" @change="dataCallback" />
              </el-form-item>
              <div v-if="element.showTitle">
                <el-form-item size="small" label="标题与图片样式">
                  <el-radio-group v-model="element.titleMode" @change="dataCallback">
                    <el-radio-button label="主题一" />
                    <el-radio-button label="主题二" />
                  </el-radio-group>
                </el-form-item>
                <el-form-item size="small" label="标题上边距">
                  <el-slider
                    class="m-l-15"
                    v-model="element.titlePaddingTop"
                    show-input
                    @change="dataCallback"
                  />
                </el-form-item>
                <el-form-item size="small" label="标题下边距">
                  <el-slider
                    class="m-l-15"
                    v-model="element.titlePaddingBottom"
                    show-input
                    @change="dataCallback"
                  />
                </el-form-item>
              </div>
              <el-form-item size="small" label="图片设置" class="m-t-20">
                <el-row style="width: 100%" :getter="10" align="middle">
                  <el-col :span="24">
                    <div v-if="element.image">
                      <el-collapse accordion>
                        <el-collapse-item
                          :name="categoryIndex"
                          class="category-item-image-collapse"
                        >
                          <template #title>
                            <div class="category-item-image">
                              <img :src="element.image.url" />
                            </div>
                          </template>
                          <el-row style="text-align: right">
                            <el-col>
                              <el-button-group>
                                <el-button :icon="Edit" @click="selectImage(categoryIndex)" />
                                <el-button :icon="Delete" @click="deleteImage(categoryIndex)" />
                              </el-button-group>
                            </el-col>
                          </el-row>
                          <el-form-item size="small" label="跳转链接">
                            <div class="m-b-10">
                              <el-input v-model="element.image.link" @input="dataCallback" />
                            </div>
                          </el-form-item>

                          <el-form-item size="small" label="图片英文(神策)">
                            <div class="m-b-10">
                              <el-input
                                placeholder="自定义element_name"
                                v-model="element.image.textSensors"
                                @input="dataCallback"
                              />
                            </div>
                          </el-form-item>
                          <el-form-item size="small" label="图片上边距">
                            <el-slider
                              class="m-l-15"
                              v-model="element.imagePaddingTop"
                              show-input
                              @change="dataCallback"
                            />
                          </el-form-item>
                          <el-form-item size="small" label="图片下边距">
                            <el-slider
                              class="m-l-15"
                              v-model="element.imagePaddingBottom"
                              show-input
                              @change="dataCallback"
                            />
                          </el-form-item>
                        </el-collapse-item>
                      </el-collapse>
                    </div>
                    <div
                      v-else
                      class="select-image-item-add p-t-15"
                      @click="selectImage(categoryIndex)"
                    >
                      <div class="flex c">
                        <el-icon :size="20">
                          <Plus />
                        </el-icon>
                      </div>

                      <div class="tc m-t-5">选择图片</div>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>

              <!-- ================================商品选择================================= -->
              <el-form-item size="small" label="商品配置" class="m-t-20">
                <div class="public-product-list">
                  <draggable
                    :list="element.productList"
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
                            <div class="ellipsis product-list-item-info-name">
                              {{ productItem.name }}
                            </div>
                          </div>
                        </el-col>
                        <el-col :span="4" class="product-list-item-operate">
                          <el-button
                            :icon="Edit"
                            @click="refreshProduct(categoryIndex, productIndex)"
                          />
                          <el-button
                            :icon="Delete"
                            @click="deleteProduct(categoryIndex, productIndex)"
                          />
                        </el-col>
                      </el-row>
                    </template>
                  </draggable>
                  <el-row style="width: 100%" :getter="10" align="middle">
                    <el-col :span="24">
                      <div
                        class="select-image-item-add p-t-15"
                        @click="selectProduct(categoryIndex)"
                      >
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
            </el-collapse-item>
          </template>
        </draggable>
      </el-collapse>

      <div class="select-category-item-add p-t-15" @click="plusNullCategory">
        <div class="flex c">
          <el-icon :size="20">
            <Plus />
          </el-icon>
        </div>

        <div class="tc m-t-5">增加导航栏分类</div>
      </div>
    </div>
  </el-form-item>
</template>

<script lang="ts">
import { toRefs, reactive, watch, shallowRef } from 'vue'
import { Minus, Plus, Delete, Edit, Rank } from '@element-plus/icons-vue'

import { useProductPicker } from '@/composable/product/useProductPicker'
import { pageDesignerProductPickerConfig } from '@/composable/product/pageDesignerProductPickerConfig'

import { useFilePicker } from '@/composable/files/lib/hooks'
import { pageDesignerFilePickerConfig } from '@/composable/files/pageDesignerFilePickerConfig'

const { open: openProduct } = useProductPicker(pageDesignerProductPickerConfig)
const { open: openFile } = useFilePicker(pageDesignerFilePickerConfig)

interface category {
  title?: string
  showTitle?: boolean
  titleMode?: string
  titlePaddingTop?: number
  titlePaddingBottom?: number
  imagePaddingTop?: number
  imagePaddingBottom?: number
  image?: {
    url: string
    link: string
  }
  productList?: Array<object>
  skus?: Array<object>
}

interface State {
  categoryList: Array<category>
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
      categoryList: [],
    })

    const init = () => {
      if (!props.data) return

      resetFormData()
    }

    const resetFormData = () => {
      if (props?.formData[props.data.key]) {
        const FormData = props?.formData[props.data.key]

        if (FormData) {
          const content = JSON.parse(FormData)
          const categoryList = content.categoryList

          // 获取商品信息
          categoryList.forEach((v: any) => {
            v.productList = []
            v.skus?.forEach((s: any) => {
              const p = props.skus[s]
              if (p) {
                v.productList.push({
                  ...p,
                })
              }
            })
          })

          state.categoryList = categoryList
        }
      }
    }

    const titleInput = () => {
      dataCallback()
    }

    const categoryDraggableEnd = () => {
      dataCallback()
    }

    const productDraggableEnd = () => {
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
        const curImage = state.categoryList[index].image
        res[0].link = curImage?.link
        state.categoryList[index].image = res[0]
      }

      dataCallback()
    }

    // 删除图片
    const deleteImage = (index: number) => {
      state.categoryList[index].image = undefined
      dataCallback()
    }

    // 选择商品
    const selectProduct = async (categoryIndex: number) => {
      const { categoryList } = state
      const categoryProductList: any = categoryList[categoryIndex].productList || []
      const plusProducts: any = await openProduct()
      state.categoryList[categoryIndex].productList = [...categoryProductList, ...plusProducts]

      dataCallback()
    }

    // 替换商品
    const refreshProduct = async (categoryIndex: number, productIndex: number) => {
      const res: any = await openProduct()
      state.categoryList[categoryIndex].productList?.splice(productIndex, 1, ...res)

      dataCallback()
    }

    // 删除商品
    const deleteProduct = (categoryIndex: number, productIndex: number) => {
      state.categoryList[categoryIndex].productList?.splice(productIndex, 1)

      dataCallback()
    }

    // 增加空的分类配置
    const plusNullCategory = () => {
      state.categoryList.push({
        titleMode: '主题一',
        titlePaddingTop: 0,
        titlePaddingBottom: 30,
        imagePaddingTop: 0,
        imagePaddingBottom: 20,
      })
    }

    // 删除分类
    const deleteCategory = (index: number) => {
      state.categoryList.splice(index, 1)

      dataCallback()
    }

    const dataCallback = () => {
      let categoryList = JSON.parse(JSON.stringify(state.categoryList))

      categoryList = categoryList.filter((v: any) => v.title != '')

      const skus: any = []
      const products: any = []
      // 获取sku
      categoryList.forEach((v: any) => {
        v.skus = v.productList?.map((p: any) => p.sku)

        if (v.skus) skus.push(...v.skus)
        if (v.productList) products.push(...v.productList)
        delete v.productList
      })

      context.emit('callback', {
        type: 'product-navigation',
        key: props.data.key,
        value: JSON.stringify({
          categoryList,
          $skus: {
            skuProducts: products,
            skus,
          },
        }),
      })
    }

    init()

    return {
      plusNullCategory,
      deleteCategory,
      titleInput,
      categoryDraggableEnd,
      dataCallback,
      productDraggableEnd,
      selectImage,
      deleteImage,
      selectProduct,
      refreshProduct,
      deleteProduct,
      Minus: shallowRef(Minus),
      Plus: shallowRef(Plus),
      Delete: shallowRef(Delete),
      Edit: shallowRef(Edit),
      Rank: shallowRef(Rank),
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss">
.private-navigation {
  width: 100%;

  .title-input {
    width: 150px;
  }

  .category-item-operate {
    text-align: right;
  }

  .title-config-area {
    width: 60%;
    padding: 5px 10px;
    background-color: #f2f2f2;
  }

  .category-item-image-collapse {
    .el-collapse-item__header {
      height: 70px;
    }
  }

  .category-item-image {
    display: flex;
    align-items: center;
    width: 70px;
    height: 70px;
    overflow: hidden;

    img {
      width: 70px;
    }
  }
  .select-image-item-add,
  .select-category-item-add {
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
}
</style>
