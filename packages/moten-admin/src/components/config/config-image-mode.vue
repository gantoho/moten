<template>
  <div class="config-background">
    <el-form-item size="small" :label="label"> </el-form-item>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  formData: {
    type: Object,
    default: () => {},
  },
})

const emit = defineEmits(['callback'])

const { data, formData } = toRefs(props)
const { label, defaultValue } = data.value
</script>

<style lang="scss" scoped>
.config-background {
  :deep(.el-button) {
    border-radius: var(--border-radius);
  }
}
</style>
