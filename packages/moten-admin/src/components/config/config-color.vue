<template>
  <div class="config-color">
    <el-form-item size="small" :label="label">
      <el-button
        v-for="(item, index) in colorType"
        :key="index"
        :type="isSelected(item.code)"
        plain
        size="small"
        @click="selectType(item.code)"
      >
        {{ item.name }}
      </el-button>
      <div v-if="selectColorType === 'color'">这里会渲染颜色选择器</div>
    </el-form-item>
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
  viewport: {
    type: String,
    default: 'desktop',
  },
})

const emit = defineEmits(['callback'])

const { data, formData } = toRefs(props)
const { label, defaultValue, parentKey, key } = data.value

const colorType = ref([
  { code: 'no', name: '无' },
  { code: 'color', name: '颜色' },
])
const selectColorType = ref(colorType.value[0].code)

const isSelected = (code: string) => {
  return selectColorType.value === code ? 'primary' : ''
}

const selectType = (code: string) => {
  selectColorType.value = code
  emit('callback', {
    [parentKey]: {
      [key]: {
        [props.viewport]: code === 'no' ? '' : 'red',
      },
    },
  })
}
</script>

<style lang="scss" scoped>
.config-color {
  :deep(.el-button) {
    border-radius: var(--border-radius);
  }
}
</style>
