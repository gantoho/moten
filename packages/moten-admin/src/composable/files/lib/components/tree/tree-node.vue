<template>
  <li>
    <a
      @click="onNodeClick"
      ref="nodeItem"
      :class="{ active: props.node[props.nodeKey] === props.currentKey }"
      :style="{ paddingLeft: `${(props.level + 1) * 10}px` }"
    >
      <span
        :class="[
          `icon-switch`,
          {
            open: open,
            'hide-icon': props.node[props.childrenKey] && !props.node[props.childrenKey].length,
          },
        ]"
      ></span>
      <slot />
      <span class="folder-name">{{ props.node.name }}</span>
    </a>
    <fade-slide-transition>
      <ul v-if="props.node[props.childrenKey]?.length && open">
        <tree-node
          v-for="item in props.node[props.childrenKey]"
          :node="item"
          :key="item[props.nodeKey]"
          :node-key="props.nodeKey"
          :children-key="props.childrenKey"
          :current-key="props.currentKey"
          :level="props.level + 1"
          :expand="props.expand"
          @node-click="val => $emit('nodeClick', val)"
        >
          <slot />
        </tree-node>
      </ul>
    </fade-slide-transition>
  </li>
</template>

<script setup lang="ts" name="TreeNode">
import { ref } from 'vue'
import { treeNodeProps, treeNodeEmits } from './tree-node'
import FadeSlideTransition from '../fade-slide-transition.vue'
const props = defineProps(treeNodeProps)
const emit = defineEmits(treeNodeEmits)

const open = ref(props.expand && props.node[props.childrenKey]?.length)

const onNodeClick = () => {
  open.value = !open.value
  emit('nodeClick', props.node)
}
</script>
