<template>
  <div class="flex jc">
    <draggable :list="list" animation="200" item-key="id" ghost-class="ghost-class" :move="move">
      <template #item="{ element }">
        <div class="block-item">
          <img
            src="https://raw.githubusercontent.com/SortableJS/Vue.Draggable/master/logo.svg?sanitize=true"
            style="width: 20px; height: 20px"
          />
          <div>{{ element.name }}</div>
        </div>
      </template>
    </draggable>
    <pre v-html="JSON.stringify(list, null, 3)" style="font-size: 8px"></pre>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      list: [
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
      ],
    }
  },
  methods: {
    move(e: any) {
      const { futureIndex, index } = e.draggedContext
      console.warn(`✅ - file: index.vue:45 - move - futureIndex:`, index, futureIndex)

      return true
    },
  },
}
</script>

<style lang="scss" scoped>
.ghost-class {
  background: #d1ebfb;
  color: rgb(90, 153, 255);
  .ghost-class_show_box {
    height: 50px;
  }
}
.block-item {
  border: 1px solid;
  min-width: 100px;
  text-align: center;
  cursor: grab;
}
</style>
