<template>
  <div class="agent_report_item">
    <ul>
      <li v-for="(item, index) in reportItemList" :key="index" @click="showAgentReport(item,index)">
        <div class="agent_items">
          <div class="agent_user_lag">
            <a href="javascript:;">代理</a>
            {{item.displayName}}
          </div>
          <span>
            {{item.balance}}
             <i>
               <img src="../assets/img/sub-lag.png" alt="">
             </i>
          </span>
        </div>
      </li>
      <li v-if="!reportItemList.length" style="text-align: center">暂无代理数据</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import api from '@/api/api'

export default {
  name: 'agent-report-item',

  data() {
    return{
      reportItemList: [],
      itemPlayerInfo: ''
    }
  },
  computed: {
    userId () {
      let userId = ''
      // 默认为登录用户的代理信息  点击代理列表后，开始传递点击代理的信息
      if (localStorage.loginSuffix == 'Agent' && this.$store.state.storageAgentOne.isFromStore) {  // 特殊情况（超管登录，点击下一级，在次返回顶层，传递的参数应该为01） 注意：登录人员不是超管情况不在此范围内
        userId = '01'
      } else {
        userId = this.$store.state.storageAgentOne.userId || localStorage.loginId
      }
      return userId
    },
    parentId () {
      let param = ''
      if (!this.$store.state.storageAgentOne.length) {// 首先判断是否是第一次登录 是第一次登录 判断是否是顶级管理员
        param = localStorage.loginSuffix == 'Agent' ? '01' : this.userId
      } else {
        param = this.userId
      }
      return param
    }
  },
  mounted () {
    this.getAgentList()
  },
  methods: {
    getAgentList () {
      this.$indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      this.$http({
        method: 'post',
        url: api.reportInfo,
        data: {
          parent: this.parentId
        }
      }).then(res => {
        this.$indicator.close()
        this.reportItemList = res.data.payload
      }).catch(error => {
        this.$indicator.close()
      })
    }, // 获取代理列表
    showAgentReport (item,index) {
      this.itemPlayerInfo = item
      this.$store.commit({
        type: 'agentInfo_storageAgentList',
        data: item,
        state: 1
      }) // 记录代理列表点击记录
      this.$store.commit({
        type: 'agentInfo_storageAgentItem',
        data: item
      }) // 存储单个代理信息
      this.$emit('getNewAgent',item)
    }
  }
}
</script>

<style lang="stylus" scoped>
.agent_report_item
  padding 0 25px
  font-size 30px
  color #ffffff
  background-color #3DAFDA
  ul
    li
      .agent_items
        display flex
        justify-content space-between
        padding 10px 0
        .agent_user_lag
          a
            color #0033A6
            border-radius 10px
            border 2px solid #0033A6
            padding 5px 10px
            font-size 26px
        span
          i
            display inline-flex
            width 40px
            height 20px
            img
              width 100%
              height 100%

.showTotalReportActive
  transform rotate(-90deg)
  transition transform .2s

.showTotalReportActive2
  transform rotate(0deg)!important
  transition transform .2s
</style>
