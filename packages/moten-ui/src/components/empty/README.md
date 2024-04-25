# 空状态

### 介绍

空状态组件

### 使用

```vue
<template>
  <de-empty description="暂无图片，请上传" />
</template>
<script setup>
import { DeEmpty } from '@moten/ui'
</script>
```

## API

### 属性

#### Button Props

| 参数          | 说明     | 类型     | 默认值     |
| ------------- | -------- | -------- | ---------- |
| `image`       | 图片地址 | _string_ | ``         |
| `description` | 空白描述 | _string_ | `暂无数据` |
