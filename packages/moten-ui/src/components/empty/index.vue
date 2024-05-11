<template>
  <div :class="classes">
    <img :src="src" class="image" />
    <div class="description" v-html="description" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue-demi'
import { createNamespace } from '@/utils/components'
import { props } from './props'
import noDataIcon from '@/assets/images/no-data.png'

const { name, n } = createNamespace('empty')

export default defineComponent({
  name,
  props,
  setup(props) {
    const src = computed(() => props.image || noDataIcon)
    const classes = computed(() => [n()])

    return {
      src,
      description: props.description,
      classes,
    }
  },
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
