<template>
  <div class="edit-config-block">
    <edit-config-render :list="list" @callback="callback">
      <div v-if="!edit.currentSelect">
        <el-empty description="请在左侧拖入组件后，点击选中组件">
          <template #image>
            <Icon :icon="icon.dragBlank" class="icon" />
          </template>
        </el-empty>
      </div>
    </edit-config-render>
  </div>
</template>

<script lang="ts" setup>
import deepmerge from 'deepmerge'
import { omit } from 'lodash'
import { ref, watch } from 'vue'
import { blockSchema } from '@/config/schema'
import { useEditStore } from '@/stores/edit'
import { findNodeById } from './nested'
import { Icon } from '@iconify/vue'
import icon from '@/config/icon'

const edit = useEditStore()

const list = ref<any[]>([])

watch(
  () => edit.currentSelect,
  (value: any) => {
    const _blockSchema = blockSchema as any
    const properties = _blockSchema?.[value?.code]?.properties as any
    if (!value || !properties) {
      list.value = []
      return
    }

    list.value = Object.values(properties).map((item: any, index) => {
      const parentKey = Object.keys(properties)[index]
      const { formData, id } = value
      const { groupName } = item.properties
      const pickResult: object = omit(item.properties, ['groupName'])
      const listResult = Object.fromEntries(
        Object.entries(pickResult).map(([key, value]) => [
          key,
          { ...value, key, parentKey, id, formData: formData?.[parentKey]?.[key] || {} },
        ]),
      )
      return {
        groupName,
        list: [...Object.values(listResult)],
      }
    })
  },
  {
    immediate: true,
  },
)

const callback = (params: any) => {
  const { data, id } = params
  if (!id) return
  const blockConfig = edit.blockConfig || []
  const newBlockConfig = findNodeById(blockConfig, id, (params: any) => {
    let { array, index, node } = params
    array[index].formData = deepmerge(node.formData, data)
  })
  edit.setBlockConfig(newBlockConfig)
}
</script>

<style lang="scss" scoped>
.edit-config-block {
  width: 100%;
}
</style>
