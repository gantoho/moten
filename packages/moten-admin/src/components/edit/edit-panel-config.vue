<template>
  <div class="edit-panel-config" ref="target" :class="{ 'is-show': edit.configPanelShow }">
    <div class="icon-group">
      <v-icon
        :src="icon.expand"
        :content="edit.configPanelShow ? '收起侧边栏' : '展开侧边栏'"
        @click.native="panelRightSwitch"
      />
    </div>

    <div class="content">
      <transition-group name="fade">
        <div class="title" v-if="edit.currentSelect">组件</div>
        <div class="title" v-else>页面</div>
        <edit-config-block v-if="edit.currentSelect" />
        <edit-config-page v-else />
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import icon from '@/config/icon'
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useEditStore } from '@/stores/edit'

const edit = useEditStore()

const tabActiveName = ref('page')
const target = ref(null)

onClickOutside(target, () => {
  if (!edit.isMobileViewport) edit.setConfigPanelShow(false)
})

watch(
  () => edit.currentSelect,
  (value) => {
    if (value) {
      edit.setConfigPanelShow(true)
      tabActiveName.value = 'component'
    } else {
      tabActiveName.value = 'page'
    }
  },
)
watch(
  () => edit.configPanelShow,
  (value) => {
    if (!value) edit.setCurrentSelect(null)
  },
)

const panelRightSwitch = () => {
  edit.setConfigPanelShow(!edit.configPanelShow)
}
</script>

<style lang="scss" scoped>
.edit-panel-config {
  position: fixed;
  z-index: 200;
  top: var(--edit-header-height);
  right: -240px;
  width: 240px;
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
      border-radius: var(--border-radius);
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

    .title {
      padding: 14px;
      font-size: 20px;
      font-weight: 600;
    }

    :deep(.el-tabs--border-card) {
      border: 0;
    }
    :deep(.el-tabs__content) {
      padding: 0;
    }
  }
}
</style>
