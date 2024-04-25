<template>
  <el-form-item size="small" :label="label">
    <el-switch v-model="value.enabled" @change="switchChange" />
  </el-form-item>
  <div v-if="value.enabled" v-for="item in shareList">
    <el-form-item size="small" :label="item.label">
      <el-input
        v-if="item.code === 'input'"
        :model-value="value[item.id]"
        :placeholder="item.placeholder"
        @input="
          (e) => {
            inputChange({ type: item.id, event: e })
          }
        "
      />
      <div v-if="item.code === 'files'">
        <div @click="onFilePick" class="share_card_component">
          <div class="p-t-15" v-if="!value.shareImage">
            <div class="flex c">
              <el-icon :size="20">
                <Plus />
              </el-icon>
            </div>
            <div class="tc m-t-5">{{ item.label }}</div>
          </div>
          <img v-else :src="value.shareImage" class="w-h-100 h-p-100" />
        </div>
      </div>
    </el-form-item>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, watch } from 'vue'

import { useFilePicker } from '@/composable/files/lib/hooks'
import { pageDesignerFilePickerConfig } from '@/composable/files/pageDesignerFilePickerConfig'
//
const { open } = useFilePicker(pageDesignerFilePickerConfig)

interface State {
  label: string
  value: any
  shareList: any
}

export default {
  components: {},
  props: {
    data: {
      type: Object,
      default: {},
    },
    formData: {
      type: Object,
      default: {},
    },
    skus: {},
  },
  emits: ['callback'],
  setup(props: any, context: any) {
    const state: State = reactive({
      label: props.data?.label,
      shareList: [],
      value: {
        enabled: false,
        shareImage: '',
      },
    })

    const switchChange = (e: boolean) => {
      state.value.enabled = e
      callback()
    }

    const onFilePick = async () => {
      const openParams: any = {
        accept: props.data.accept || 'image/*',
        exts: ['.png', '.gif', '.jpeg', '.jpg', '.webp', '.bmp', '.svg', '.apng'],
      }

      if (props.data.exts && props.data.exts.length > 0) {
        openParams.exts = props.data.exts
      }

      const res: any = await open(openParams)
      state.value.shareImage = res[0].url
      callback()
    }

    const callback = () => {
      context.emit('callback', {
        type: 'shareInfo',
        key: props.data.key,
        value: JSON.stringify(state.value),
      })
    }

    const inputChange = (options: { type: string; event: any }) => {
      state.value[options.type] = options.event
      callback()
    }

    const init = () => {
      if (props.data) {
        const control = props.data
        if (control.shareList && Array.isArray(control.shareList) && control.shareList.length > 0) {
          state.shareList = control.shareList
        }
      }

      if (props.formData && props.formData.shareInfo) {
        try {
          state.value = JSON.parse(props.formData.shareInfo)
        } catch (e) {}
      }
    }

    init()

    return {
      switchChange,
      inputChange,
      onFilePick,
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss">
.share_card_component {
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
}
</style>
