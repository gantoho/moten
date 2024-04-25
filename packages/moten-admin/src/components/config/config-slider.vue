<template>
  <el-form-item size="small" :label="label">
    <el-row :gutter="10" :style="{ width: '100%' }">
      <el-col :span="selectList.length > 0 ? 17 : 24">
        <el-slider
          class="m-l-15"
          :style="{
            width: '95%',
          }"
          v-model="value"
          :min="defaultConfig.min"
          :max="defaultConfig.max"
          :show-stops="defaultConfig.showStops"
          :step="defaultConfig.step"
          :show-input="defaultConfig.showInput"
          @change="slideChange"
        />
      </el-col>
      <el-col :span="1" />
      <el-col :span="6">
        <el-select
          v-if="selectList.length > 0"
          v-model="selectValue"
          placeholder="Select"
          @change="selectChange"
        >
          <el-option
            v-for="item in selectList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
  </el-form-item>
</template>

<script lang="ts">
import { toRefs, reactive, watch } from 'vue'
import { inRange } from 'lodash'

interface State {
  label: string
  value: number
  defaultConfig: {
    min: number
    max: number
    step: number
    showStops: boolean
    showInput: boolean
  }
  selectValue: number
  selectList: {
    label: string
    value: number
  }[]
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
      value: 0,
      defaultConfig: {
        min: 0,
        max: 100,
        step: 1,
        showStops: false,
        showInput: false,
      },
      selectValue: 0,
      selectList: [],
    })

    const findSelectInfo = () => {
      const selectItem = state.selectList.find((item: any, index: number) => {
        if (item.value === state.value) {
          return item
        }
        if (index === 0) {
          if (state.value <= item.value) {
            return item
          }
        } else {
          if (inRange(state.value, state.selectList[index - 1].value, item.value)) {
            return item
          }
        }
      })
      if (selectItem) {
        state.selectValue = selectItem.value
      }
    }

    const slideChange = (e: number) => {
      state.value = e
      findSelectInfo()
      context.emit('callback', {
        type: 'slider',
        key: props.data.key,
        value: e,
      })
    }

    const selectChange = (e: number) => {
      state.value = e
      state.selectValue = e
    }

    const resetFormData = () => {
      if (props?.formData[props.data.key]) {
        state.value = props?.formData[props.data.key]
      } else {
        state.value = 0
      }
    }

    const init = () => {
      // 初始化默认参数
      if (props.data) {
        const control = props.data

        // 写入value
        if (props.data?.value) {
          state.value = props.data?.value
        } else if (props.data?.defaultValue) {
          state.value = props.data?.defaultValue
        }

        resetFormData()

        if (props.data.maxLength && props.data.minLength) {
          state.defaultConfig.min = props.data.minLength
          state.defaultConfig.max = props.data.maxLength
        } else if (props.data.minLength) {
          state.defaultConfig.min = props.data.minLength
        } else if (props.data.maxLength) {
          state.defaultConfig.max = props.data.maxLength
        }

        if (control.step) {
          state.defaultConfig.step = control.step
        }
        if (control.showStops) {
          state.defaultConfig.showStops = control.showStops
        }

        if (control.showInput) {
          state.defaultConfig.showInput = control.showInput
        }

        if (
          control.selectList &&
          Array.isArray(control.selectList) &&
          control.selectList.length > 0
        ) {
          state.selectList = control.selectList
          // 查找 select的value
          findSelectInfo()
        }
      }
    }

    init()

    watch(props, () => {
      resetFormData()
    })

    return {
      slideChange,
      selectChange,
      ...toRefs(state),
    }
  },
}
</script>
