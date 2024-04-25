<template>
  <el-form-item size="small" :label="label" :required="required">
    <div class="public-image-list">
      <el-collapse accordion v-if="imageList.length">
        <draggable
          :list="imageList"
          @end="imageDraggableEnd"
          item-key="product-draggable"
          handle=".handle"
        >
          <template #item="{ element, index }">
            <el-collapse-item :name="index">
              <template #title>
                <img class="image-list-item-image handle" :src="element.url" />
              </template>
              <el-row class="image-list-item-operate">
                <el-col>
                  <el-button-group>
                    <el-button :icon="Edit" @click="refreshImage(index)" />
                    <el-button :icon="Delete" @click="deleteImage(index)" />
                  </el-button-group>
                </el-col>
              </el-row>
              <!-- ==================跳转链接======================= -->
              <el-form-item size="small" label="跳转链接">
                <div class="m-b-10">
                  <el-input v-model="element.link" @input="linkChange" />
                </div>
              </el-form-item>

              <el-form-item size="small" label="图片英文名(神策)">
                <div class="m-b-10">
                  <el-input
                    placeholder="自定义element_name"
                    v-model="element.textSensors"
                    @input="linkChange"
                  />
                </div>
              </el-form-item>

              <!-- ==================跳转链接======================= -->

              <!-- ==================文字内容======================= -->
              <el-form-item size="small" label="文字内容">
                <div
                  class="m-b-10"
                  v-for="(textItem, textIndex) in element.textList"
                  :key="textIndex"
                >
                  <el-row :gutter="10">
                    <el-col :span="24">
                      <el-input
                        @input="
                          (e) => {
                            textInputChange(e, element, textIndex)
                          }
                        "
                        :model-value="textItem"
                        placeholder="请输入内容"
                      />

                      <el-button-group>
                        <el-button
                          v-if="element.textList.length > 1"
                          :icon="Minus"
                          @click="
                            addAndRemoveText({ type: 'remove', item: element, index: textIndex })
                          "
                        />
                        <el-button
                          v-if="textIndex === element.textList.length - 1"
                          :icon="Plus"
                          @click="addAndRemoveText({ type: 'add', item: element })"
                        />
                      </el-button-group>
                    </el-col>
                  </el-row>
                </div>
              </el-form-item>
              <!-- ==================文字内容======================= -->

              <!-- ==================文字字号======================= -->
              <el-form-item size="small" label="文字字号">
                <div class="m-b-10">
                  <el-select
                    v-model="element.textSize"
                    placeholder="请选择"
                    @change="textSizeChange"
                  >
                    <el-option
                      v-for="(textSizeItem, textSizeIndex) in textSizeList"
                      :key="textSizeIndex"
                      :label="textSizeItem.label"
                      :value="textSizeItem.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
              <!-- ==================文字字号======================= -->

              <!-- ==================文字行高======================= -->
              <el-form-item size="small" label="文字行高">
                <div class="m-b-10">
                  <el-select
                    v-model="element.textLineHeight"
                    placeholder="请选择"
                    @change="textLineHeightChange"
                  >
                    <el-option
                      v-for="(textLineHeightItem, textLineHeightIndex) in textLineHeightList"
                      :key="textLineHeightIndex"
                      :label="textLineHeightItem.label"
                      :value="textLineHeightItem.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
              <!-- ==================文字字号======================= -->

              <!-- ==================文字位置======================= -->
              <el-form-item size="small" label="文字位置">
                <div class="m-b-10">
                  <el-select
                    v-model="element.textPosition"
                    placeholder="请选择"
                    @change="textPositionChange"
                  >
                    <el-option
                      v-for="(tpItem, tpIndex) in textPosition"
                      :key="tpIndex"
                      :label="tpItem.label"
                      :value="tpItem.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>

              <!-- ==================文字位置======================= -->

              <!-- ==================文字颜色======================= -->
              <el-form-item size="small" label="文字颜色">
                <el-row class="m-b-10" :getter="10">
                  <el-col :span="24">
                    <el-input v-model="element.textColor" disabled />
                    <el-color-picker v-model="element.textColor" @change="textColorChange" />
                  </el-col>
                </el-row>
              </el-form-item>
              <!-- ==================文字颜色======================= -->
            </el-collapse-item>
          </template>
        </draggable>
      </el-collapse>
      <el-row style="width: 100%" :getter="10" align="middle">
        <el-col :span="24">
          <div class="select-image-item-add p-t-15" @click="selectImage()">
            <div class="flex c">
              <el-icon :size="20">
                <Plus />
              </el-icon>
            </div>

            <div class="tc m-t-5">选择图片</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-form-item>
