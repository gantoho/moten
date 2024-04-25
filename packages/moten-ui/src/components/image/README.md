# 图片

### 介绍

图片组件

### 使用

```vue
<template>
  <de-image src="https://via.placeholder.com/100" alt="占位图片" mode="cover" />
</template>
<script setup>
import { DeImage } from '@moten/ui'
</script>
```

## API

### 属性

#### Button Props

| 参数   | 说明                                                            | 类型     | 默认值  |
| ------ | --------------------------------------------------------------- | -------- | ------- |
| `src`  | 图片链接                                                        | _string_ | ``      |
| `mode` | 裁剪类型，可选值为 `cover` `fill` `contain` `none` `scale-down` | _string_ | `cover` |
| `alt`  | 图片 alt，图片未加载出来时显示的内容                            | _string_ | ``      |
