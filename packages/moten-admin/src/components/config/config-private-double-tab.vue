<template>
  <el-form-item size="small">
    <div class="private-double-tab">
      <el-collapse accordion v-if="tabList.length">
        <draggable
          :list="tabList"
          @end="dataCallback"
          item-key="product-draggable"
          handle=".handle"
        >
          <template #item="{ element: tabItem, index: tabIndex }">
            <el-collapse-item>
              <template #title>
                <div class="p-r-10">
                  <el-icon :size="16" style="vertical-align: middle" class="handle">
                    <Rank />
                  </el-icon>
                </div>
                <div>
                  <el-input
                    class="title-input"
                    v-model="tabItem.title"
                    @input="dataCallback"
                    placeholder="请输入分类名称"
                    @click.stop=""
                  />
                </div>
                <div>
                  <el-input
                    class="title-input m-l-5"
                    v-model="tabItem.titleEN"
                    @input="dataCallback"
                    placeholder="分类名称英文(神策) 自定义element_name"
                    @click.stop=""
                  />
                </div>
              </template>

              <div class="tab-block-container">
                <el-collapse accordion v-if="tabItem.blockList">
                  <el-collapse-item
                    :title="blockIndex + 1"
                    v-for="(blockItem, blockIndex) in tabItem.blockList"
                    :key="blockIndex"
                  >
                    <el-row class="tr">
                      <el-col>
                        <el-button-group>
                          <el-button :icon="Delete" @click="deleteTabBlock(tabIndex, blockIndex)" />
                        </el-button-group>
                      </el-col>
                    </el-row>
                    <!-- ================================图片选择================================= -->
                    <el-form-item size="small" label="图片设置" class="m-t-20">
                      <el-row style="width: 100%" :getter="10" align="middle">
                        <el-col :span="24">
                          <div v-if="blockItem.image">
                            <el-collapse accordion>
                              <el-collapse-item class="category-item-image-collapse">
                                <template #title>
                                  <div class="category-item-image">
                                    <img :src="blockItem.image.url" />
                                  </div>
                                </template>
                                <el-row style="text-align: right">
                                  <el-col>
                                    <el-button-group>
                                      <el-button
                                        :icon="Edit"
                                        @click="selectImage(tabIndex, blockIndex)"
                                      />
                                      <el-button
                                        :icon="Delete"
                                        @click="deleteImage(tabIndex, blockIndex)"
                                      />
                                    </el-button-group>
                                  </el-col>
                                </el-row>
                                <el-form-item size="small" label="跳转链接">
                                  <div class="m-b-10">
                                    <el-input
                                      v-model="blockItem.image.link"
                                      @input="dataCallback"
                                    />
                                  </div>
                                </el-form-item>
                                <el-form-item size="small" label="请填写图片英文(神策)">
                                  <div class="m-b-10">
                                    <el-input
                                      placeholder="自定义element_name"
                                      v-model="blockItem.image.textSensors"
                                      @input="dataCallback"
                                    />
                                  </div>
                                </el-form-item>
                                <el-form-item size="small" label="图片上边距">
                                  <el-slider
                                    class="m-l-15"
                                    v-model="blockItem.imagePaddingTop"
                                    show-input
                                    @change="dataCallback"
                                  />
                                </el-form-item>
                                <el-form-item size="small" label="图片下边距">
                                  <el-slider
                                    class="m-l-15"
                                    v-model="blockItem.imagePaddingBottom"
                                    show-input
                                    @change="dataCallback"
                                  />
                                </el-form-item>
                              </el-collapse-item>
                            </el-collapse>
                          </div>
                          <div
                            v-else
                            class="plus-add p-t-15"
                            @click="selectImage(tabIndex, blockIndex)"
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
                          :list="blockItem.productList"
                          @end="productDraggableEnd"
                          item-key="product-draggable"
                          handle=".handle"
                        >
                          <template #item="{ element: productItem, index: productIndex }">
                            <el-row class="product-list-item">
                              <el-col :span="6">
                                <img
                                  class="product-list-item-image handle"
                                  :src="productItem.image"
                                />
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
                                  @click="refreshProduct(tabIndex, blockIndex, productIndex)"
                                />
                                <el-button
                                  :icon="Delete"
                                  @click="deleteProduct(tabIndex, blockIndex, productIndex)"
                                />
                              </el-col>
                            </el-row>
                          </template>
                        </draggable>
                        <el-row style="width: 100%" :getter="10" align="middle">
                          <el-col :span="24">
                            <div
                              class="plus-add p-t-15"
                              @click="selectProduct(tabIndex, blockIndex)"
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

                    <el-form-item size="small" label="是否显示按钮">
                      <el-switch v-model="blockItem.showButton" @change="dataCallback" />
                    </el-form-item>
                    <div v-if="blockItem.showButton">
                      <el-form-item size="small" label="按钮文案(20px)">
                        <el-input
                          class="title-input"
                          v-model="blockItem.buttonText"
                          @input="dataCallback"
                          placeholder="请输入按钮文案"
                          @click.stop=""
                        />
                      </el-form-item>
                      <el-form-item size="small" label="按钮英文(神策)">
                        <el-input
                          class="title-input"
                          v-model="blockItem.buttonTextEN"
                          @input="dataCallback"
                          placeholder="自定义element_name"
                          @click.stop=""
                        />
                      </el-form-item>
                      <el-form-item size="small" label="按钮跳转链接">
                        <el-input
                          class="title-input"
                          v-model="blockItem.buttonLink"
                          @input="dataCallback"
                          placeholder="请输入按钮跳转链接"
                          @click.stop=""
                        />
                      </el-form-item>
                    </div>
                  </el-collapse-item>
                </el-collapse>

                <div class="plus-add plus-add-block p-t-15" @click="plusTabBlock(tabIndex)">
                  <div class="flex c">
                    <el-icon :size="20">
                      <Plus />
                    </el-icon>
                  </div>

                  <div class="tc m-t-5">增加模块</div>
                </div>
              </div>
            </el-collapse-item>
          </template>
        </draggable>
      </el-collapse>
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

