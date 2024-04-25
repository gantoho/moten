<template>
  <el-form-item size="small" :label="label">
    <el-switch v-model="value" @change="switchChange" />
  </el-form-item>
</template>

<script lang="ts">
import { toRefs, reactive, watch } from 'vue'

interface State {
  label: string
  value: boolean
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
      label: props.data?.label,
      value: false,
    })

    const switchChange = (e: boolean) => {
      state.value = e
      context.emit('callback', {
        type: 'switch',
        key: props.data.key,
        value: e,
      })
    }

    const init = () => {
      if (typeof props.formData[props.data.key] === 'boolean') {
        state.value = props?.formData[props.data.key]
      } else {
        state.value = props.data?.defaultValue
      }
    }

    init()

    watch(props, () => {
      init()
    })

    return {
      switchChange,
      ...toRefs(state),
    }
  },
}
</script>
