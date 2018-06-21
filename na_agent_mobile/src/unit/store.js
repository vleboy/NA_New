/**
 * Created by Administrator on 2018/3/23 0023.
 */
import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);


const state = {
  agentInfo: {}, // 存取获取洗码量
  balance: '',// 顶层剩余点数
  dateTime: '', // 存取搜索的时间
  storageAgentList: [], // 存取点击过的代理列表
  storageAgentOne: '', // 获取当前的代理信息
  storagePlayerOne: '', // 获取单个玩家信息,
  storageAgentListInfo: '' // 获取代理相关信息,
}

const getters = {}

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
    let isAdd = false

    // 根据状态来判断当前数组的操作 0 为删除某一项 1位添加某一项 2为删除所有（退出登录时使用）
    switch (payload.state) {
      case 0:
        for (let [index,item] of state.storageAgentList.entries()) {
          if(item.userId == payload.data.userId){
            state.storageAgentList.splice(index,1)
          }
        }
            break
      case 1:
        payload.data.isTop = false   // 判断是否是当前登录的账号
        if (state.storageAgentList.length) {
          for (let data of state.storageAgentList) {
            if (data.userId == payload.data.userId) {
              isAdd = true
              break
            }
          }
          !isAdd &&  state.storageAgentList.push(payload.data)
        } else {
          state.storageAgentList.push({
            userId: localStorage.loginId,
            suffix: localStorage.loginSuffix,
            sn: localStorage.loginSn,
            displayName: localStorage.loginDisplayName,
            username: localStorage.loginUsername,
            gameList: JSON.parse(localStorage.loginGameList),
            rate: localStorage.loginRate,
            isTop: true,
            isFromStore: true // 处理首次登录 和 点击下级之后产生的顶层代理列表记录  存储的信息
          })
          state.storageAgentList.push(payload.data)
        }
            break
      case 2:
            state.storageAgentList = []
            break
    }
  }, // 存储or删除 代理列表
  agentInfo_storageAgentItem (state, payload) {
    state.storageAgentOne = payload.data
  }, // 存储单个代理信息,
  agentInfo_storagePlayerItem (state, payload) {
    state.storagePlayerOne = payload.data
  }, // 存储单个玩家信息
  agent_report_list (state, payload) {
    state.storageAgentListInfo = payload.data
  } // 存储单个玩家信息
}

export default new vuex.Store({
  state,
  getters,
  actions,
  mutations
})
