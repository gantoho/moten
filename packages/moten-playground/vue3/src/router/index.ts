import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'

const routes = [
  { path: '/', component: '' },
  { path: '/about', component: HelloWorld },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router
