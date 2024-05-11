<template>
  <div :class="classes">
    <div class="item" v-for="(_, index) in cols" :key="index">
      <slot :item="item(index)" :index="index"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue-demi'
import { createNamespace } from '@/utils/components'
import { type propData, props } from './props'

const { name, n } = createNamespace('column')

export default defineComponent({
  name,
  props,
  setup(props) {
    const { cols = 2 } = props.data as propData

    const classes = computed(() => [n()])
    const item = computed(() => (index: number) => props.list[index] || {})

    return {
      cols,
      item,
      classes,
    }
  },
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
