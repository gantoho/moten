<template>
  <div :class="classes" :style="displayStyle">
    <mo-link v-if="src" :to="link" target="_blank">
      <img v-bind="$attrs" :src="src" class="image" :style="styles" />
    </mo-link>
    <div v-else class="no-image">
      <mo-empty description="暂无图片，请上传" />
    </div>
  </div>
</template>

<script lang="ts">
import { createNameSpace } from '@/utils/components'
import { computed, defineComponent, toRefs, inject } from 'vue-demi'
import { props } from './props'
import MoEmpty from '../empty'
import MoLink from '../link'

const { name, n } = createNameSpace('image')

export default defineComponent({
  name,
  props,
  components: {
    MoEmpty,
    MoLink,
  },
  setup(props) {
    const platform = inject('platform')

    const { data, viewport } = toRefs(props)

    const classes = computed(() => [n()])
    const display = computed(() => {
      const display = data.value?.display?.[viewport.value]
      return typeof display === 'boolean' ? display : true
    })
    const src = computed(() => data.value?.src?.[viewport.value] || '')
    const link = computed(() => data.value?.link?.[viewport.value] || '')
    const width = computed(() => data.value?.width?.[viewport.value] || '')
    const height = computed(() => data.value?.height?.[viewport.value] || '')
    const styles = computed(() => ({ width: width.value, height: height.value }))
    const displayStyle = computed(() => {
      if (platform === 'editor') {
        return !display.value ? { opacity: 0.4, filter: 'brightness(0.7)' } : {}
      } else {
        return !display.value ? { display: 'none' } : {}
      }
    })

    return {
      classes,
      styles,
      displayStyle,
      display,
      src,
      link,
      width,
      height,
    }
  },
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
