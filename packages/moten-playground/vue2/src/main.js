import Vue from 'vue'
import App from './App.vue'

import '@moten/ui/vue2/style'
import moten from '@moten/ui/vue2'
import VueRouter from 'vue-router'

import HelloWorld from './components/HelloWorld.vue'
import HelloWorld2 from './components/HelloWorld2.vue'
const routes = [
  { path: '/', component: HelloWorld2 },
  { path: '/about', component: HelloWorld },
]
const router = new VueRouter({
  routes,
})

Vue.use(moten)
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app')
