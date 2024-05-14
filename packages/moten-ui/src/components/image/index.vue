<template>
  <div :class="classes">
    <mo-link v-if="src" :to="link" target="_blank">
      <img v-bind="$attrs" :src="src" class="image" :style="style" />
    </mo-link>
    <div v-else class="no-image">
      <mo-empty description="暂无图片，请上传" />
    </div>
  </div>
</template>

<script>
import { createNamespace } from '@/utils/components'
import { props } from './props'
import MoEmpty from '../empty'
import MoLink from '../link'

const { name, n } = createNamespace('image')

export default {
  name,
  props,
  components: { MoEmpty, MoLink },
  computed: {
    classes() {
      return [n()]
    },
    link() {
      const { viewport, data } = this
      return data?.content?.link?.[viewport] || ''
    },
    src() {
      const { viewport, data } = this
      return data?.content?.src?.[viewport] || ''
    },
    width() {
      const { viewport, data } = this
      return data?.style?.width?.[viewport] || ''
    },
    height() {
      const { viewport, data } = this
      return data?.style?.height?.[viewport] || ''
    },
    style() {
      return {
        width: this.width,
        height: this.height,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
