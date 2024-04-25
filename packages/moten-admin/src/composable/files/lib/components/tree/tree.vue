<template>
  <div class="page-designer__tree">
    <ul>
      <tree-node
        v-for="item in props.data"
        :node="item"
        :key="item.path"
        :node-key="props.nodeKey"
        :children-key="props.childrenKey"
        :current-key="props.currentKey"
        :level="0"
        :expand="props.expand"
        @node-click="val => $emit('nodeClick', val)"
      >
        <slot />
      </tree-node>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { treeProps, treeEmits } from './tree'
import TreeNode from './tree-node.vue'
const props = defineProps(treeProps)
const emit = defineEmits(treeEmits)
</script>

<style lang="scss">
.page-designer__tree ul {
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    a {
      display: flex;
      align-items: center;
      height: 31px;
      padding-left: 6px;
      cursor: pointer;
      &:hover {
        background-color: #e5f3ff;
      }
      &.active {
        background: #cce8ff;
        border-color: #99d1ff;
      }
      .folder-name {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .icon-switch {
        font-size: 10px;
        width: 25px;
        min-width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        &::after {
          content: '';
          display: block;
          background-image: url('../../assets/icon/icon-angle-right.svg');
          background-repeat: no-repeat;
          background-position: center;
          background-size: 9px;
          width: 100%;
          height: 100%;
        }
        &.open {
          &::after {
            transform: rotate(90deg);
          }
        }
      }
    }
  }
}
</style>
