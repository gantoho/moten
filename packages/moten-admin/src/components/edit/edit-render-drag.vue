<template>
  <draggable
    :list="list"
    :group="group"
    :sort="sort"
    animation="200"
    item-key="id"
    ghost-class="ghost-class"
    class="edit-render-drag"
    :move="move"
  >
    <template #item="{ element }">
      <div class="element">
        <div
          v-if="element.nested && level < 2"
          class="block-nested-render"
          :class="activeClass(element)"
          @click.stop="edit.setCurrentSelect(element)"
          @mouseenter="hoverId = element.id"
          @mouseleave="hoverId = ''"
        >
          <transition name="fade">
            <edit-render-hover
              v-show="hoverId === element.id"
              :id="element.id"
              @copy="copy"
              @clear="clear"
            />
          </transition>
          <component
            :is="renderComponentCode(element)"
            :key="element.id"
            :data="element.formData"
            :list="element.children"
          >
            <template #default="{ item, index }">
              <edit-render-drag
                :key="element.id + '-' + index"
                :list="item"
                :level="level + 1"
                :group="group"
                class="nested-item"
                :class="nestedClass"
              />
            </template>
          </component>
        </div>
        <div
          v-else
          class="block-render"
          :class="activeClass(element)"
          @click.stop="edit.setCurrentSelect(element)"
          @mouseenter="hoverId = element.id"
          @mouseleave="hoverId = ''"
        >
          <transition name="fade">
            <edit-render-hover
              v-show="hoverId === element.id"
              :id="element.id"
              @copy="copy"
              @clear="clear"
            />
          </transition>
          <component :is="renderComponentCode(element)" :data="element.formData" />
        </div>
      </div>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import { computed, markRaw, ref } from 'vue'
import { cloneDeep, isEqual } from 'lodash'
import { nestedClass, move, clone } from './nested'
import { useEditStore } from '@/stores/edit'
import { COMPONENT_PREFIX } from '@/config/config'

const edit = useEditStore()

defineOptions({
  name: 'edit-render-drag',
})

defineProps({
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
  level: {
    type: Number,
    default: 1,
  },
})

const hoverId = ref('')

const renderComponentCode = computed(() => {
  return (element: { code: string }) => {
    return COMPONENT_PREFIX + '-' + element.code
  }
})
const activeClass = computed(() => {
  return (element: { id: string }) => {
    const id: string | null = (edit.currentSelect as any)?.id
    return { 'is-active': element.id === id }
  }
})

const handleNodeById = (arr: Array<any>, nodeId: String, type: 'copy' | 'clear') => {
  if (!arr) return arr
  const array = cloneDeep(arr)
  for (let i = 0; i < array.length; i++) {
    const node = array[i]
    if (node.id === nodeId) {
      // 如果找到了匹配的节点，直接删除并返回
      if (type === 'copy') array.splice(i, 0, clone(node))
      if (type === 'clear') array.splice(i, 1)
      return array
    }
    if (node.children && node.children.length > 0) {
      // 如果节点有子节点，则递归调用 handleNodeById 函数
      for (let j = 0; j < node.children.length; j++) {
        if (!node.children[j].length) continue
        const updatedChildren = handleNodeById(node.children[j], nodeId, type)
        if (!isEqual(updatedChildren, node.children[j])) {
          // 如果子节点数组有更新，则更新当前节点的子节点数组
          node.children[j] = updatedChildren
          return array // 返回更新后的数组
        }
      }
    }
  }
  return array // 如果未找到匹配的节点，则返回原始数组
}

const copy = (id: string) => {
  if (!edit.blockConfig) return
  const blockConfig = markRaw(edit.blockConfig)
  const newBlockConfig = handleNodeById(blockConfig, id, 'copy')
  edit.setCurrentSelect(null)
  edit.setBlockConfigTemp(newBlockConfig)
}
const clear = (id: string) => {
  if (!edit.blockConfig) return
  const blockConfig = markRaw(edit.blockConfig)
  const newBlockConfig = handleNodeById(blockConfig, id, 'clear')
  edit.setCurrentSelect(null)
  edit.setBlockConfigTemp(newBlockConfig)
}
</script>

<style lang="scss" scoped>
.edit-render-drag {
  .element {
    position: relative;
  }
}
.nested-item {
  border: 1px solid var(--color-edit-render-block-border);
  background: var(--color-edit-render-block-bg);
  height: 100%;
  min-height: inherit;
  & + .nested-item {
    border-left: 0;
  }
}
.block-nested-render,
.block-render {
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
}
.block-nested-render {
  &:hover,
  &.is-active {
    // 注意不能像block-render做成after，否则组件无法拖入嵌套容器里
    border: 1px dashed var(--color-edit-render-block-border-hover);
  }
}
.block-render {
  position: relative;
  &:hover,
  &.is-active {
    // 在表面蒙上一层，加上边框，防止组件可以交互
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 1px dashed var(--color-edit-render-block-border-hover);
    }
  }
}
</style>
