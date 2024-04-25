<template>
  <div class="control-tool-info">
    <el-popover placement="bottom-end" :width="250" :visible="visiblePopover">
      <template #reference>
        <div @click="visiblePopover = true" class="control-tool-info__item w-p-100 tc">
          <el-tooltip effect="dark" content="编辑组件名" placement="right-start">
            <div>
              <el-icon><Edit /></el-icon>
            </div>
          </el-tooltip>
        </div>
      </template>
      <div>
        <el-input
          :model-value="inputValue"
          :maxlength="10"
          placeholder="最多输入10个字"
          @input="inputChange"
        />
        <div class="tc m-t-10">
          <el-button @click="visiblePopover = false" type="default"> 取消 </el-button>
          <el-button
            @click="changeComponentAlias(inputValue)"
            type="primary"
            :disabled="defaultValue === inputValue"
          >
            确认
          </el-button>
        </div>
      </div>
    </el-popover>

    <el-tooltip effect="dark" content="复制" placement="right-start">
      <div @click.stop="copyComponent" class="control-tool-info__item w-p-100 tc">
        <el-icon><CopyDocument /></el-icon>
      </div>
    </el-tooltip>

    <el-tooltip effect="dark" content="删除" placement="right-start">
      <div @click.stop="deleteComponent" class="control-tool-info__item w-p-100 tc">
        <el-icon><Delete /></el-icon>
      </div>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visiblePopover = ref(false)
const inputValue = ref('')
const defaultValue = ref('')

const inputChange = () => {}
const changeComponentAlias = (e) => {
  visiblePopover.value = false
}
const copyComponent = () => {}
const deleteComponent = () => {}
</script>

<style lang="scss" scoped>
.control-tool-info {
  width: 32px;
  background: #fff;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  &__item {
    height: 35px;
    line-height: 35px;
    cursor: pointer;
  }
}
</style>
