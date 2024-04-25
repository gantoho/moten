<template>
  <div class="edit-panel-config" ref="target" :class="{ 'is-show': edit.rightPanelShow }">
    <div class="icon-group">
      <v-icon
        :content="edit.rightPanelShow ? '收起侧边栏' : '展开侧边栏'"
        @click="panelRightSwitch"
      >
        <img :src="panelRightSwitchIcon" />
      </v-icon>
    </div>

    <div class="content">
      <el-tabs type="border-card" v-model="tabActiveName">
        <el-tab-pane label="页面配置" name="page">
          <edit-config-page />
        </el-tab-pane>
        <el-tab-pane label="组件配置" name="component">
          <edit-config-block />
        </el-tab-pane>
        <el-tab-pane label="组件管理" name="sort">
          <edit-config-sort />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useEditStore } from '@/stores/edit'
import panelRightSwitchIcon from '@/assets/images/panel-right.png'

const edit = useEditStore()

const tabActiveName = ref('page')
const target = ref(null)

onClickOutside(target, () => {
  if (!edit.isMobileViewport) edit.setRightPanelShow(false)
})

watch(
  () => edit.currentSelect,
  (value) => {
    if (value) {
      edit.setRightPanelShow(true)
      tabActiveName.value = 'component'
    } else {
      tabActiveName.value = 'page'
    }
  },
)
watch(
  () => edit.rightPanelShow,
  (value) => {
    if (!value) edit.setCurrentSelect(null)
  },
)

const panelRightSwitch = () => {
  edit.setRightPanelShow(!edit.rightPanelShow)
}
</script>

<style lang="scss" scoped>
.edit-panel-config {
  position: fixed;
  z-index: 200;
  top: var(--edit-header-height);
  right: -300px;
  width: 300px;
  background: white;
  border-left: 1px solid var(--color-border);
  transition: right 0.5s cubic-bezier(1, 0, 0.61, 1.01);
  height: calc(100vh - var(--edit-header-height));

  &.is-show {
    right: 0;
    transition: right 0.5s cubic-bezier(1, 0, 0.61, 1.01);
  }

  .icon-group {
    position: absolute;
    left: -48px;
    top: 16px;
    .icon {
      cursor: pointer;
      width: 32px;
      height: 32px;
      padding: 3px;
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      transition: all 0.2s linear;
      border: 1px solid var(--color-border);
      background: white;
      & + .icon {
        margin-top: 10px;
      }
      &:hover {
        background: var(--color-icon-hover);
        transition: all 0.2s linear;
      }
    }
  }

  .content {
    overflow-y: auto;
    width: 100%;
    height: 100%;
    :deep(.el-tabs--border-card) {
      border: 0;
    }
    :deep(.el-tabs__content) {
      padding: 0;
    }
  }
}
</style>
