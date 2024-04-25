<template>
  <el-form-item size="small" :label="label" :required="required" class="private-text-add-remove">
    <template v-if="textList.length > 0">
      <div class="m-b-10" v-for="(item, index) in textList" :key="index">
        <el-row :gutter="10">
          <el-col :span="18">
            <el-input
              @input="
                (e) => {
                  inputChange({
                    event: e,
                    index,
                  })
                }
              "
              :model-value="item"
              placeholder="请输入内容"
            />
          </el-col>
          <el-col :span="6">
            <el-button-group>
              <el-button
                :icon="Minus"
                @click="
                  () => {
                    addAndRemoveText({
                      type: 'remove',
                      index,
                    })
                  }
                "
              />
              <el-button
                v-if="index === textList.length - 1"
                :icon="Plus"
                @click="
                  addAndRemoveText({
                    type: 'add',
                  })
                "
              />
            </el-button-group>
          </el-col>
        </el-row>
      </div>
    </template>

    <div v-else>
      <el-button-group>
        <el-button
          :icon="Plus"
          @click="
            addAndRemoveText({
              type: 'add',
            })
          "
        />
      </el-button-group>
    </div>
  </el-form-item>
</template>

<script lang="ts">
import { toRefs, reactive, watch, shallowRef } from 'vue'
import { Minus, Plus } from '@element-plus/icons-vue'

interface State {
  label: string
  textList: string[]
  required: boolean
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
      textList: [''],
      required: false,
    })

    const init = () => {
      if (props.data) {
        if (props?.formData[props.data.key]) {
          try {
            console.log(props?.formData[props.data.key])
            state.textList = JSON.parse(props?.formData[props.data.key])
          } catch (e) {
            console.log('e: ', e)
          }
        }
      }
    }

    const emit = () => {
      context.emit('callback', {
        type: 'private-text-add-remove',
        key: props.data.key,
        value: JSON.stringify(state.textList),
      })
    }

    const addAndRemoveText = (options: { type: string; index?: number }) => {
      if (options.type === 'remove') {
        state.textList = state.textList.filter((item, index) => index !== options.index)
      } else if (options.type === 'add') {
        state.textList.push('')
      }

      if (state.textList.length === 0) {
        state.textList.push('')
      }
      emit()
    }

    const inputChange = (options: { event: any; index: number }) => {
      state.textList[options.index] = options.event
      emit()
    }

    watch(props, () => {
      init()
    })

    init()

    return {
      inputChange,
      addAndRemoveText,
      Minus: shallowRef(Minus),
      Plus: shallowRef(Plus),
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss">
.private-text-add-remove {
  .el-form-item__content {
    display: block;
  }
}
</style>