interface tabBlock {
  title?: string
  image?: {
    url: string
    link: string
  }
  productList?: Array<object>
  showButton?: boolean
  buttonText?: string
  buttonLink?: string
  imagePaddingTop?: number
  imagePaddingBottom?: number
}

interface tab {
  blockList: Array<tabBlock>
}

interface State {
  tabList: Array<tab>
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
      tabList: [
        {
          blockList: [],
        },
        {
          blockList: [],
        },
      ],
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
          const tabList = content.tabList

          // 获取商品信息
          tabList.forEach((v: any) => {
            v.blockList?.forEach((b: any) => {
              b.productList = []
              b.skus?.forEach((s: any) => {
                const p = props.skus[s]
                if (p) {
                  b.productList.push({
                    ...p,
                  })
                }
              })
            })
          })

          state.tabList = tabList
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

    // 增加分类block
    const plusTabBlock = (tabIndex: number) => {
      state.tabList[tabIndex].blockList?.push({
        buttonText: '查看更多',
        imagePaddingTop: 15,
        imagePaddingBottom: 40,
      })
    }

    // 删除分类block
    const deleteTabBlock = (tabIndex: number, blockIndex: number) => {
      state.tabList[tabIndex].blockList.splice(blockIndex, 1)
      dataCallback()
    }

    // 选择图片
    const selectImage = async (tabIndex: number, blockIndex: number) => {
      const openParams: any = {
        accept: 'image/*',
        exts: ['.png', '.gif', '.jpeg', '.jpg', '.webp', '.bmp', '.svg', '.apng'],
      }

      let res: any = await openFile(openParams)
      if (res && res.length) {
        const curImage = state.tabList[tabIndex].blockList[blockIndex].image
        res[0].link = curImage?.link

        state.tabList[tabIndex].blockList[blockIndex].image = res[0]
      }

      dataCallback()
    }

    // 删除图片
    const deleteImage = (tabIndex: number, blockIndex: number) => {
      state.tabList[tabIndex].blockList[blockIndex].image = undefined
      dataCallback()
    }

    // 选择商品
    const selectProduct = async (tabIndex: number, blockIndex: number) => {
      const { tabList } = state
      const categoryProductList: any = tabList[tabIndex].blockList[blockIndex].productList || []
      const plusProducts: any = await openProduct()
      tabList[tabIndex].blockList[blockIndex].productList = [
        ...categoryProductList,
        ...plusProducts,
      ]

      dataCallback()
    }

    // 替换商品
    const refreshProduct = async (tabIndex: number, blockIndex: number, productIndex: number) => {
      const res: any = await openProduct()
      state.tabList[tabIndex].blockList[blockIndex].productList?.splice(productIndex, 1, ...res)

      dataCallback()
    }

    // 删除商品
    const deleteProduct = (tabIndex: number, blockIndex: number, productIndex: number) => {
      state.tabList[tabIndex].blockList[blockIndex].productList?.splice(productIndex, 1)

      dataCallback()
    }

    const dataCallback = () => {
      let tabList = JSON.parse(JSON.stringify(state.tabList))
      console.log('tabList1: ', tabList)

      const skus: any = []
      const products: any = []
      // 获取sku
      for (let i = 0; i < tabList.length; i++) {
        const tabData = tabList[i]
        if (!tabData.blockList || !tabData.blockList.length) continue
        for (let j = 0; j < tabData.blockList.length; j++) {
          const blockData = tabData.blockList[j]

          if (!blockData.productList || !blockData.productList.length) continue

          blockData.skus = blockData.productList?.map((p: any) => p.sku)

          skus.push(...blockData.skus)
          products.push(...blockData.productList)
          delete blockData.productList
        }
      }

      context.emit('callback', {
        type: 'product-double-tab',
        key: props.data.key,
        value: JSON.stringify({
          tabList,
          $skus: {
            skuProducts: products,
            skus,
          },
        }),
      })
    }

    init()

    return {
      titleInput,
      categoryDraggableEnd,
      dataCallback,
      productDraggableEnd,
      selectImage,
      deleteImage,
      selectProduct,
      refreshProduct,
      deleteProduct,
      plusTabBlock,
      deleteTabBlock,
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
.private-double-tab {
  width: 100%;

  .title-input {
    width: 150px;
  }

  .tab-block-container {
    padding: 20px;
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
  .plus-add {
    width: 100%;
    height: 70px;
    margin-top: 10px;
    border: 1px solid #f2f2f2;
    cursor: pointer;
    overflow: hidden;
    &:hover {
      border: 1px solid var(--el-color-primary);
    }

    &.plus-add-block {
      height: auto;
    }
  }
}
</style>
