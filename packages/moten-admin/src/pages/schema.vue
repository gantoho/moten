<template>
  <div class="page">
    <component v-for="(item, index) in list" :key="index" :is="getComponent(item)" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { batchDynamicComponents } from '@/utils/index'

const components = import.meta.glob('@/components/config/**/*.vue')

const getComponent = (name: string) => {
  return batchDynamicComponents(name, import.meta.glob('@/components/config/**/*.vue'))
}

const list = ref(
  Object.keys(components)
    .map((item) => {
      return item?.split('/')?.pop()?.replace('.vue', '') || ''
    })
    .filter((v) => v),
)
</script>

<style lang="scss" scoped></style>
