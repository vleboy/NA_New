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
      gameReportForm: [
        {
          code: '10000',
          name: 'NA棋牌游戏',
          mix: '1'
        },
        {
          code: '30000',
          name: 'NA真人游戏',
          mix: '1'
        },
        {
          code: '40000',
          name: 'NA电子游戏',
          mix: '1'
        },
        {
          code: '50000',
          name: 'NA街机游戏',
          mix: '1'
        }
      ],
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
      if (this.$store.state.storageAgentOne == '') {// 首先判断是否是第一次登录 是第一次登录 判断是否是顶级管理员
        param = localStorage.loginSuffix == 'Agent' ? '01' : this.userId
      } else {
        param = this.userId
      }
      return param
    },
    dateTime () {
      let time,startDateTime,endDateTime = ''

      if (this.$store.state.dateTime == '') {
        startDateTime = this.getWeek().setHours(0, 0, 0, 0)
        endDateTime = this.getWeek().setHours(0, 0, 0, 0) + 7*24*3600*1000 - 1
      } else {
        startDateTime = this.$store.state.dateTime.startDateTime
        endDateTime = this.$store.state.dateTime.endDateTime
      }

      time = [startDateTime, endDateTime]

      return time
    },
    gameList () {
      return this.$store.state.storageAgentOne.gameList || JSON.parse(localStorage.loginGameList)
    }
  },
  mounted () {
    this.getAgentList()
  },
  methods: {
    getAgentList () {
      let gameTypeList = []
      this.gameLists = []
      let test = {
        gameType: gameTypeList,
        role: localStorage.loginSuffix == 'Agent' ? '-1000' : '1000',
        parent: this.parentId,
        query: {
          createdAt: this.dateTime
        }
      }

      // 获取该报表有的游戏
      if (this.gameList.length) {
        for (let item of this.gameList) {
          gameTypeList.push(item.code)
        }
      } else {
        for (let item of this.gameReportForm) {
          gameTypeList.push(item.code)
        }
      }

      this.$indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      this.$http({
        method: 'post',
        url: api.reportInfo,
        data: test
      }).then(res => {
        this.$indicator.close()
        this.reportItemList = res.data.payload
        this.$store.commit({
          type: 'agent_report_list',
          data: this.reportItemList
        }) // 获取的总报表的相关数据
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
    },
    getWeek() {
      let nowDate= new Date()  ;
      let nowDay = nowDate.getDay() || 7;
      return new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1 - nowDay);
    } // 处理周次
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
