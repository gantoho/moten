<template>
  <draggable
    :list="list"
    :group="group"
    :sort="sort"
    animation="200"
    item-key="id"
    ghost-class="ghost-class"
    :move="move"
  >
    <template #item="{ element }">
      <div class="render-item">
        <div style="width: 100%; height: 30px">我是主体</div>

        <div v-if="element.nested && level < 2">
          <div class="flex">
            <iframe-drag-render
              v-for="(item, index) in element.list"
              :key="element.id + '-' + index"
              :list="item"
              :level="level + 1"
              :group="group"
              :style="`flex: 0 0 ${100 / element.list.length}%`"
              style="border: 1px solid red; background: #ffa8a8; min-height: 100px; color: red"
              :class="[nestedClass, nestedIdIndexClass(element.id, index)]"
            />
          </div>
        </div>
      </div>
    </template>
  </draggable>
</template>

<script lang="ts">
export default {
  name: 'iframeDragRender',
  props: {
    list: {
      type: Array,
      required: true,
      default: () => [],
    },
    group: {
      type: [String, Object],
      default: 'group',
    },
    level: {
      type: Number,
      default: 1,
    },
    sort: {
      type: Boolean,
      default: true,
    },
    renderList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      nestedClass: 'nested-container',
      nestedIdIndexClassPrefix: 'nested-container-',
    }
  },
  computed: {
    nestedIdIndexClass() {
      return (id: string, index: string | number) => {
        return `${this.nestedIdIndexClassPrefix}${id}-${index}`
      }
    },
  },
  methods: {
    move(e: any) {
      const selected = e.draggedContext.element

      const classList = Array.from(e.to.classList)
      const futureIndex = e.draggedContext.futureIndex
      const oldIndex = e.draggedContext.index
      const pre = selected

      const isRelatedNested = classList?.includes(this.nestedClass)
      const list = JSON.parse(JSON.stringify(this.renderList))

      if (isRelatedNested) {
        const [, , columnId, columnChildIndex] = classList
          ?.find((v: any) => v?.startsWith(this.nestedIdIndexClassPrefix))
          ?.split('-')

        if (!columnId) return true

        list.forEach((item: any) => {
          if (item.id === columnId) {
            item.list[columnChildIndex].splice(oldIndex, 1)
            item.list[columnChildIndex].splice(futureIndex, 0, pre)
            return
          }
        })

        this.$emit('beforeChange', list)
      } else {
        list.splice(oldIndex, 1)
        list.splice(futureIndex, 0, pre)
        this.$emit('beforeChange', list)
      }

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
.render-item {
  border: 1px solid;
  min-width: 100px;
  text-align: center;
  cursor: grab;
}
</style>
