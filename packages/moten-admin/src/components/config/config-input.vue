<template>
  <div class="config-input">
    <el-form-item size="small" :label="label">
      <el-input v-model="input" style="width: 240px" :placeholder="placeholder" />
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
  viewport: {
    type: String,
    default: 'desktop',
  },
})

const emit = defineEmits(['callback'])

const { data } = toRefs(props)
const { label, placeholder, defaultValue, parentKey, key, id } = data.value
const input = ref(defaultValue || '')

watch(input, (value) => {
  emit('callback', {
    data: {
      [parentKey]: {
        [key]: {
          [props.viewport]: value || '',
        },
      },
    },
    id,
  })
})
</script>

<style lang="scss" scoped>
.config-input {
  :deep(.el-button) {
    border-radius: var(--border-radius);
  }
}
</style>
