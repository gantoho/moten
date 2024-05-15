<template>
  <div class="config-column">
    <el-form-item>
      <div>
        <div v-for="(item, index) in column" :key="index">
          <input type="number" />
        </div>
      </div>
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
const { formData, defaultValue, parentKey, key, id } = data.value
const column = ref([])

watch(
  () => formData,
  (value) => {
    column.value = value?.[props.viewport] || defaultValue || ''
  },
  {
    immediate: true,
  },
)

watch(column, (value) => {
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
.config-column {
  :deep(.el-input__wrapper) {
    background: var(--color-config-block-bg);
  }
}
</style>
