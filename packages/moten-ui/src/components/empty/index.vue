<template>
  <div :class="classes">
    <img :src="src" class="image" />
    <div class="description" v-html="description" />
  </div>
</template>

<script>
import { createNamespace } from '@/utils/components'
import { props } from './props'
import noDataIcon from '@/assets/images/no-data.png'

const { name, n } = createNamespace('empty')

export default {
  name,
  props,
  computed: {
    classes() {
      return [n()]
    },
    src() {
      return this.image || noDataIcon
    },
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
