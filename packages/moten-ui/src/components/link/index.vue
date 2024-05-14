<template>
  <component :is="tag" :class="classes" v-bind="$attrs" :href="to" :to="to" :target="target">
    <slot />
  </component>
</template>

<script>
import { createNamespace } from '@/utils/components'
import { props } from './props'

const { name, n } = createNamespace('link')

export default {
  name,
  props,
  computed: {
    classes() {
      return [n()]
    },
    tag() {
      if (!this.to) return 'span'
      return this.isExternalLink ? 'a' : 'router-link'
    },
    isExternalLink() {
      return (
        typeof this.to === 'string' &&
        this.to.match(/^(http:\/\/|https:\/\/|javascript:.*|tel:.*|mailto:.*)/)
      )
    },
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
