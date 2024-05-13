<template>
  <div :class="classes">
    <img v-if="src" v-bind="attributes" class="image" />
    <div v-else class="no-image">
      <de-empty description="暂无图片，请上传" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue-demi'
import { createNamespace } from '@/utils/components'
import { type propData, props } from './props'
import DeEmpty from '../empty'

const { name, n } = createNamespace('image')

export default defineComponent({
  name,
  props,
  components: { DeEmpty },
  setup(props, context) {
    const { src, link } = props.data as propData

    const attributes = computed(() => ({
      ...context.attrs,
      src,
    }))

    const classes = computed(() => [n()])

    return {
      src,
      attributes,
      link,
      classes,
    }
  },
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
