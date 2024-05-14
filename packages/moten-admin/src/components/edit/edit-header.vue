<template>
  <div class="header">
    <div class="header-left">
      <div class="back">
        <v-icon content="返回">
          <el-icon><ArrowLeft /></el-icon>
        </v-icon>
        <div class="header-title">页面</div>
      </div>

      <div class="line"></div>

      <v-select v-model="viewport" />
    </div>

    <div class="header-right"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useEditStore, type ViewportType } from '@/stores/edit'

const edit = useEditStore()

const viewport = ref<ViewportType>('desktop')

watch(viewport, (val) => {
  edit.setViewport(val)
  edit.setConfigPanelShow(val === 'mobile')
})
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 500;
  height: var(--edit-header-height);
  background: white;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .back {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 16px;
      flex-shrink: 0;
      .header-title {
        font-size: 14px;
        padding-left: 4px;
      }
    }
    .line {
      width: 1px;
      height: 20px;
      border-left: 1px solid var(--color-border);
      padding-right: 16px;
    }
  }
  .header-right {
    position: relative;
  }
}
</style>
