<template>
  <div :class="classes">
    <img :src="src" class="image" />
    <div class="description" v-html="description" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue-demi'
import noDataIcon from '@/assets/images/no-data.png'
import { createNamespace } from '@/utils/components'
import { props } from './props'

const { name, n } = createNamespace('empty')

export default defineComponent({
  name,
  props,
  setup(props) {
    const { image, description } = toRefs(props)

    const classes = computed(() => [n()])
    const src = computed(() => image.value || noDataIcon)

    return {
      classes,
      src,
      description,
    }
  },
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
