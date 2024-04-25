<template>
  <el-form-item size="small" :label="label" :required="required" :error="errorMessage">
    <el-row style="width: 100%" :getter="10">
      <el-col :span="10">
        <el-input v-model="value" disabled />
      </el-col>
      <el-col :span="1" />
      <el-col :span="5">
        <el-color-picker
          :popper-class="popperClass"
          :show-alpha="showAlpha"
          v-model="value"
          :predefine="predefineColors"
          @change="colorChange"
        />
      </el-col>
    </el-row>
  </el-form-item>
</template>

<script lang="ts">
import { toRefs, reactive } from 'vue'

interface State {
  label: string
  value: string
  showAlpha: boolean
  predefineColors: string[]
  popperClass: string
  required: boolean
  errorMessage: string
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
      value: '#333333',
      showAlpha: false,
      predefineColors: [],
      popperClass: 'comp-color-picker',
      errorMessage: '',
      required: false,
    })

    const colorChange = (e: string) => {
      state.value = e
      state.errorMessage = validation()
      context.emit('callback', {
        type: 'color-picker',
        key: props.data.key,
        value: e,
      })
    }

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

    const init = () => {
      if (props?.formData[props.data.key]) {
        state.value = props?.formData[props.data.key]
      } else {
        // 写入value
        if (props.data?.value) {
          state.value = props.data?.value
        } else if (props.data?.defaultValue) {
          state.value = props.data?.defaultValue
        }
      }

      if (props.data) {
        const control = props.data
        if (control.showAlpha) {
          state.showAlpha = control.showAlpha
        }
        if (
          control.predefineColors &&
          Array.isArray(control.predefineColors) &&
          control.predefineColors.length > 0
        ) {
          state.predefineColors = control.predefineColors
        }

        if (control.isColorClear) {
          state.popperClass = ''
        }

        state.errorMessage = validation()
      }
    }

    init()

    return {
      colorChange,
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss">
.comp-color-picker {
  .el-color-dropdown__btns {
    .el-color-dropdown__link-btn {
      display: none;
    }
  }
}
.el-color-picker--small .el-color-picker__trigger {
  width: 26px;
  height: 26px;
}
</style>
