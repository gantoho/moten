<template>
  <div id="app">
    <router-view></router-view>
    这是组件
    <router-link to="/about">Go to Foo</router-link>
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

<script>
export default {
  name: 'App',
}
</script>
