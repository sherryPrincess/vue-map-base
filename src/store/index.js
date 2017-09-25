import Vue from 'vue'
import Vuex from 'vuex'

import warn from './modules/warn'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    warn
  }
})
