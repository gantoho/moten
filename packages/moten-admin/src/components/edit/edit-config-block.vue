<template>
  <div class="edit-config-block">
    <edit-config-render :list="list" @callback="callback">
      <div v-if="!edit.currentSelect">
        <el-empty description="请在左侧拖入组件后，点击选中组件" />
      </div>
    </edit-config-render>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { omit } from 'lodash'
import { useEditStore } from '@/stores/edit'
import { blockSchema } from '@/config/schema'

const edit = useEditStore()

const list = ref<any[]>([])

watch(
  () => edit.currentSelect,
  (value) => {
    if (value) {
      if (!blockSchema[value?.code]?.properties) {
        list.value = []
        return
      }

      list.value = Object.values(blockSchema[value?.code]?.properties).map((item) => {
        const { groupName } = item.properties
        const pickResult: object = omit(item.properties, ['groupName'])
        return {
          groupName,
          list: [...Object.values(pickResult)],
        }
      })
    } else {
      list.value = []
    }
  },
)

const callback = (data) => {
  console.warn('component', data)
}
</script>

<style lang="scss" scoped>
.edit-config-block {
  width: 100%;
}
</style>
