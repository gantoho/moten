<template>
  <div :class="classes">
    <mo-link v-if="src" :to="link" target="_blank">
      <img v-bind="$attrs" :src="src" class="image" :style="styles" />
    </mo-link>
    <div v-else class="no-image">
      <mo-empty description="暂无图片，请上传" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue-demi'
import { createNamespace } from '@/utils/components'
import { props } from './props'
import MoEmpty from '../empty'
import MoLink from '../link'

const { name, n } = createNamespace('image')

export default defineComponent({
  name,
  props,
  components: {
    MoEmpty,
    MoLink,
  },
  setup(props) {
    const { data, viewport } = toRefs(props)

    const classes = computed(() => [n()])
    const link = computed(() => data.value?.content?.link?.[viewport.value] || '')
    const src = computed(() => data.value?.content?.src?.[viewport.value] || '')
    const width = computed(() => data.value?.style?.width?.[viewport.value] || '')
    const height = computed(() => data.value?.style?.height?.[viewport.value] || '')
    const styles = computed(() => ({ width: width.value, height: height.value }))

    return {
      classes,
      link,
      src,
      styles,
    }
  },
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
