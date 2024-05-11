<template>
  <div class="edit-config-page">
    <edit-config-render :list="pageRender" @callback="callback" />
  </div>
</template>

<script lang="ts" setup>
import deepmerge from 'deepmerge'
import { omit } from 'lodash'
import { useEditStore } from '@/stores/edit'
import { pageSchema } from '@/config/schema'

const edit = useEditStore()

const pageRender = Object.values(pageSchema.properties).map((item, index) => {
  const parentKey = Object.keys(pageSchema.properties)[index]
  const { groupName } = item.properties
  const pickResult: object = omit(item.properties, ['groupName'])
  const listResult = Object.fromEntries(
    Object.entries(pickResult).map(([key, value]) => [
      key,
      { ...value, key, parentKey, formData: {} },
    ]),
  )
  return {
    groupName,
    list: [...Object.values(listResult)],
  }
})

const callback = (data: any) => {
  const formData = edit.pageConfig || {}
  edit.setPageConfig(deepmerge(formData, data))
}
</script>

<style lang="scss" scoped>
.edit-config-page {
  width: 100%;
}
</style>