</template>

<script lang="ts">
import { toRefs, reactive, watch, shallowRef } from 'vue'
import { useFilePicker } from '@/composable/files/lib/hooks'
import { Minus, Plus, Delete, Edit } from '@element-plus/icons-vue'
import { pageDesignerFilePickerConfig } from '@/composable/files/pageDesignerFilePickerConfig'
//
const { open } = useFilePicker(pageDesignerFilePickerConfig)

interface State {
  imageList: Array<any>
  textPosition: Array<object>
  defaultConfig: {
    size: number
    color: string
    position: string
    textLineHeight: number
  }
  textSizeList: Array<object>
  textLineHeightList: Array<object>
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
  },
  setup(props: any, context: any) {
    const state: State = reactive({
      imageList: [],
      textPosition: [],
      textSizeList: [],
      textLineHeightList: [],
      defaultConfig: {},
    })

    const init = () => {
      if (props.data) {
        const control = props.data
        state.textPosition = control.textPosition
        state.textSizeList = control.textSizeList
        state.textLineHeightList = control.textLineHeightList

        state.defaultConfig = {
          size: control.textSizeDefault,
          color: control.textColorDefault,
          position: control.textPositionDefault,
          textLineHeight: control.textLineHeightDefault,
        }

        if (props.formData && props.formData.imageListContent) {
          const content = JSON.parse(props.formData.imageListContent)

          state.imageList = content
        }
      }
    }

    const selectImage = async () => {
      const { imageList, defaultConfig } = state
      const openParams: any = {
        accept: 'image/*',
        exts: ['.png', '.gif', '.jpeg', '.jpg', '.webp', '.bmp', '.svg', '.apng'],
      }

      let res: any = await open(openParams)
      res = res.map((v: any) => {
        return {
          url: v.url,
          width: v.width,
          height: v.height,
          textList: [''],
          textColor: defaultConfig.color,
          textSize: defaultConfig.size,
          textPosition: defaultConfig.position,
          textLineHeight: defaultConfig.textLineHeight,
        }
      })
      state.imageList = [...imageList, ...res]

      dataCallback()
    }

    // 替换图片
    const refreshImage = async (index: number) => {
      const openParams: any = {
        accept: 'image/*',
        exts: ['.png', '.gif', '.jpeg', '.jpg', '.webp', '.bmp', '.svg', '.apng'],
      }
      let res: any = await open(openParams)

      state.imageList[index].url = res[0].url
      state.imageList[index].width = res[0].width
      state.imageList[index].height = res[0].height

      dataCallback()
    }

    // 删除图片
    const deleteImage = (index: number) => {
      state.imageList.splice(index, 1)

      dataCallback()
    }

    const addAndRemoveText = (options: { type: string; item: any; index?: number }) => {
      console.log('options: ', options)
      if (options.type === 'remove') {
        options.item.textList.splice(options.index, 1)
      } else if (options.type === 'add') {
        options.item.textList.push('')
      }

      if (options.item.length === 0) {
        options.item.push('')
      }

      dataCallback()
    }

    const textInputChange = (e: any, item: any, index: number) => {
      item.textList[index] = e
      dataCallback()
    }

    // 文字位置变化
    const textPositionChange = () => {
      dataCallback()
    }

    const textColorChange = () => {
      dataCallback()
    }

    const textSizeChange = () => {
      dataCallback()
    }

    const textLineHeightChange = () => {
      dataCallback()
    }

    const linkChange = () => {
      dataCallback()
    }

    const imageDraggableEnd = () => {
      dataCallback()
    }

    const dataCallback = () => {
      context.emit('callback', {
        type: 'image-list',
        key: props.data.key,
        value: JSON.stringify(state.imageList),
      })
    }

    init()

    return {
      selectImage,
      deleteImage,
      refreshImage,
      linkChange,
      addAndRemoveText,
      textInputChange,
      textPositionChange,
      textColorChange,
      textSizeChange,
      textLineHeightChange,
      imageDraggableEnd,
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
.public-image-list {
  width: 100%;

  .el-input,
  .el-select {
    width: 200px;
  }

  .el-collapse-item__header {
    height: auto;
  }

  .el-form-item__content {
    display: block;
  }

  .image-list-item-image {
    width: 70px;
    height: 70px;
  }

  .image-list-item-operate {
    text-align: right;
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
