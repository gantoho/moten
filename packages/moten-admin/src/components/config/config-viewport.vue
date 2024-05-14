<template>
  <div class="config-viewport">
    <el-form-item :label="label">
      <config-base-tab :data="list" @change="change">
        <template #default="{ item }">
          <v-icon :src="item.icon" :content="item.content" />
        </template>
      </config-base-tab>
    </el-form-item>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue'
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
const { label, defaultValue, parentKey, key, id, formData } = data.value

const list = ref([
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

// TODO
const _formData = formData?.[parentKey]?.[key] || ''
const defaultValueIndex = list.value.findIndex((v) => v.value === _formData || defaultValue)
list.value[defaultValueIndex].default = true

const change = (value: string) => {
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
}
</script>

<style lang="scss" scoped>
.config-viewport {
  :deep(.el-form-item) {
    align-items: center;
  }
}
</style>
