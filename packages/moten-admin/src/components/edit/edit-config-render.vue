<template>
  <div class="edit-config-render">
    <el-form label-width="auto">
      <el-collapse v-model="activeNames">
        <transition-group name="fade">
          <el-collapse-item
            v-for="(item, index) in list"
            :key="index"
            :title="item.groupName.default"
            :name="index"
          >
            <div v-for="(cItem, cIndex) in item.list" :key="index + '-' + cIndex">
              <div v-show="!edit.isMobileViewport">
                <component
                  v-if="getComponent(cItem.code)"
                  :is="getComponent(cItem.code)"
                  :data="cItem"
                  :form-data="{}"
                  viewport="desktop"
                  @callback="callback"
                />
              </div>
              <div v-show="edit.isMobileViewport">
                <component
                  v-if="getComponent(cItem.code)"
                  :is="getComponent(cItem.code)"
                  :data="cItem"
                  :form-data="{}"
                  viewport="mobile"
                  @callback="callback"
                />
              </div>
            </div>
          </el-collapse-item>
        </transition-group>
      </el-collapse>
      <slot />
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { batchDynamicComponents } from '@/utils/index'
import { useEditStore } from '@/stores/edit'
const edit = useEditStore()

const props = defineProps({
  list: {
    type: Array,
    default: [],
  },
})

const emit = defineEmits(['callback'])

const activeNames = ref<number[]>([])

watch(
  () => props.list,
  (value) => {
    const map = value.map((v, i) => i)
    activeNames.value = map
  },
  {
    immediate: true,
  },
)

const callback = (data) => {
  emit('callback', data)
}

const getComponent = (code: string) =>
  batchDynamicComponents(code, import.meta.glob('@/components/config/**/*.vue'))
</script>

<style lang="scss" scoped>
.edit-config-render {
  overflow-y: auto;
  width: 100%;

  :deep(.el-collapse-item__header) {
    padding-left: 14px;
    font-size: 14px;
  }
  :deep(.el-collapse-item__content) {
    padding-left: 14px;
    padding-right: 14px;
    padding-bottom: 14px;
  }
  :deep(.el-form-item__label) {
    justify-content: flex-start;
  }
}
</style>
