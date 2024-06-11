<template>
  <div class="edit-config-render">
    <el-form label-width="auto" ref="ruleFormRef" :model="form" :rules="rules">
      <div v-for="(item, index) in list" :key="index">
        <component
          v-if="getComponent(item)"
          :is="getComponent(item)"
          :data="item"
          :viewport="edit.viewport"
          @callback="callback"
          @update="update"
        />
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { batchDynamicComponents } from '@/utils/index'
import { useEditStore } from '@/stores/edit'
const edit = useEditStore()

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  schema: {
    type: Object,
    default: () => {},
  },
})

const ruleFormRef = ref()
const form = ref<any>({})

const transfer = (b, key = 'default'): void => {
  return Object.fromEntries(
    Object.entries(b.properties).map((item: any) => {
      const [keyP, valueP] = item
      if (valueP.properties) return [keyP, transfer(valueP, key)]
      return [keyP, valueP[key]]
    }),
  )
}
const rules = ref(transfer(props.schema, 'rules'))

const update = (params: any) => {
  const list = Object.entries(params || {})
  list.forEach(([key, value]) => {
    form.value[key] = value
  })
}
const submitForm = () => {
  setTimeout(() => {
    if (!ruleFormRef.value) return
    ruleFormRef.value.validate((valid: any, fields: any) => {
      // if (valid) {
      //   console.warn('form submit!')
      //   return
      // }
      // console.warn('form error !', fields)
    })
  }, 100)
}

submitForm()
watch(
  () => props.list,
  () => {
    submitForm()
  },
)

const emit = defineEmits(['callback'])

const callback = (data: any) => {
  emit('callback', data)
}

const getComponent = (item: any) => {
  const code = item.properties[edit.viewport].code
  return batchDynamicComponents(code, import.meta.glob('@/components/config/**/*.vue'))
}
</script>

<style lang="scss" scoped>
.edit-config-render {
  overflow-y: auto;
  width: 100%;

  :deep(.el-form) {
    padding-left: 14px;
    padding-right: 14px;
    padding-bottom: 14px;
  }
  :deep(.el-form-item__label) {
    justify-content: flex-start;
  }
}
</style>
