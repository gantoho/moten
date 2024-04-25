<template>
  <el-form-item size="small" :label="label" :required="required">
    <div class="public-image-list">
      <el-collapse accordion v-if="imageList.length">
        <draggable :list="imageList" @end="imageDraggableEnd" item-key="product-draggable">
          <template #item="{ element, index }">
            <el-collapse-item :name="index">
              <template #title>
                <img class="image-list-item-image" :src="element.url" />
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

              <!-- ==================跳转链接======================= -->

              <!-- ==================广告位置======================= -->
              <el-form-item size="small" label="广告位置（行）">
                <div class="m-b-10">
                  <el-input-number v-model="element.row" :min="1" @change="positionChange" />
                </div>
              </el-form-item>
              <el-form-item size="small" label="广告位置（列）">
                <div class="m-b-10">
                  <el-input-number v-model="element.column" :min="1" @change="positionChange" />
                </div>
              </el-form-item>
              <!-- ==================广告位置======================= -->
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
  imageList: Array<object>
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
          state.imageList = content
        }
      }
    }

    const selectImage = async () => {
      const { imageList } = state
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
      const curImage: any = state.imageList[index]
      res[0].link = curImage.link
      res[0].row = curImage.row
      res[0].column = curImage.column

      state.imageList.splice(index, 1, ...res)

      dataCallback()
    }

    // 删除图片
    const deleteImage = (index: number) => {
      state.imageList.splice(index, 1)

      dataCallback()
    }

    const linkChange = () => {
      dataCallback()
    }

    const positionChange = () => {
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
      positionChange,
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
