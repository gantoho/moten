<template>
  <transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
  >
    <slot />
  </transition>
</template>

<script setup lang="ts">
const transitionStyle = 'all 0.15s ease-in-out'
const onBeforeEnter = (el: HTMLDivElement) => {
  el.style.transition = transitionStyle
  el.style.height = '0'
  el.style.opacity = '0'
}
const onEnter = (el: HTMLDivElement) => {
  if (el.scrollHeight !== 0) {
    el.style.height = `${el.scrollHeight}px`
  } else {
    el.style.height = ''
  }
  el.style.opacity = '1'
  el.style.overflow = 'hidden'
}
const onAfterEnter = (el: HTMLDivElement) => {
  el.style.transition = ''
  el.style.opacity = ''
  el.style.height = ''
}
const onBeforeLeave = (el: HTMLDivElement) => {
  el.style.height = `${el.scrollHeight}px`
  el.style.opacity = '1'
  el.style.overflow = 'hidden'
}
const onLeave = (el: HTMLDivElement) => {
  if (el.scrollHeight !== 0) {
    el.style.transition = transitionStyle
    el.style.height = '0'
    el.style.opacity = '0'
  }
}
const onAfterLeave = (el: HTMLDivElement) => {
  el.style.transition = ''
  el.style.height = ''
  el.style.opacity = ''
}
</script>
