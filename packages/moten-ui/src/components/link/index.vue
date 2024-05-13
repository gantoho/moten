<template>
  <a v-if="isExternalLink" :class="classes" v-bind="$attr" :href="to" :target="target">
    <slot />
  </a>
  <router-link v-else v-bind="$attr" :to="to">
    <slot />
  </router-link>
</template>

<script>
import { createNamespace } from '@/utils/components'
import { props } from './props'
import { RouterLink } from 'vue-router'

const { name, n } = createNamespace('link')

export default {
  name,
  props,
  computed: {
    classes() {
      return [n()]
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
