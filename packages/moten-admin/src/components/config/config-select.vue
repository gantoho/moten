<template>
  <el-form-item size="small" :label="label" :required="required">
    <el-select
      v-model="value"
      :multiple="defaultConfig.multiple"
      :filterable="defaultConfig.filterable"
      :allow-create="defaultConfig.allowCreate"
      :default-first-option="defaultConfig.defaultFirstOption"
      :reserve-keyword="false"
      :placeholder="defaultConfig.placeholder"
      @change="selectChange"
    >
      <el-option
        v-for="item in selectList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-form-item>
</template>

<script lang="ts">
import { toRefs, reactive, watch } from 'vue'

interface SelectListInterface {
  label: string
  value: number
}

interface State {
  label: string
  value: string[] | number[] | string
  required: boolean
  selectList: SelectListInterface[]
  defaultConfig: {
    placeholder: string
    multiple: boolean
    filterable: boolean
    allowCreate: boolean
    defaultFirstOption: boolean
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
      label: props.data?.label,
      value: [],
      required: false,
      selectList: [],
      defaultConfig: {
        placeholder: '',
        multiple: false,
        filterable: false,
        allowCreate: false,
        defaultFirstOption: false,
      },
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

    const selectChange = (e: string | string[] | number[]) => {
      state.value = e
      context.emit('callback', {
        type: 'select',
        key: props.data.key,
        value: e,
      })
    }

    const restForm = () => {
      if (props?.formData[props.data.key]) {
        state.value = props?.formData[props.data.key]
      } else {
        if (props.data?.value) {
          state.value = props.data?.value
        } else if (props.data?.defaultValue) {
          state.value = props.data?.defaultValue
        }
      }
    }

    const init = () => {
      restForm()

      if (props.data) {
        const control = props.data
        if (
          control.selectList &&
          Array.isArray(control.selectList) &&
          control.selectList.length > 0
        ) {
          state.selectList = control.selectList
        }

        if (control.multiple) {
          state.defaultConfig.multiple = control.multiple
        }
        if (control.filterable) {
          state.defaultConfig.filterable = control.filterable
        }
        if (control.allowCreate) {
          state.defaultConfig.allowCreate = control.allowCreate
        }
      }

      // if (props.data) {
      //   if (props.data.radioList) {
      //     state.radioList = props.data.radioList;
      //
      //     if (props.data.defaultValue) {
      //       const findId = props.data.radioList.find((item: RadioItem) => item.id === props.data.defaultValue);
      //       state.value = findId.label;
      //     }
      //   }
      // }
      // validation();
    }

    watch(props, () => {
      restForm()
    })

    init()

    return {
      selectChange,
      ...toRefs(state),
    }
  },
}
</script>
