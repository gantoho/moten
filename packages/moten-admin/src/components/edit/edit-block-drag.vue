<template>
  <draggable
    :list="list"
    :group="group"
    :sort="sort"
    animation="200"
    item-key="id"
    ghost-class="ghost-class"
    class="edit-block-drag"
    :clone="clone"
    :move="move"
  >
    <template #item="{ element }">
      <div class="block-item">
        <img class="block-icon" :src="element.icon" />
        <div class="block-name" v-html="element.name" />
      </div>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import { nanoid } from '@/utils/index'
import { move } from './nested'
import { cloneDeep } from 'lodash'

defineOptions({
  name: 'edit-block-drag',
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
})

const clone = (e: any) => {
  const value = cloneDeep({ ...e, id: nanoid(8) })
  return value
}
</script>

<style lang="scss" scoped>
.edit-block-drag {
  display: flex;
  flex-wrap: wrap;
  .block-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: grab;
    width: 33.333%;
    aspect-ratio: 1 / 1;
    text-align: center;
    padding: 10px;
    border-radius: 6px;
    &:active {
      cursor: grabbing;
    }
    &:hover {
      background: var(--color-block-hover);
      border: 1px solid var(--color-border);
    }
    .block-icon {
      width: 20px;
      height: 20px;
      margin: 0 auto;
    }
    .block-name {
      font-size: 14px;
      line-height: 14px;
      padding-top: 4px;
    }
  }
}
.ghost-class {
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  background: var(--color-active-bg);
  border: 1px solid var(--color-active-text);
  img {
    width: 20px;
    height: 20px;
    margin: 0 auto;
  }
}
</style>
