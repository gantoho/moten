<template>
  <div class="config-files">
    <el-form-item :label="label">
      <img v-if="url" :src="url" class="image" @click="fileClick" />
      <div v-else class="file" @click="fileClick">
        <Icon :icon="icon.upload" class="icon" />
      </div>
    </el-form-item>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue'
import { Icon } from '@iconify/vue'
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
const { label, formData, defaultValue, parentKey, key, id } = data.value
const url = ref('')

watch(
  () => formData,
  (value) => {
    url.value = value?.[props.viewport] || defaultValue || ''
  },
  {
    immediate: true,
  },
)

watch(url, (value) => {
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

const fileClick = () => {
  // TODO 测试
  const list = [
    'https://gips2.baidu.com/it/u=600796006,4247107674&fm=3042&app=3042&f=JPEG&wm=1,huayi,0,0,13,9&wmo=0,0',
    'https://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960',
    'https://gips0.baidu.com/it/u=3554802836,624793446&fm=3042&app=3042&f=JPEG&wm=1,huayi,0,0,13,9&wmo=0,0',
    'https://gips2.baidu.com/it/u=3681636179,223758822&fm=3042&app=3042&f=JPEG&wm=1,huayi,0,0,13,9&wmo=0,0',
  ]
  const randomIndex = Math.floor(Math.random() * list.length)
  url.value = list[randomIndex]
}
</script>

<style lang="scss" scoped>
.config-files {
  .file,
  .image {
    width: 80px;
    height: 80px;
    border: 1px dashed var(--color-border);
    border-radius: var(--border-radius);
    background: var(--color-config-block-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .image {
    border: 0;
    width: 82px;
    height: 82px;
    object-fit: cover;
  }
  .icon {
    width: 26px;
    height: 26px;
  }
}
</style>
