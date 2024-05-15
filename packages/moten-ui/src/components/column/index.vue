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
    const { data, viewport } = toRefs(props)
    const { content, style } = data.value

    const classes = computed(() => [n()])
    const cols = computed(() => content?.cols?.[viewport.value])
    const list = computed(() => content?.list?.[viewport.value])
    const item = computed(() => (index: number) => list.value?.[index] || {})
    const background = computed(() => style?.background?.[viewport.value])
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
