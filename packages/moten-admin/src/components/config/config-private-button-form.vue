<template>
  <div v-if="enabled">
    <el-form-item size="small" :label="label">
      <el-radio-group v-model="currentRadio" @change="radioChange">
        <el-radio-button
          v-for="(item, index) in radioList"
          :key="index"
          :label="item.label"
          :name="item.id"
        />
      </el-radio-group>
    </el-form-item>

    <div class="button-form-box">
      <div v-for="(item, index) in customList" :key="index" class="button-form-box__item">
        <div>
          <el-form-item size="small" v-for="(it, ii) in item" :key="ii" :label="it.name">
            <el-row style="width: 100%" :getter="10" v-if="it.type === 'input-color'">
              <el-col :span="10">
                <el-input v-model="it.value" disabled />
              </el-col>
              <el-col :span="1" />
              <el-col :span="5">
                <el-color-picker
                  popper-class="comp-color-picker"
                  :show-alpha="false"
                  v-model="it.value"
                  @change="(e) => itemInputChange({ item: it, index, event: e })"
                />
              </el-col>
            </el-row>

            <el-input
              v-if="it.type === 'input'"
              :model-value="it.value"
              :placeholder="it.placeholder"
              @input="(e) => itemInputChange({ item: it, index, event: e })"
            />

            <el-input-number
              v-else-if="it.type === 'input-number'"
              v-model="it.value"
              @change="(e) => itemInputChange({ item: it, index, event: e })"
            />
            <el-switch
              v-else-if="it.type === 'switch'"
              v-model="it.value"
              @change="(e) => itemInputChange({ item: it, index, event: e })"
            />
          </el-form-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, watch } from 'vue'
import { cloneDeep } from 'lodash'

interface RadioItem {
  label: string
  id: number
}

interface State {
  label: string
  value: string
  currentRadio: string
  required: string
  radioList: RadioItem[]
  currentSelect: any
  customList: any
  enabled: boolean
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
      value: '',
      currentRadio: '',
      required: false,
      radioList: [],
      customList: [],
      currentSelect: {
        label: '',
      },
      enabled: true,
    })

    const aa = [
      {
        info: [],
        value: {},
      },
    ]

    const memInfo = [
      {
        name: '文字内容',
        type: 'input',
        key: 'text',
        placeholder: '请输入按钮文字',
        value: '示例内容',
      },
      {
        name: '按钮英文(神策)',
        type: 'input',
        key: 'text-sensors',
        placeholder: '自定义element_name',
        value: '',
      },
      {
        name: '黑底白字',
        type: 'switch',
        key: 'primary',
        value: false,
      },
      {
        name: '跳转链接',
        type: 'input',
        key: 'link',
        value: '',
      },
    ]

    const setCustomInfo = (num: number) => {
      const customList: any = []
      for (let i = 0; i < num; i += 1) {
        if (state.customList[i]) {
          customList.push(state.customList[i])
        } else {
          customList.push(cloneDeep(memInfo))
        }
      }
      state.customList = customList
    }

    const radioChange = (e: string) => {
      state.currentSelect = state.radioList.find((item: RadioItem) => e === item.label)
      state.currentRadio = e
      setCustomInfo(state.currentSelect.row)

      sendCustomList()
    }

    const sendCustomList = () => {
      const infoList: any = []
      state.customList.forEach((item: any) => {
        const current: any = {}
        item.forEach((it: any) => {
          current[it.key] = it.value
        })
        infoList.push(current)
      })
      context.emit('callback', {
        type: 'private-button-form',
        key: props.data.key,
        value: JSON.stringify({
          templateId: state.currentSelect.id,
          buttonList: infoList,
        }),
      })
    }

    const init = () => {
      if (props.data) {
        if (typeof props.data?.isVisible === 'boolean') {
          state.enabled = props.data?.isVisible
        }

        if (props.data.radioList) {
          state.radioList = props.data.radioList
          let parseInfo: any = null
          const customList: any = []

          try {
            parseInfo = JSON.parse(props?.formData[props.data.key])
          } catch (e) {
            console.log('e: ', e)
          }

          state.currentSelect = props.data.radioList.find((item: any, index: number) => {
            if (parseInfo) {
              return item.id === parseInfo.templateId
            } else {
              return index === 0
            }
          })

          state.currentRadio = state.currentSelect.label

          if (parseInfo) {
            parseInfo.buttonList.forEach((item: any) => {
              const cloneInfo: any = cloneDeep(memInfo)
              cloneInfo.forEach((it: any) => {
                it.value = item[it.key]
              })
              customList.push(cloneInfo)
            })
            state.customList = customList
          } else {
            setCustomInfo(state.currentSelect.row)
          }
        }
      }

      if (typeof props.formData.enabled === 'boolean') {
        state.enabled = props.formData.enabled
      }

      sendCustomList()
    }

    const itemInputChange = (options: { item: any; index: number; event: any }) => {
      state.customList[options.index].forEach((item: any) => {
        if (options.item.key === item.key) {
          item.value = options.event
        }
      })
      sendCustomList()
    }

    init()

    watch(
      () => props.formData.enabled,
      () => {
        init()
      },
    )

    return {
      itemInputChange,
      radioChange,
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss">
.button-form-box {
  &__item {
    background: #f3f2f2;
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 15px;
  }
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
}
</style>
