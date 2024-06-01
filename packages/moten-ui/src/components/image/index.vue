<template>
  <div>
    <h1 class="title">标题</h1>
    <img :src="src" class="image" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'mo-image',
  props: {
    src: String,
  },
  data() {
    return {
      value: 1111,
    }
  },
  mounted() {
    console.warn(this.value)
  },
})
</script>

<style lang="scss" scoped>
.image {
  width: 300px;
  height: 200px;
  margin: 0 auto;
}
.title {
  font-size: 50px;
  color: red;
}
@container (max-width: 600px) {
  .title {
    font-size: 20px;
    color: blue;
  }
}
</style>
