<template>
  <div class="flex jc">
    <drag-block
      :list="newList"
      :render-list="list"
      :sort="false"
      :group="{ name: 'people', pull: 'clone', put: false }"
      @beforeChange="beforeChange"
    />
    <drag-render
      :list="list"
      :render-list="list"
      group="people"
      style="width: 500px; background: #ddd"
      @beforeChange="beforeChange"
    />
    <pre v-html="JSON.stringify(preList, null, 3)" style="font-size: 8px"></pre>
    <pre v-html="JSON.stringify(list, null, 3)" style="font-size: 8px"></pre>
  </div>
</template>

<script lang="ts">
import dragBlock from './iframe-drag-block.vue'
import dragRender from './iframe-drag-render.vue'

export default {
  components: {
    dragBlock,
    dragRender,
  },
  data() {
    return {
      newList: [
        {
          name: 'column',
          nested: true,
          list: [[], [], []],
        },
        {
          name: 'image',
        },
        {
          name: 'video',
        },
        {
          name: 'button',
        },
        {
          name: 'text',
        },
        {
          name: 'swiper',
        },
        {
          name: 'blank',
        },
      ],
      list: [],
      preList: [],
    }
  },
  methods: {
    beforeChange(e) {
      this.preList = e
    },
  },
}
</script>

<style lang="scss" scoped></style>
