import { WARN_LIST } from '../mutation-types'
// initial state
const state = {
  warnList: {}
}

// getters
const getters = {
  warnList: state => state.warnList
}

// actions
const actions = {
  warnList ({commit, state}, bool) {
    console.log(bool + '========')
    commit(WARN_LIST, bool)
  }
}

// mutations
const mutations = {
  [WARN_LIST] (state, bool) {
    state.warnList = bool
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
