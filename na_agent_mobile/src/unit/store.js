/**
 * Created by Administrator on 2018/3/23 0023.
 */
import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);


const state = {
  agentInfo: {}
}

const getters = {}

const actions = {}

const mutations = {
  agentInfo_title (state, payload) {
    state.agentInfo = payload.data
  }
}

export default new vuex.Store({
  state,
  getters,
  actions,
  mutations
})
