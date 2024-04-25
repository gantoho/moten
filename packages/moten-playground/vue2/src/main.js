import Vue from 'vue'
import App from './App.vue'

import '@moten/ui/vue2/style'
import moten from '@moten/ui/vue2'

Vue.use(moten)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
