<template>
  <el-form-item size="small" :label="label" :required="required">
    <el-radio-group v-model="value" @change="radioChange">
      <el-radio-button
        v-for="(item, index) in radioList"
        :key="index"
        :label="item.label"
        :name="item.label"
      />
    </el-radio-group>
  </el-form-item>
</template>

<script lang="ts">
import { toRefs, reactive } from 'vue'
import { watch } from 'vue'

interface RadioItem {
  label: string
  id: string
}

interface State {
  label: string
  value: boolean
  required: boolean
  radioList: RadioItem[]
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
      required: false,
      radioList: [],
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

    const radioChange = (e: string) => {
      const findId = state.radioList.find((item: RadioItem) => e === item.label)
      if (findId) {
        context.emit('callback', {
          type: 'radio',
          key: props.data.key,
          value: findId.id,
        })
      }
    }

    const resetFormData = () => {
      if (props?.formData[props.data.key] || props.data.defaultValue) {
        const findId = props.data.radioList.find((item: RadioItem) => {
          return item.id === (props?.formData[props.data.key] || props.data.defaultValue)
        })
        state.value = findId.label
      }
    }

    const init = () => {
      if (props.data) {
        if (props.data.radioList) {
          state.radioList = props.data.radioList
        }
      }
      resetFormData()
      validation()
    }

    watch(props, () => {
      resetFormData()
    })

    init()

    return {
      radioChange,
      ...toRefs(state),
    }
  },
}
</script>
