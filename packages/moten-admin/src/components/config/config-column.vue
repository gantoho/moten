<template>
  <div class="config-column">
    <el-form-item>
      <div class="list">
        <div v-for="(item, index) in column" :key="index" class="item">
          <input :value="item" :min="0" :max="1" class="input" />
        </div>
        <div class="item action">
          <Icon v-if="isShowAdd" :icon="icon.add" class="icon" @click="add" />
          <Icon v-if="isShowRemove" :icon="icon.subtract" class="icon" @click="remove" />
        </div>
      </div>
    </el-form-item>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs, watch } from 'vue'
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
const { formData, parentKey, key, id } = data.value
const { defaultValue, minItems, maxItems } = data.value.properties[props.viewport]
const realDefaultValue = Array.from({ length: minItems }, (_) => defaultValue)

const column = ref<number[]>([])
const isShowAdd = computed(() => column.value.length < maxItems)
const isShowRemove = computed(() => column.value.length > minItems)

watch(
  formData,
  (value) => {
    column.value = value?.[props.viewport] || realDefaultValue
  },
  {
    immediate: true,
  },
)

watch(column, (value) => {
  if (value.length > maxItems) return

  let data = {}
  const _value = value
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

const add = () => {
  const { length } = column.value
  if (length === maxItems) return
  column.value = Array.from({ length: length + 1 }, (_) => 1 / (length + 1))
}
const remove = () => {
  const { length } = column.value
  if (length === 1) return
  column.value.pop()
}
</script>

<style lang="scss" scoped>
.config-column {
  .list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    .item {
      flex: 1;
      flex-shrink: 0;
      background: var(--color-config-block-bg);
      border: 1px dashed var(--color-border);
      border-right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      text-align: center;
      cursor: pointer;
      font-size: 13px;
      &.action {
        flex-direction: column;
      }
      &:first-child {
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
      }
      &:last-child {
        border: 1px dashed var(--color-border);
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
      }
      .input {
        width: 100%;
        height: 38px;
        padding: 8px;
        text-align: center;
        background: transparent;
      }
      .icon {
        width: 14px;
        height: 14px;
        &:hover {
          background-color: rgb(177, 177, 177);
          border-radius: 3px;
        }
      }
    }
  }
}
</style>
