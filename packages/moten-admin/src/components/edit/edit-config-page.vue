<template>
  <div class="edit-config-page">
    <edit-config-render :list="edit.pageConfig" @callback="callback" />
  </div>
</template>

<script lang="ts" setup>
import { omit } from 'lodash'
import { useEditStore } from '@/stores/edit'
import { pageSchema } from '@/config/schema'
import { computed, watch } from 'vue'

const edit = useEditStore()

const pageConfig = computed(() => {
  return Object.values(pageSchema.properties).map((item) => {
    const { groupName } = item.properties
    const pickResult: object = omit(item.properties, ['groupName'])
    const listResult = Object.fromEntries(
      Object.entries(pickResult).map(([key, value]) => [key, { ...value, key, formData: {} }]),
    )
    return {
      groupName,
      list: [...Object.values(listResult)],
    }
  })
})

watch(pageConfig, (val) => {
  edit.setPageConfig(val)
})

const callback = (data: any) => {
  console.warn(data)
}
</script>

<style lang="scss" scoped>
.edit-config-page {
  width: 100%;
}
</style>
