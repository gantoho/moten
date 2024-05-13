<template>
  <div :class="classes">
    <mo-link v-if="src" :to="link" target="_blank">
      <img v-bind="$attrs" :src="src" class="image" />
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
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
