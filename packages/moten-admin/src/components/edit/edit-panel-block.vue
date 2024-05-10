<template>
  <div class="edit-panel-block">
    <div class="left">
      <div
        class="menu-item"
        v-for="(item, index) in menuList"
        :key="index"
        :class="{ 'is-active': index === activeMenu }"
        @click="activeMenu = index"
      >
        <Icon class="menu-icon" :icon="index === activeMenu ? item.iconActive : item.icon" />
        <div class="menu-name">{{ item.name }}</div>
      </div>
    </div>
    <div class="right">
      <el-collapse v-model="activeNames" v-show="activeMenu === 0">
        <el-collapse-item title="基础组件" name="1">
          <edit-block-drag
            :list="baseBlockList"
            :sort="false"
            :group="{ name: dragGroup, pull: 'clone', put: false }"
          />
        </el-collapse-item>
        <el-collapse-item title="高级组件" name="2">
          <edit-block-drag
            :list="seniorBlocksList"
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
import { baseBlocks, seniorBlocks } from '@/config/blocks'
import { dragGroup } from './nested'
import { Icon } from '@iconify/vue'
import icon from '@/config/icon'

const menuList = ref([
  {
    icon: icon.block,
    iconActive: icon.blockActive,
    name: '组件',
  },
  {
    icon: icon.kit,
    iconActive: icon.kitActive,
    name: '套件',
  },
])
const activeMenu = ref(0)
const activeNames = ref(['1', '2'])

const baseBlockList = ref(baseBlocks)
const seniorBlocksList = ref(seniorBlocks)
</script>

<style lang="scss" scoped>
.edit-panel-block {
  position: fixed;
  top: var(--edit-header-height);
  left: 0;
  flex-shrink: 0;
  background: white;
  border-right: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-start;
  width: var(--edit-panel-block-width);
  .left {
    width: 70px;
    height: calc(100vh - var(--edit-header-height));
    border-right: 1px solid var(--color-border);
    .menu-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      padding: 5.5px 0;
      border-radius: 6px;
      cursor: pointer;
      margin: 17px 5px;

      &.is-active,
      &:hover {
        background: var(--color-block-hover);
        border-radius: 6px;
      }
      .menu-icon {
        width: 30px;
        height: 30px;
        margin: 0 auto;
      }
      .menu-name {
        font-size: 14px;
        line-height: 14px;
        padding-top: 4px;
      }
    }
  }
  .right {
    flex: 1;
    height: calc(100vh - var(--edit-header-height));
    overflow: auto;
  }
  :deep(.el-collapse) {
    border: 0;
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
