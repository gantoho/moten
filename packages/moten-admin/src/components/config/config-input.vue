<template>
  <div class="config-input">
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
    default: 'desktop',
  },
})

const emit = defineEmits(['callback'])

const { data, formData } = toRefs(props)
const { label, parentKey, key } = data.value
const input = ref(formData.value[label])

watch(input, (value) => {
  emit('callback', {
    [parentKey]: {
      [key]: {
        [props.viewport]: value || '',
      },
    },
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
