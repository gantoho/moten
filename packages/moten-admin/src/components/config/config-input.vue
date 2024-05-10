<template>
  <div class="config-background">
    <el-form-item size="small" :label="label">
      <el-input v-model="input" style="width: 240px" placeholder="Please input" />
    </el-form-item>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
  formData: {
    type: Object,
    default: () => {},
  },
  viewport: {
    type: String,
    default: 'mobile',
  },
})

const emit = defineEmits(['callback'])

const { data, formData } = toRefs(props)
console.warn(`✅ - file: config-input.vue:26 - data:`, props)
const { label } = data.value
const input = ref(formData.value[label])

watch(
  input,
  (value) => {
    emit('callback', {
      text: {
        [props.viewport]: value,
      },
    })
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss" scoped>
.config-background {
  :deep(.el-button) {
    border-radius: var(--border-radius);
  }
}
</style>
