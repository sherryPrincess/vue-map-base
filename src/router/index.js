import Vue from 'vue'
import VueRouter from 'vue-router'

import test from '../components/layout/test'
import map from '../components/map/map'
import tableAction from '../components/tableAction/tableAction'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: tableAction
  },
  {
    path: 'test',
    component: test
  },
  {
    path: 'map',
    component: map
  }
]

export default new VueRouter({
  routes // （缩写）相当于 routes: routes
})
