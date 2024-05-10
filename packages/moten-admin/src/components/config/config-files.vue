<template>
  <div class="config-background">
    <el-form-item size="small" :label="label">
      <el-button
        v-for="(item, index) in backgroundType"
        :key="index"
        :type="isSelected(item.code)"
        plain
        size="small"
        @click="selectType(item.code)"
      >
        {{ item.name }}
      </el-button>
      <div v-if="selectBackgroundType === 'color'">这里会渲染颜色选择器</div>
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
})

const emit = defineEmits(['callback'])

const { data, formData } = toRefs(props)
const { label, defaultValue } = data.value

const backgroundType = ref([
  { code: 'no', name: '无' },
  { code: 'color', name: '颜色' },
])
const selectBackgroundType = ref(backgroundType.value[0].code)

const isSelected = (code: string) => {
  return selectBackgroundType.value === code ? 'primary' : ''
}

const init = () => {}
const initSet = () => {}
const selectType = (code: string) => {
  selectBackgroundType.value = code

  emit('callback', {
    background: code === 'no' ? '' : 'red',
  })
}
</script>

<style lang="scss" scoped>
.config-background {
  :deep(.el-button) {
    border-radius: var(--border-radius);
  }
}
</style>
