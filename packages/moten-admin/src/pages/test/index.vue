<template>
  <div class="flex jc">
    <drag :list="newList" :sort="false" :group="{ name: 'people', pull: 'clone', put: false }" />
    <drag type="render" :list="list" group="people" style="width: 500px; background: #ddd" />
    <pre v-html="JSON.stringify(list, null, 3)" style="font-size: 8px"></pre>
    <de-image
      src="https://raw.githubusercontent.com/SortableJS/Vue.Draggable/master/logo.svg?sanitize=true"
      style="width: 100px; height: 100px"
    />
  </div>
</template>

<script lang="ts">
import drag from './drag.vue'

export default {
  components: {
    drag,
  },
  data() {
    return {
      newList: [
        {
          name: '多列',
          code: 'column',
          nested: true,
          children: [[], [], []],
        },
        {
          name: '图片',
          code: 'image',
        },
        {
          name: '视频',
          code: 'video',
        },
        {
          name: '按钮',
          code: 'button',
        },
        {
          name: '文本',
          code: 'text',
        },
        {
          name: '幻灯片',
          code: 'swiper',
        },
        {
          name: '留白',
          code: 'blank',
        },
      ],
      list: [],
    }
  },
}
</script>

<style lang="scss" scoped></style>
