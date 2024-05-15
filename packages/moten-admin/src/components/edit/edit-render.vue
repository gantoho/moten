<template>
  <div class="edit-render" :style="pageStyle" :class="pageClass">
    <edit-render-drag :list="list" :group="dragGroup" class="render" />
    <el-empty class="empty" v-if="!list.length" description="请在左侧拖入组件到此处">
      <template #image>
        <Icon :icon="icon.dragBlank" class="icon" />
      </template>
    </el-empty>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { dragGroup } from './nested'
import { useEditStore } from '@/stores/edit'
import { Icon } from '@iconify/vue'
import icon from '@/config/icon'

const edit = useEditStore()

const list = ref([])

watch(
  list.value,
  (val: any) => {
    edit.setBlockConfig(val)
  },
  {
    deep: true,
  },
)

watch(
  () => edit.blockConfig,
  (val: any) => {
    list.value = val
  },
  {
    deep: true,
  },
)

const pageStyle = computed(() => {
  return {}
})
const pageClass = computed(() => {
  return { 'is-mobile': edit.isMobileViewport }
})

computed
</script>

<style lang="scss" scoped>
.edit-render {
  container-type: inline-size;
  position: relative;
  width: 100%;
  min-height: calc(100vh - var(--edit-header-height));
  margin-left: var(--edit-panel-block-width);
  margin-top: var(--edit-header-height);
  background: white;
  &.is-mobile {
    width: 375px;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    margin-top: calc(var(--edit-header-height) + 20px);
    margin-bottom: 20px;
    transform: translateX(10px);
  }
  .empty {
    position: absolute;
    z-index: 0;
    top: 0;
    top: 0;
    width: inherit;
  }
  .render {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
}
</style>
