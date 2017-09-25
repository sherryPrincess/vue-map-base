// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueResource from 'vue-resource'
import filters from './filters/filters'
Vue.prototype.$http = axios

Vue.config.productionTip = false

import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(Element)
Vue.use(VueResource)
for (let key in filters) {
  Vue.filter(key, filters[key])
}

/* eslint-disable no-new */
const MyVue = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

export default MyVue
