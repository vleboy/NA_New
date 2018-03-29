<template>
  <div class="total_report_list">
    <div class="total_loss_win" @click="showTotalReport()">
      <label>总输赢</label>
      <span :class="{'total-report-green':gameDetail.winloseAmount > 0,'total-report-red':gameDetail.winloseAmount < 0}"
            v-if="gameLists.length">
        {{gameDetail.winloseAmount || 0}}
        <i :class="{ showTotalReportActive: !showTotalReportView }">
          <img src="../assets/img/sub-lag.png" alt="">
        </i>
      </span>
      <span v-else>暂无数据</span>
    </div>
    <div class="game_list" v-show="showTotalReportView">
      <ul>
        <li v-for="(game, index) in gameLists" :key="index">
          <div class="game_list_items" @click="showGameListInfo(game,index)">
            <label>{{ game.name }}</label>
            <span :class="{'total-report-green':game.winloseAmount > 0,'total-report-red':game.winloseAmount < 0}">
              {{ game.winloseAmount || 0}}
              <i :class="{ showTotalReportActive2:  game.isActive}" style="transform:rotate(-90deg)">
                <img src="../assets/img/sub-lag.png" alt="">
              </i>
            </span>
          </div>

          <div class="game_list_info" v-show="game.isActive">
            <ul>
              <li>
                <label>交易次数</label>
                <span>{{ game.betCount }}
                  <i></i>
                </span>
              </li>
              <li>
                <label>投注金额</label>
                <span>{{ game.betAmount }}
                  <i></i>
                </span>
              </li>
              <li>
                <label>输赢金额</label>
                <span>{{ game.winloseAmount }}
                  <i></i>
                </span>
              </li>
              <li>
                <label>洗码量</label>
                <span>{{ game.mixAmount }}
                  <i></i>
                </span>
              </li>
              <li>
                <label>佣金</label>
                <span>{{game.commission}}
                  <i></i>
                </span>
              </li>
              <li>
                <label>代理总金额</label>
                <span>{{ game.totalAmount }}
                  <i></i>
                </span>
              </li>
              <li>
                <label>代理交公司</label>
                <span>{{ game.submitAmount}}
                  <i></i>
                </span>
              </li>
              <li>
                <label>代理占成</label>
                <span>{{game.rate + '%'}}
                  <i></i>
                </span>
              </li>
              <li>
                <label>返水比例</label>
                <span>{{ game.mix +'%' }}
                  <i></i>
                </span>
              </li>
              <li>
                <label>获利比例</label>
                <span>{{ game.profitRatio+'%' }}
                  <i></i>
                </span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import api from '@/api/api'
export default {
  name: 'agent-report-list',
  data () {
    return {
      gameLists: [],
      showTotalReportView: false,
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
      gameDetail: {
        balance: '',
        mixAmount: ''
      }
    }
  },
  computed: {
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
    userId () {
      // 默认为登录用户的代理信息  点击代理列表后，开始传递点击代理的信息
      return this.$store.state.storageAgentOne.userId || localStorage.loginId
    },
    gameList () {
      return this.$store.state.storageAgentOne.gameList || JSON.parse(localStorage.loginGameList)
    },
    agentRate () {
      let rate

      if (this.$store.state.storageAgentOne) {
        rate = this.$store.state.storageAgentOne.rate
      } else {
        rate = localStorage.loginRate
      }
      return rate
    }
  },
  mounted () {
    this.getHomeData()
  },
  methods: {
    showTotalReport () {
      this.showTotalReportView = !this.showTotalReportView
    },
    showGameListInfo (item,index) {
      this.gameLists[index].isActive = !this.gameLists[index].isActive
      this.gameLists = Object.assign([],this.gameLists)
    },
    getHomeData () {
      this.getAllReport()
      this.getBills()
    },
    getBills () {
      this.$indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      this.$http({
        method: 'get',
        url: `${api.bills}/${this.userId}`
      }).then(res => {
        this.$indicator.close()

        this.$store.commit({
          type: 'agentInfo_balance',
          data: res.data.payload.balance
        }) // 存储显示剩余点数
      }).catch(err=>{

      })
    }, // 获取剩余点数
    getAllReport () {
      let gameTypeList = []
      this.gameLists = []
      let test = {
        gameType: gameTypeList,
        role: localStorage.loginSuffix == 'Agent' ? '-1000' : '1000',
        userIds: [this.userId],
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
        url: api.calcUserStat,
        data: test
        }).then(res => {

        this.$indicator.close()

        if (res.data.payload.length) {
          this.gameDetail = res.data.payload[0]
          this.initData()
        }

        this.$store.commit({
          type: 'agentInfo_title',
          data: this.gameDetail
        }) // 存储显示剩余洗码量

      }).catch(error => {
        this.$indicator.close()
      })
    },// 获取总报表相关信息
    initData () {
      let loginGameList = this.gameList.length ? this.gameList : this.gameReportForm

      for (let [key,item] of Object.entries(this.gameDetail.gameTypeMap)) {
        for (let data of loginGameList) {
          if(key == data.code) {
            item.isActive = false
            item.code = key // 游戏code
            item.name = data.name // 名称
            item.mix = data.mix // 返水比例
            item.rate = this.agentRate // 代理占成
            item.betAmount = Math.abs(item.betAmount) // 格式化投注金额
            item.commission = (key == '30000') ? (item.mixAmount*item.mix).toFixed(2) : (item.betAmount*item.mix).toFixed(2)  // 佣金 (真人和其他游戏类型算法不一样)
            item.totalAmount = (+item.commission + item.winloseAmount).toFixed(2) // 代理总金额
            item.profitRatio = (key == '30000') ? (item.totalAmount/item.mixAmount).toFixed(2) : (item.totalAmount/item.betAmount).toFixed(2)  // 获利比例(真人和其他游戏类型算法不一样)
            item.submitAmount = (+item.totalAmount * (1 - item.rate * 0.01)).toFixed(2)  // 代理交公司 代理总金额*（1-代理占成）=代理交公司
          }
        }
        this.gameLists.push(item)
      }
    },// 数据组装，处理数据
    getWeek() {
      let nowDate= new Date()  ;
      let nowDay = nowDate.getDay() || 7;
      return new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1 - nowDay);
    } // 处理周次
  }
}
</script>

<style lang="stylus" scoped>
// 总输赢
.total_report_list
  padding 0 25px
  font-size 30px
  color #787878

.total_loss_win, .game_list ul li .game_list_items, .game_list_info ul li
  display flex
  justify-content space-between
  height 70px
  line-height 70px
  span
    i
      display inline-flex
      width 40px
      height 20px
      transition .2s
      img
        width 100%
        height 100%

// 游戏列表
.game_list
  text-indent 2em

// 报表详情
.game_list_info
  text-indent 4em

.showTotalReportActive
  transform rotate(-90deg)
  transition transform .2s

.showTotalReportActive2
  transform rotate(0deg)!important
  transition transform .2s

.total-report-red
   color: #FF3300;
.total-report-green
   color: #00CC00;
</style>
