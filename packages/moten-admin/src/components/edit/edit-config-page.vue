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

const properties = pageSchema.properties
const pageRender = Object.values(properties).map((item, index) => {
  const parentKey = Object.keys(properties)[index]
  const formData = edit.pageConfig as any
  const { groupName } = item.properties
  const pickResult: object = omit(item.properties, ['groupName'])
  const listResult = Object.fromEntries(
    Object.entries(pickResult).map(([key, value]) => [
      key,
      { ...value, key, parentKey, formData: formData?.[parentKey]?.[key] || {} },
    ]),
  )
  return {
    groupName,
    list: [...Object.values(listResult)],
  }
})

const callback = (params: any) => {
  const { data, id } = params
  if (id) return
  const formData = edit.pageConfig || {}
  const overwriteMerge = (_destinationArray: any, sourceArray: any, _options: any) => sourceArray
  edit.setPageConfig(deepmerge(formData, data, { arrayMerge: overwriteMerge }))
}
</script>

<style lang="scss" scoped>
.edit-config-page {
  width: 100%;
}
</style>
