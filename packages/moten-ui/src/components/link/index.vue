<template>
  <component :is="tag" :class="classes" v-bind="$attrs" :href="to" :to="to" :target="target">
    <slot />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue-demi'
import { createNamespace } from '@/utils/components'
import { props } from './props'

const { name, n } = createNamespace('link')

export default defineComponent({
  name,
  props,
  setup(props) {
    const { to, target } = toRefs(props)

    const classes = computed(() => [n()])
    const isExternalLink = computed(() =>
      to.value.match(/^(http:\/\/|https:\/\/|javascript:.*|tel:.*|mailto:.*)/),
    )
    const tag = computed(() => {
      if (!to.value) return 'span'
      return isExternalLink.value ? 'a' : 'router-link'
    })

    return {
      classes,
      tag,
      target,
      to,
    }
  },
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
