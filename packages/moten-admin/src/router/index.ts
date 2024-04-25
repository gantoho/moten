import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/edit.vue'),
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../pages/list.vue'),
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../pages/edit.vue'),
    },
    {
      path: '/edit/',
      name: 'edit-empty',
      redirect: () => ({ path: '/' }),
    },
    {
      path: '/schema',
      name: 'schema',
      component: () => import('../pages/schema.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../pages/test/index.vue'),
    },
  ],
})

export default router
