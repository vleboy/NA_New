/**
 * Created by Administrator on 2018/3/23 0023.
 */
import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);


const state = {
  agentInfo: {},
  balance: '',
  dateTime: '',
  storageAgentList: []
}

const getters = {

}

const actions = {}

const mutations = {
  agentInfo_title (state, payload) {
    state.agentInfo = payload.data
  },// 获取主页的总洗码量
  agentInfo_balance (state, payload) {
    state.balance = payload.data
  },// 存储当前代理的剩余点数
  agentInfo_dateTime (state, payload) {
    state.dateTime = payload.data
  },// 存储选择的时间
  agentInfo_storageAgentList (state, payload) {
    if (payload.state) {
      state.storageAgentList.push(payload.data)
    } else {
      for (let [index,item] of state.storageAgentList.entries()) {
        if(item.userId == payload.data.userId){
          state.storageAgentList.splice(index,1)
        }
      }
    }
  } // 存储or删除 代理列表
}

export default new vuex.Store({
  state,
  getters,
  actions,
  mutations
})
