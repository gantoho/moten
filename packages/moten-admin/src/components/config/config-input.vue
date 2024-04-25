<template>
  <el-form-item size="small" :label="label" :required="required" :error="errorMessage">
    <el-input
      :model-value="value"
      :placeholder="defaultInputConf.placeholder"
      :maxlength="defaultInputConf.maxLength"
      :minlength="defaultInputConf.minLength"
      :type="defaultInputConf.type"
      :rows="defaultInputConf.rows"
      @input="inputChange"
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
  type: string
  rows?: number
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
  setup(props: any, context: any) {
    const state: State = reactive({
      key: '',
      value: '',
      defaultInputConf: {
        title: '',
        placeholder: '请输入',
        maxLength: undefined,
        minLength: undefined,
        type: 'text',
        rows: 3,
      },
      required: false,
      label: props.data?.label,
      errorMessage: '',
    })

    const memState = {
      value: '',
    }

    const validation = () => {
      let errorMessage = ''
      if (props.data.errorMessage?.required) {
        state.required = true
        if (!state.value) {
          errorMessage = props.data.errorMessage.required
        }
      }

      if (props.data.errorMessage?.inputLength) {
        if (state.defaultInputConf.minLength) {
          if (state.defaultInputConf.minLength > state.value.length) {
            errorMessage = props.data?.errorMessage?.inputLength
          }
        }
      }

      return errorMessage
    }

    const inputChange = (e: string) => {
      state.value = e
      memState.value = e
      state.errorMessage = validation()
      if (state.errorMessage) {
        return
      }
      context.emit('callback', {
        type: 'input',
        key: props.data.key,
        value: e,
      })
    }

    const resetFormData = () => {
      if (props?.formData[props.data.key]) {
        state.value = props?.formData[props.data.key]
      }
    }

    const init = async () => {
      const defaultInputConf: DefaultInputConf = {
        title: '',
        placeholder: '',
        type: 'text',
        rows: 3,
      }

      // 写入默认值
      if (props.data) {
        const control = props.data
        if (control.label) {
          defaultInputConf.title = control.label
        }
        if (control.placeholder) {
          defaultInputConf.placeholder = control.placeholder
        }

        if (control.type) {
          defaultInputConf.type = control.type
        }
        // type === textarea rows 生效
        if (control.rows) {
          defaultInputConf.rows = control.rows
        }
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

      state.errorMessage = validation()
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
  expose: ['init'],
}
</script>
