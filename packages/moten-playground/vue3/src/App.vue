<script setup lang="ts"></script>

<template>
  <div>
    <a href="https://baidu.com">这是红色，如果被组件库污染则为蓝色</a>
    <de-image
      :data="{ src: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' }"
    />
  </div>
</template>
