<template>
  <el-form-item size="small" :label="label" :required="required" :error="errorMessage">
    <div class="p-h-10 p-v-10 file-upload-box">
      <el-row>
        <el-col :span="6">
          <div v-if="value" @click="onFilePick" class="add-file h-p-100">
            <div v-if="isVideo(value)" class="video_box h-p-100">
              <div class="flex c icon">
                <div v-if="value && value.lastIndexOf('.')">
                  {{ value.slice(value.lastIndexOf('.') + 1) }}
                </div>
                <el-icon v-else size="20" color="#999">
                  <VideoCameraFilled />
                </el-icon>
              </div>
              <div class="video_button">已添加</div>
            </div>
            <img v-else :src="value" class="w-h-100 h-p-100" />
          </div>
          <div v-else @click="onFilePick" class="add-file p-t-15">
            <div class="flex c">
              <el-icon :size="20">
                <Plus />
              </el-icon>
            </div>
            <div class="tc m-t-5">{{ label }}</div>
          </div>
        </el-col>
        <el-col :span="18">
          <el-form label-position="left" :inline="true" size="small" class="file-upload-box__form">
            <el-form-item size="small" label="标题" class="m-t-7">
              <el-input
                :disabled="disabledAlt"
                :maxlength="15"
                :minlength="0"
                @input="(e) => inputChange({ type: 'alt', event: e })"
                v-model="alt"
                placeholder="请输入图片标题"
              />
            </el-form-item>
            <el-form-item size="small" label="链接" class="m-t-12">
              <el-input
                :disabled="disabledLink"
                @input="(e) => inputChange({ type: 'linkName', event: e })"
                v-model="linkName"
                placeholder="请输入图片的链接"
              />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </el-form-item>
</template>

<script lang="ts">
import { useFilePicker } from '@/composable/files/lib/hooks'
import { pageDesignerFilePickerConfig } from '@/composable/files/pageDesignerFilePickerConfig'
//
const { open } = useFilePicker(pageDesignerFilePickerConfig)

import { toRefs, reactive, watch } from 'vue'

interface State {
  label: string
  required: boolean
  alt: string
  linkName: string
  value: string
  errorMessage: string
  disabledAlt: boolean
  disabledLink: boolean
  size: {
    width: number
    height: number
  }
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
      required: false,
      label: '',
      errorMessage: '',
      alt: '',
      linkName: '',
      value: '',
      disabledAlt: false,
      disabledLink: false,
      size: {
        width: 0,
        height: 0,
      },
    })

    // 判断是否为video
    const isVideo = (src: string) => {
      if (!src) return false
      return /.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4)$/i.test(src)
    }

    const init = () => {
      if (props.data.errorMessage?.required) {
        state.required = true
      }
      if (props.data.label) {
        state.label = props.data.label
      }
      state.disabledAlt = !props.data.isAlt
      state.disabledLink = !props.data.isLink

      resetFormData()
    }

    const validation = () => {
      let errorMessage = ''
      if (props.data?.errorMessage?.required) {
        if (!state.value) {
          errorMessage = props.data.errorMessage.required
        }
      }
      state.errorMessage = errorMessage
      return errorMessage
    }

    const resetFormData = () => {
      if (props?.formData[props.data.key]) {
        try {
          const value = JSON.parse(props?.formData[props.data.key])
          state.value = value.url
          state.alt = value.alt
          state.linkName = value.linkName
        } catch (e) {
          console.error(e, '解析files信息错误')
        }
      } else {
        state.value = ''
        state.alt = ''
        state.linkName = ''
      }
      validation()
    }

    init()

    const onFilePick = async () => {
      const openParams: any = {
        accept: props.data.accept || 'image/*',
        exts: ['.png', '.gif', '.jpeg', '.jpg', '.webp', '.bmp', '.svg', '.apng'],
      }

      if (props.data.exts && props.data.exts.length > 0) {
        openParams.exts = props.data.exts
      }

      const res: any = await open(openParams)
      if (!res[0].width || !res[0].height) return
      state.value = res[0].url
      state.size.width = res[0].width
      state.size.height = res[0].height

      exportInfo()
    }

    const inputChange = (options: { type: 'linkName' | 'alt'; event: any }) => {
      state[options.type] = options.event
      exportInfo()
    }

    const exportInfo = () => {
      const val = validation()

      console.log(state, 'vvstate')
      if (!val) {
        context.emit('callback', {
          type: 'files',
          key: props.data.key,
          value: JSON.stringify({
            url: state.value,
            alt: state.alt,
            linkName: state.linkName,
            size: state.size,
          }),
        })
      }
    }

    watch(props, () => {
      resetFormData()
    })

    return {
      isVideo,
      onFilePick,
      inputChange,
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss">
.file-upload-box {
  background: #f5f5f5;
  border: 10px;
  width: 100%;
  .add-file {
    width: 70px;
    height: 70px;
    background: #fff;
    border-radius: 5px;
    border: 1px solid #f2f2f2;
    cursor: pointer;
    overflow: hidden;
    &:hover {
      border: 1px solid var(--el-color-primary);
    }
    .video_box {
      position: relative;
      overflow: hidden;
      width: 100%;
      .icon {
        height: 50px;
      }
      .video_button {
        position: absolute;
        z-index: 5;
        bottom: 0;
        height: 20px;
        text-align: center;
        color: #fff;
        background: green;
        width: 100%;
        line-height: 20px;
      }
    }
  }
  &__form {
    .el-form-item__label {
      margin-bottom: 0 !important;
    }
  }

  /*.el-form-item {*/
  /*  &__label {*/
  /*    margin-bottom: 0;*/
  /*    line-height: 24px!important;*/
  /*  }*/
  /*}*/
}
</style>
