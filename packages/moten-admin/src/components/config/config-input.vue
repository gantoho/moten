<template>
  <div class="config-input">
    <el-form-item :label="label">
      <el-input v-model="input" :placeholder="placeholder" class="input" />
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
const { label, placeholder, formData, defaultValue, parentKey, key, id } = data.value
const input = ref('')

watch(
  () => formData,
  (value) => {
    input.value = value?.[props.viewport] || defaultValue || ''
  },
  {
    immediate: true,
  },
)

watch(input, (value) => {
  let data = {}
  const _value = value || ''
  if (Object.values(formData || {}).length < 2) data = { desktop: _value, mobile: _value }
  else data = { [props.viewport]: _value }

  emit('callback', {
    data: {
      [parentKey]: {
        [key]: data,
      },
    },
    id,
  })
})
</script>

<style lang="scss" scoped>
.config-input {
  :deep(.el-input__wrapper) {
    background: var(--color-config-block-bg);
  }
}
</style>
