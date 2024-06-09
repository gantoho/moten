<template>
  <div class="edit-config-block">
    <edit-config-render :list="list" @callback="callback">
      <div v-if="!edit.currentSelect">
        <el-empty description="请在左侧拖入组件后，点击选中组件">
          <template #image>
            <v-icon icon="dragBlank" class="icon" />
          </template>
        </el-empty>
      </div>
    </edit-config-render>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/stores/edit'
import { ref, watch } from 'vue'
import { type BlockSchemaKeys, blockSchema } from '@/config/schema'

const edit = useEditStore()

const list = ref<any[]>([])

watch(
  () => edit.currentSelect,
  (value) => {
    const code = value?.code as BlockSchemaKeys
    const properties = blockSchema[code].properties
    if (!value || !properties) {
      list.value = []
      return
    }

    list.value = Object.values(properties).map((item, index) => {
      const { formData, id } = value
      console.warn(Object.entries(item.properties))
      Object.entries(item.properties).map(([key, value]) => {
        return [key, { ...value, id, key, formData: formData[key] || {} }]
      })

      return {}
    })
  },
  {
    immediate: true,
  },
)

const callback = (params: any) => {}
</script>

<style lang="scss" scoped>
.edit-config-block {
  width: 100%;
}
</style>
