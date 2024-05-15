<template>
  <div class="config-viewport">
    <el-form-item :label="label">
      <config-base-tab :data="list" @change="change">
        <template #default="{ item }">
          <v-icon :src="item.icon" :content="item.content" class="icon" />
        </template>
      </config-base-tab>
    </el-form-item>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue'
import icon from '@/config/icon'

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
const { parentKey, key, id, formData } = data.value
const { label, defaultValue } = data.value.properties[props.viewport]

interface ViewportListType {
  icon: string
  content: string
  value: 'all' | 'mobile' | 'desktop'
  default: boolean
}

const list = ref<ViewportListType[]>([
  {
    icon: icon.allViewport,
    content: '多端显示',
    value: 'all',
    default: false,
  },
  {
    icon: icon.desktop,
    content: '仅桌面端显示',
    value: 'desktop',
    default: false,
  },
  {
    icon: icon.mobile,
    content: '仅移动端显示',
    value: 'mobile',
    default: false,
  },
])

const callback = (value: any) => {
  emit('callback', {
    data: {
      [parentKey]: {
        [key]: value,
      },
    },
    id,
  })
}
const change = (value: ViewportListType['value']) => {
  const rules = {
    all: { desktop: true, mobile: true },
    desktop: { desktop: true, mobile: false },
    mobile: { desktop: false, mobile: true },
  }
  callback(rules[value])
}
watch(
  () => formData,
  (value) => {
    const _formData = value?.[parentKey]?.[key]
    const defaultValueIndex = Math.max(
      list.value.findIndex((v) => v.value === _formData || defaultValue),
      0,
    )
    list.value[defaultValueIndex].default = true

    change(list.value[defaultValueIndex].value)
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss" scoped>
.config-viewport {
  :deep(.el-form-item) {
    align-items: center;
  }
  .icon {
    :deep(.image-box) {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
