<script setup lang="ts"></script>

<template>
  <div>
    <router-view></router-view>
    <a href="https://baidu.com">这是红色，如果被组件库污染则为蓝色</a>
    <router-link to="/about">Go to Home</router-link>
    <mo-image
      :data="{
        content: {
          src: {
            desktop: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            mobile: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
          },
          link: {
            desktop: '/about',
            mobile: '/about',
          },
        },
      }"
    />
  </div>
</template>
