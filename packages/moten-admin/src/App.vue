<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { RouterView } from 'vue-router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export default {
  components: {
    RouterView,
  },
  setup() {
    return {
      zhCn,
    }
  },
}
</script>
