<template>
  <div class="edit-config-page">
    <edit-config-render :list="edit.pageConfig" @callback="callback"></edit-config-render>
  </div>
</template>

<script lang="ts" setup>
import { omit } from 'lodash'
import { useEditStore } from '@/stores/edit'
import { pageSchema } from '@/config/schema'

const edit = useEditStore()

const pageConfig = Object.values(pageSchema.properties).map((item) => {
  const { groupName } = item.properties
  const pickResult: object = omit(item.properties, ['groupName'])
  return {
    groupName,
    list: [...Object.values(pickResult)],
  }
})
edit.setPageConfig(pageConfig)

const callback = (data: any) => {
  edit.updatePageData(data)
}
</script>

<style lang="scss" scoped>
.edit-config-page {
  width: 100%;
}
</style>
