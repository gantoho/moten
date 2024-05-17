<template>
  <input type="text" v-model="model" />
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useFormItem } from 'element-plus'

const { formItem } = useFormItem()

const model = defineModel({ type: String })

watch(
  () => model.value,
  () => {
    formItem?.validate('change').catch((err) => console.warn(err))
    formItem?.validate('blur').catch((err) => console.warn(err))
  },
)
</script>
