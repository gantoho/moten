<template>
  <el-form-item size="small" :label="label" :required="required" :error="errorMessage">
    <el-input-number
      v-model="value"
      :min="defaultInputConf.minLength"
      :max="defaultInputConf.maxLength"
      @change="inputChange"
    />
  </el-form-item>
</template>

<script lang="ts">
import { toRefs, reactive, watch } from 'vue'
import { isEqual } from 'lodash'

interface DefaultInputConf {
  title: string
  placeholder?: string
  maxLength?: number
  minLength?: number
}

interface State {
  key: string
  formInfo: any
  value: string
  defaultInputConf: DefaultInputConf
  label: string
  required: boolean
  errorMessage: string
}

export default {
  name: 'CompInput',
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
  components: {},
  expose: ['init'],
  setup(props: any, context: any) {
    const state: State = reactive({
      key: '',
      value: 0,
      defaultInputConf: {
        title: '',
        placeholder: '请输入',
        maxLength: undefined,
        minLength: undefined,
      },
      required: false,
      label: props.data?.label,
      errorMessage: '',
    })

    const validation = () => {
      let errorMessage = ''
      if (props.data?.errorMessage?.required) {
        state.required = true
        if (!state.value) {
          errorMessage = props.data.errorMessage.required
        }
      }

      return errorMessage
    }

    const resetFormData = () => {
      if (props.formData[props.data.key]) {
        state.value = props?.formData[props.data.key]
      }
    }

    const inputChange = (e: string) => {
      state.value = e
      state.errorMessage = validation()
      if (state.errorMessage) {
        return
      }
      context.emit('callback', {
        type: 'input-number',
        key: props.data.key,
        value: e,
      })
    }

    const init = async () => {
      const defaultInputConf: DefaultInputConf = {
        title: '',
        placeholder: '',
      }
      // 写入默认值
      if (props.data?.label) {
        defaultInputConf.title = props.data.label
      }
      if (props.data?.placeholder) {
        defaultInputConf.placeholder = props.data.placeholder
      }

      if (props.data.minLength && props.data.maxLength) {
        defaultInputConf.minLength = props.data.minLength
        defaultInputConf.maxLength = props.data.maxLength
      } else if (props.data.minLength) {
        defaultInputConf.minLength = props.data.minLength
      } else if (props.data.maxLength) {
        defaultInputConf.maxLength = props.data.maxLength
      }

      resetFormData()

      state.defaultInputConf = defaultInputConf

      validation()
    }

    watch(props, () => {
      resetFormData()
    })

    init()

    return {
      inputChange,
      init,
      ...toRefs(state),
    }
  },
}
</script>
