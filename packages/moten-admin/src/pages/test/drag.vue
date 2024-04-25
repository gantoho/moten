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
      <div v-if="isRender && element.nested && level < 2" class="block-nested-render">
        <div class="flex">
          <drag
            v-for="(item, index) in element.children"
            :key="element.id + '-' + index"
            :type="type"
            :list="item"
            :level="level + 1"
            :group="group"
            :style="`flex: 0 0 ${100 / element.children.length}%`"
            style="border: 1px solid red; background: #ffa8a8; min-height: 100px; color: red"
            :class="nestedClass"
          />
        </div>
      </div>
      <div v-else-if="isRender" class="block-render">
        <component
          :is="renderComponentCode(element)"
          src="https://raw.githubusercontent.com/SortableJS/Vue.Draggable/master/logo.svg?sanitize=true"
        />
      </div>
      <div v-else class="block-list">
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
import { COMPONENT_PREFIX } from '@/config/config'

export default {
  name: 'drag',
  props: {
    list: {
      type: Array,
      required: true,
      default: () => [],
    },
    type: {
      type: String,
      default: 'block',
      validator: (value: string) => {
        return ['block', 'render'].includes(value)
      },
    },
    group: {
      type: [String, Object],
      default: 'group',
    },
    sort: {
      type: Boolean,
      default: true,
    },
    level: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      nestedClass: 'nested-container',
    }
  },
  computed: {
    isRender() {
      return this.type === 'render'
    },
    renderComponentCode() {
      return (element: any) => {
        return COMPONENT_PREFIX + '-' + element.code
      }
    },
  },
  methods: {
    clone(e: any) {
      const value = JSON.parse(JSON.stringify({ id: nanoid(8), ...e }))
      return value
    },
    move(e: any) {
      const classList = Array.from(e.to?.classList)
      const isRelatedNested = classList?.includes(this.nestedClass)
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
.item {
  border: 1px solid;
  min-width: 100px;
  text-align: center;
  cursor: move;
}
</style>
