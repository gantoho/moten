import { resolve } from 'path'
import { isVue2 } from 'vue-demi'

const name = isVue2 ? 'vue2' : 'vue3'

export default {
  resolve: {
    alias: {
      '@': resolve('./src'),
      vue: resolve(`./node_modules/${name}`),
    },
  },
  build: {
    // 打包输出的目录
    outDir: `dist/${name}`,
    lib: {
      // 组件库源码的入口文件
      entry: resolve(__dirname, 'src/main.ts'),
      // 组件库名称
      name: 'moten',
      // 文件名称, 打包结果举例: [my-packages].umd.cjs
      fileName: 'moten',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'vue-demi'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'vue-demi': 'VueDemi',
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      // 配置 mixin.scss 混合文件的全局引入
      scss: {
        additionalData: `@import "@/assets/styles/resources.scss";`,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
}
