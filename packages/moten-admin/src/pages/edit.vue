<template>
  <div class="page">
    <edit-header />
    <div class="container flex" :class="classes">
      <edit-panel-block />
      <edit-render />
      <edit-panel-config />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useEditStore } from '@/stores/edit'
import { get } from '@/composable/use-request'

const edit = useEditStore()

const classes = computed(() => {
  return { 'mobile-background': edit.isMobileViewport }
})

onMounted(async () => {
  try {
    const result = await get('/page/1')
    console.warn(`✅ - file: edit.vue:25 - result:`, result)
  } catch (e) {
    console.warn(`✅ - file: edit.vue:27 - e:`, e)
  }
})
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  overflow-x: hidden;
  user-select: none;
  --edit-header-height: 64px;
  --edit-panel-block-width: 240px;
  .container {
    width: 100%;
    min-width: 100%;
    &.mobile-background {
      background: var(--color-bg);
    }
  }
}
</style>
