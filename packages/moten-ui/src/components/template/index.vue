<template>
  <div :class="classes"></div>
</template>

<script lang="ts">
import { createNameSpace } from '@/utils/components'
import { computed, defineComponent, toRefs } from 'vue-demi'
import { props } from './props'

const { name, n } = createNameSpace('column')

export default defineComponent({
  name,
  props,
  setup(props) {
    const { data, viewport } = toRefs(props)

    const classes = computed(() => [n()])
    const src = computed(() => data.value?.src?.[viewport.value] || '')

    return {
      classes,
      src,
    }
  },
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
