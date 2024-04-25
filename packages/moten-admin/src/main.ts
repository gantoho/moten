import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/router/index'

import ElementPlus from 'element-plus'
import Draggable from 'vuedraggable'
import moten from '@moten/ui'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as VueQuill from '@vueup/vue-quill'

import 'element-plus/dist/index.css'
import '@/assets/styles/main.scss'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@moten/ui/style'

const app = createApp(App)

app.use(ElementPlus)
app.use(moten)
app.use(createPinia())
app.use(router)

app.component('draggable', Draggable)
app.component('QuillEditor', VueQuill.QuillEditor)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
