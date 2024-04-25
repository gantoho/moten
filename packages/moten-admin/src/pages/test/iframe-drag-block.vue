<template>
  <draggable
    :list="list"
    :group="group"
    :sort="sort"
    animation="200"
    item-key="id"
    ghost-class="ghost-class"
    :clone="clone"
    :move="move"
  >
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
</template>

<script lang="ts">
import { nanoid } from '@/utils/index'

export default {
  name: 'iframeDragBlock',
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
      pre: {},
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
    clone(e: any) {
      const value = JSON.parse(JSON.stringify({ id: nanoid(8), ...e }))
      this.pre = value
      return value
    },
    move(e: any) {
      const classList = Array.from(e.to.classList)
      const futureIndex = e.draggedContext.futureIndex
      const pre = { ...this.pre, name: 'ghost' }

      const isRelatedNested = classList?.includes(this.nestedClass)
      const list = JSON.parse(JSON.stringify(this.renderList))

      if (isRelatedNested) {
        const [, , columnId, columnChildIndex] = classList
          ?.find((v: any) => v?.startsWith(this.nestedIdIndexClassPrefix))
          ?.split('-')

        if (!columnId) return true

        list.forEach((item: any) => {
          if (item.id === columnId) {
            item.list[columnChildIndex].splice(futureIndex, 0, pre)
            return
          }
        })

        this.$emit('beforeChange', list)
      } else {
        list.splice(futureIndex, 0, pre)
        this.$emit('beforeChange', list)
      }

      if (e.draggedContext.element?.nested && isRelatedNested) return false
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
