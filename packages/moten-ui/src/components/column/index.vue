<template>
  <div :class="classes" :style="styles">
    <div class="item" v-for="(_, index) in cols" :key="index">
      <slot :item="item(index)" :index="index"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue-demi'
import { createNamespace } from '@/utils/components'
import { props } from './props'

const { name, n } = createNamespace('column')

export default defineComponent({
  name,
  props,
  setup(props) {
    const { data, viewport, list } = toRefs(props)

    const classes = computed(() => [n()])
    const item = computed(() => (index: number) => list.value?.[viewport.value]?.[index] || {})
    const cols = computed(() => data.value?.content?.cols?.[viewport.value] || [0.5, 0.5])
    const background = computed(() => data.value?.style?.background?.[viewport.value])
    const styles = computed(() => ({ background: background.value }))

    return {
      cols,
      list,
      item,
      styles,
      classes,
    }
  },
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
