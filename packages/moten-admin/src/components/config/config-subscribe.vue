<template>
  <el-form-item size="small" :label="label" :required="required">
    <div class="public-subscribe">
      <el-form-item size="small" :label="subscribeLabel">
        <el-switch v-model="isSubscribe" />
      </el-form-item>

      <el-form-item size="small" v-if="isSubscribe" label="订阅消息配置" class="m-t-20">
        <el-radio-group v-model="subscribeType" @change="radioChange">
          <el-radio-button
            :label="rItem.label"
            v-for="(rItem, rIndex) in radioList"
            :key="rIndex"
          />
        </el-radio-group>
      </el-form-item>

      <el-form-item
        size="small"
        v-if="isSubscribe && subscribeTypeId == 'all'"
        label="订阅消息分组ID"
        class="m-t-20"
      >
        <el-input v-model="subscribeId" @input="dataCallback" />
      </el-form-item>

      <el-form-item
        size="small"
        v-if="isSubscribe && subscribeTypeId == 'rule'"
        label="规则配置"
        class="m-t-20"
      >
        <div class="tip" v-html="ruleTip"></div>
        <div class="rule-container" v-for="(rItem, rIndex) in ruleList" :key="rIndex">
          <el-input
            :model-value="rItem"
            @input="
              (e) => {
                textInputChange(e, rIndex)
              }
            "
          />
          <el-button-group>
            <el-button
              v-if="ruleList.length > 1"
              :icon="Minus"
              @click="addAndRemoveRule({ type: 'remove', index: rIndex })"
            />
            <el-button
              v-if="rIndex === ruleList.length - 1"
              :icon="Plus"
              @click="addAndRemoveRule({ type: 'add' })"
            />
          </el-button-group>
        </div>
      </el-form-item>
    </div>
  </el-form-item>
</template>

<script lang="ts">
import { toRefs, reactive, watch, shallowRef } from 'vue'
import { Minus, Plus, Delete, Edit } from '@element-plus/icons-vue'

interface State {
  [key: string]: any
  subscribeLabel: string
  isSubscribe: boolean
  subscribeId: string
  subscribeType: string
  subscribeTypeId: string
  radioList: Array<any>
  ruleList: Array<string>
  ruleTip: string
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
      subscribeLabel: '是否开启订阅消息',
      radioList: [],
      isSubscribe: false,
      subscribeId: '',
      subscribeType: '',
      subscribeTypeId: '',
      ruleList: [''],
      ruleTip: '',
    })

    const init = () => {
      if (!props.data) return
      const radioList = props.data?.radioList || []
      state.subscribeType = radioList.find((v: any) => v.id == props.data?.radioDefaultValue).label
      state.subscribeTypeId = props.data?.radioDefaultValue
      state.radioList = radioList
      state.ruleTip = radioList.find((v: any) => v.id == 'rule')?.ruleTip
      if (props.data?.subscribeLabel) state.subscribeLabel = props.data?.subscribeLabel
      resetFormData()
    }

    const resetFormData = () => {
      if (props?.formData[props.data.key]) {
        const FormData = JSON.parse(props?.formData[props.data.key])
        Object.keys(FormData).forEach((v: string) => {
          state[v] = FormData[v]
        })
      }
    }

    const dataCallback = () => {
      const { isSubscribe, subscribeTypeId, subscribeType, ruleList, subscribeId } = state

      context.emit('callback', {
        type: 'subscribe',
        key: props.data.key,
        value: JSON.stringify({
          isSubscribe,
          subscribeType,
          subscribeTypeId,
          ruleList,
          subscribeId,
        }),
      })
    }

    const radioChange = (e: string) => {
      state.subscribeTypeId = state.radioList.find((v: any) => v.label == e).id
      dataCallback()
    }

    const textInputChange = (e: any, index: number) => {
      state.ruleList[index] = e
      dataCallback()
    }
    const addAndRemoveRule = (options: { type: string; index: number }) => {
      console.log('options: ', options)
      if (options.type === 'remove') {
        state.ruleList.splice(options.index, 1)
      } else if (options.type === 'add') {
        state.ruleList.push('')
      }

      if (state.ruleList.length === 0) {
        state.ruleList.push('')
      }
    }

    init()

    return {
      radioChange,
      addAndRemoveRule,
      textInputChange,
      dataCallback,
      Minus: shallowRef(Minus),
      Plus: shallowRef(Plus),
      Delete: shallowRef(Delete),
      Edit: shallowRef(Edit),
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss">
.public-subscribe {
  .rule-container {
    width: 100%;
    .el-input {
      width: 200px;
    }
  }

  .tip {
    color: #999;
  }
}
</style>
