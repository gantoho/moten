<template>
  <div class="edit-panel-block">
    <div class="title">组件</div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基础组件" name="1">
          <edit-block-drag
            :list="baseBlockList"
            :sort="false"
            :group="{ name: dragGroup, pull: 'clone', put: false }"
          />
        </el-collapse-item>
        <el-collapse-item title="活动组件" name="2">
          <edit-block-drag
            :list="marketingBlockList"
            :sort="false"
            :group="{ name: dragGroup, pull: 'clone', put: false }"
          />
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { baseBlocks, marketingBlocks } from '@/config/blocks'
import { dragGroup } from './nested'

const activeNames = ref(['1', '2'])

const baseBlockList = ref(baseBlocks)
const marketingBlockList = ref(marketingBlocks)
</script>

<style lang="scss" scoped>
.edit-panel-block {
  position: fixed;
  top: var(--edit-header-height);
  left: 0;
  flex-shrink: 0;
  width: 240px;
  background: white;
  height: calc(100vh - var(--edit-header-height));
  border-right: 1px solid var(--color-border);
  overflow: auto;

  .title {
    padding: 14px;
    font-size: 20px;
    font-weight: 600;
  }

  :deep(.el-collapse-item__header) {
    padding-left: 14px;
    font-size: 14px;
  }
  :deep(.el-collapse-item__content) {
    padding-left: 14px;
    padding-right: 14px;
    padding-bottom: 14px;
  }
}
</style>
