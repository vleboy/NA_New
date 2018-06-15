<template>
  <div class="total_report_list">
    <div class="total_loss_win" @click="showTotalReport()">
      <label>总输赢</label>
      <span :class="{'total-report-green':winLoseAmount > 0,'total-report-red':winLoseAmount < 0}"
            v-if="gameLists.length">
        {{winLoseAmount || 0}}
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
        mixAmount: '',
        gameTypeMap:{}
      },
      cardList: [], // 棋牌游戏
      liveList: [], // 真人游戏
      videoList: [], // 电子游戏
      ArcadeList: [], // 街机游戏
      winLoseAmount: 0, // 总输赢
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
      let rate = 0

      if (this.$store.state.storageAgentOne.length) {
        rate = this.$store.state.storageAgentOne.rate
      } else {
        rate = localStorage.loginRate
      }
      return rate
    },
    gameDetailInfo () {
      return this.$store.state.storageAgentListInfo
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
    getAllReport (data) {
      if(data.length) {
        this.gameDetail = data
        this.initData()
        this.$store.commit({
          type: 'agentInfo_title',
          data: this.gameDetail
        }) // 存储显示剩余洗码量
      }

    },// 获取总报表相关信息
    initData () {
      let dataReport = []
      let loginGameList = this.gameList.length ? this.gameList : this.gameReportForm
      this.gameLists = []
      this.cardList = []
      this.liveList = []
      this.videoList = []
      this.ArcadeList = []
      this.winLoseAmount = 0
      for(let list of this.gameDetail) {
        for (let [key,item] of Object.entries(list.gameTypeMap)) {
          for (let data of loginGameList) {
            if(key == data.code) {
              item.isActive = false
              item.code = key // 游戏code
              item.name = data.name // 名称
              item.mix = data.mix // 返水比例
              item.rate = this.agentRate // 代理占成
              item.betAmount = Math.abs(item.betAmount) // 格式化投注金额
              item.commission = (key == '30000') ? (item.mixAmount*item.mix*0.01).toFixed(2) : (item.betAmount*item.mix*0.01).toFixed(2)  // 佣金 (真人和其他游戏类型算法不一样)
              item.totalAmount = (+item.commission + item.winloseAmount).toFixed(2) // 代理总金额
              item.profitRatio = (key == '30000') ? ((+item.totalAmount/item.mixAmount)*100).toFixed(2) : ((+item.totalAmount/item.betAmount)*100).toFixed(2)  // 获利比例(真人和其他游戏类型算法不一样)
              item.submitAmount = (+item.totalAmount * (1 - item.rate * 0.01)).toFixed(2)  // 代理交公司 代理总金额*（1-代理占成）=代理交公司
              item.mixAmount = (key == '30000') ? item.mixAmount : item.betAmount // 洗码量 （非真人为输赢金额）
            }
          }
          dataReport.push(item)
        }
      }

      for (let item of dataReport) {
        switch (item.code){
          case '10000':
            this.cardList.push(item)
                break
          case '30000':
            this.liveList.push(item)
                break
          case '40000':
            this.videoList.push(item)
                break
          case '50000':
            this.ArcadeList.push(item)
                break
        }
      }

      let [betCount,mix,rate,betAmount,commission,totalAmount,profitRatio,submitAmount,mixAmount,winloseAmount] = [0,0,0,0,0,0,0,0,0,0]

      let obj = {}

      if (this.liveList.length) {
        for(let item of this.liveList) {
          initItem(item)
        }
        this.gameLists.push(obj)
      }
      if (this.cardList.length) {
        clearZero()
        for(let item of this.cardList) {
          initItem(item)
        }
        this.gameLists.push(obj)
      }
      if (this.videoList.length) {
        clearZero()
        for(let item of this.videoList) {
          initItem(item)
        }
        this.gameLists.push(obj)
      }
      if (this.ArcadeList.length) {
        clearZero()
        for(let item of this.ArcadeList) {
          initItem(item)
        }
        this.gameLists.push(obj)
      }

      for (let data of this.gameLists) {
        this.winLoseAmount += (+data.winloseAmount)
      }

      function clearZero() {
        betCount = 0 ,mix  = 0 ,rate = 0 ,betAmount = 0, commission = 0, totalAmount = 0, profitRatio = 0,
          submitAmount = 0,mixAmount = 0 ,winloseAmount = 0
      }

      function initItem(item) {
        obj = {
          isActive: item.isActive,
          code: item.code, // 游戏code
          name: item.name, // 名称
          betCount: (betCount += (+item.betCount)).toFixed(2),
          mix: (mix += (+item.mix)).toFixed(2),
          rate: (rate += (+item.rate)).toFixed(2),
          betAmount: (betAmount += (+item.betAmount)).toFixed(2),
          commission: (commission += (+item.commission)).toFixed(2),
          totalAmount: (totalAmount += (+item.totalAmount)).toFixed(2),
          profitRatio: (profitRatio += (+item.profitRatio)).toFixed(2),
          submitAmount: (submitAmount += (+item.submitAmount)).toFixed(2),
          mixAmount: (mixAmount += (+item.mixAmount)).toFixed(2),
          winloseAmount: (winloseAmount += (+item.winloseAmount)).toFixed(2)
        }
        return obj
      }

    },// 数据组装，处理数据
    getWeek() {
      let nowDate= new Date()  ;
      let nowDay = nowDate.getDay() || 7;
      return new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1 - nowDay);
    } // 处理周次
  },
  watch: {
    'gameDetailInfo': function (_new) {
      this.getAllReport(_new)
    }
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
