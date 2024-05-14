<template>
  <el-form-item :label="label">
    <quill-editor
      ref="richRefs"
      :toolbar="toolbar"
      @textChange="richTextChange"
      @blur="richTextChange"
      class="render-form-ql-editor"
      style="min-height: 300px; overflow-y: scroll; width: 100%"
    />
  </el-form-item>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, watch } from 'vue'
import * as utils from '@/utils/utils'

interface State {
  label: string
  value: string
  dialogVisible: boolean
  richRefs: any
  toolbar: any[]
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
      richRefs: null,
      label: props.data?.label,
      value: '',
      dialogVisible: false,
      toolbar: utils.default.quillTool(),
    })

    const richTextChange = () => {
      state.value = state.richRefs.getHTML()
      context.emit('callback', {
        type: 'rich-text',
        key: props.data.key,
        value: state.value,
      })
    }

    const openDialog = () => {
      state.dialogVisible = true
    }

    const init = () => {
      // console.log(props?.formData[props.data.key]);
      if (props?.formData[props.data.key]) {
        // console.log(props?.formData[props.data.key], 'props?.formData[props.data.key]props?.formData[props.data.key]');
        state.value = props?.formData[props.data.key]
        state.richRefs.setHTML(state.value)
      } else {
        state.value = ''
        state.richRefs.setHTML('')
      }
    }

    onMounted(() => {
      init()
    })

    return {
      openDialog,
      richTextChange,
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss">
.render-form-ql-editor {
  .ql-editor {
    height: 100%;
  }
}
</style>
