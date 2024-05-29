<template>
  <div class="edit">
    <edit-header />
    <div class="container">
      <edit-block />
      <edit-render />
      <edit-config />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.edit {
  width: 100%;
  overflow-x: hidden;
  user-select: none;
  --edit-header-height: 64px;
  --edit-block-width: 300px;
  .container {
    display: flex;
    width: 100%;
    min-width: 100%;
    &.mobile-background {
      background: var(--color-bg);
    }
  }
}
</style>
