<template>
  <div class="agent_report_item">
    <ul>
      <li v-for="(item, index) in reportItemList" :key="index">
        <div class="agent_items" @click="showPlayerReport(item,index)">
          <div class="agent_user_lag">
            <a href="javascript:;">玩家</a>
            {{item.userName}}
            <span :class="{'total-report-red': item.state==0,'total-report-green':item.state==1,'total-red-border':item.state==0,'total-green-border':item.state==1}">
              {{item.state ? '正常' : '冻结'}}
            </span>
          </div>
          <span>
            {{item.balance || 0}}
            <i :class="{ showTotalReportActive: !(showPlayerReportView && index === showPlayerReportIndex) }">
              <img src="../assets/img/sub-lag.png" alt="">
            </i>
          </span>
        </div>
        <div class="game_list" v-show="showPlayerReportView  && index === showPlayerReportIndex">
          <agentOperation :navOperation="operates" @frozenClick="changeFrozen()" @passwordClick="changePassword()"></agentOperation>
          <ul class="game_list-ul">
            <li class="g-l-li">
              <div class="game_list_items">
                <label>剩余点数：</label>
                <span>
                  {{ item.balance || 0}}
                </span>
              </div>
            </li>
            <li class="g-l-li">
              <div class="game_list_items">
                <label>总投注：</label>
                <span>
                  {{ item.gameInfo.betAmount || 0}}
                </span>
              </div>
            </li>
            <li class="g-l-li">
              <div class="game_list_items">
                <label>总输赢：</label>
                <span>
                  {{ item.gameInfo.winloseAmount || 0}}
                </span>
              </div>
            </li>
            <li v-for="(game, index) in item.gameLists" :key="index">
              <div class="game_list_items" @click="showGameListInfo(index)">
                <label>{{ game.name }}</label>
                <span :class="{'total-report-green':game.winloseAmount > 0,'total-report-red':game.winloseAmount < 0}">
                  {{ game.winloseAmount || 0}}
                  <i :class="{ showTotalReportActive2: showGameListInfoView && index === showGameListInfoIndex}" style="transform:rotate(-90deg)">
                    <img src="../assets/img/sub-lag.png" alt="">
                  </i>
                </span>
              </div>

              <div class="game_list_info" v-show="showGameListInfoView && index === showGameListInfoIndex">
                <ul>

                  <li>
                    <label>投注金额</label>
                     <span>{{ game.betAmount }}<i></i></span>
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
                    <label>代理总金额</label>
                    <span>{{ game.totalAmount }}
                      <i></i>
                    </span>
                  </li>

                  <li>
                    <label>返水比例</label>
                    <span>{{ game.mix +'%' }}
                      <i></i>
                    </span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import agentOperation from './agent-operation'
import api from '@/api/api'
export default {
  name: 'player-report-item',
  components:{agentOperation},
  data() {
    return{
      reportItemList: [],
      itemPlayerInfo: {}, // 单个玩家详细
      showPlayerReportView: false,
      showGameListInfoView: false,
      showPlayerReportIndex: '', // 首层玩家展示隐藏
      showGameListInfoIndex: '', // 玩家下所属游戏报表显影
      gameLists: [], // 相关游戏列表
      playerGameList: [], // 有游戏记录玩家数据
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
      ]
    }
  },
  computed: {
    operates () {
      let array = [
        {
          name: '存点',
          img: require('assets/img/save.png'),
          url: '/saveRemind',
          param:{state: 1},
          isUrl: true
        },
        {
          name: '提点',
          img: require('assets/img/get.png'),
          url: '/saveRemind',
          param: {state: 2},
          isUrl: true
        },
        {
          name: `${this.itemPlayerInfo.state ? '冻结' : '解冻'}`,
          img: require('assets/img/frozen.png'),
          param: {state:3},
          isUrl: false
        },
        {
          name: '改密',
          img: require('assets/img/password.png'),
          param: {state: 4},
          isUrl: false
        }
      ]
      return array
    }
  },
  mounted () {
    this.getPlayerList()
  },
  methods: {
    showPlayerReport (item,index) {
      this.itemPlayerInfo = item
      this.showPlayerReportIndex = index
      this.showPlayerReportView = !this.showPlayerReportView
    },
    showGameListInfo (index) {
      this.showGameListInfoIndex = index
      this.showGameListInfoView = !this.showGameListInfoView
    },
    getPlayerList () {
      let playerList = []
      this.$indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      this.$http({
        method: 'post',
        url: api. reportPlayer,
        data: {
          parentId: localStorage.loginSuffix == 'Agent' ? '01' : localStorage.loginId
        }
      }).then(res => {
        this.reportItemList = res.data.payload

        for (let item of this.reportItemList) {
          playerList.push(item.userName)
          item.gameLists = []
          item.gameInfo = ''
        }

        this.$indicator.close()
        this.getPlayerListDetail(playerList)
      }).catch(error => {
        this.$indicator.close()
      })
    }, // 获取玩家列表
    getPlayerListDetail (list) {
      let gameTypeList = []

      // 获取该报表有的游戏
      if (JSON.parse(localStorage.loginGameList).length) {
        for (let item of JSON.parse(localStorage.loginGameList)) {
          gameTypeList.push(+item.code)
        }
      } else {
        for (let item of this.gameReportForm) {
          gameTypeList.push(+item.code)
        }
      }

      this.$indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })

      this.$http({
        method: 'post',
        url: api.calcPlayerStat,
        data: {
          gameType: gameTypeList,
          gameUserNames: list,
          query: {createdAt: [1521431999000, 1521773026733]}
        }
      }).then(res => {
        this.playerGameList = res.data.payload
        this.$indicator.close()
        this.initData()
      }).catch(error => {
        this.$indicator.close()
      })
    }, // 获取玩家列表
    initData () {

      let loginGameList = JSON.parse(localStorage.loginGameList).length ? JSON.parse(localStorage.loginGameList) : this.gameReportForm
      // 先组装有有玩家消费记录的报表
       for (let item  of this.playerGameList) {
         for (let data of this.reportItemList) {
           if(item.userName == data.userName) {
             data.gameInfo = item
           }
         }
       }

      for (let list of this.reportItemList) {
        if(list.gameInfo != '') {
          for (let [key,item] of Object.entries(list.gameInfo.gameTypeMap)) {
            for (let data of loginGameList) {
              if(key == data.code) {
                item.code = key // 游戏code
                item.name = data.name // 名称
                item.mix = data.mix // 返水比例
                item.betAmount = Math.abs(item.betAmount) // 格式化投注金额
                item.commission = (key == '30000') ? (item.mixAmount*item.mix).toFixed(2) : (item.betAmount*item.mix).toFixed(2)  // 佣金 (真人和其他游戏类型算法不一样)
                item.totalAmount = (+item.commission + item.winloseAmount).toFixed(2) // 代理总金额
              }
            }
            list.gameLists.push(item)
          }
        }
      }
    },// 数据组装，处理数据
    changeFrozen () {
      this.$message.confirm('确定执行此操作?')
        .then(() => {
          this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          })
          this.$http({
            method: 'post',
            url: api.forzen,
            data: {
              state: this.itemPlayerInfo.state ? 0 : 1,
              userName: this.itemPlayerInfo.userName
            }
          }).then(res => {
            this.getPlayerList()
            this.$indicator.close()
          }).catch(error => {
            this.$indicator.close()
          })
      }).catch(()=>{

      });
    },
    changePassword () {
      this.$message.prompt('请输入新密码')
        .then((res) => {
          this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          })
          this.$http({
            method: 'post',
            url: api.password,
            data: {
              password: res.value,
              userName: this.itemPlayerInfo.userName
            }
          }).then(res => {
            this.getPlayerList()
            this.$indicator.close()
          }).catch(error => {
            this.$indicator.close()
          })
      }).catch(()=>{

      });
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
            color #ffcc54
            border-radius 10px
            border 2px solid #ffcc54
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

.game_list ul li .game_list_items, .game_list_info ul li
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

.g-l-li
  position: relative;
  left: -44px;
// 游戏列表
.game_list-ul
  text-indent 4em

// 报表详情
.game_list_info
  text-indent 6em

.showTotalReportActive
  transform rotate(-90deg)
  transition transform .2s

.showTotalReportActive2
  transform rotate(0deg)!important
  transition transform .2s

.total-report-red
  color: #FF3300;
.total-red-border
  border: 2px solid #FF3300
  border-radius: 10px;
  padding 5px 10px
  font-size 26px
.total-report-green
  color: #00CC00;
.total-green-border
  border: 2px solid #00CC00
  border-radius 10px
  padding 5px 10px
  font-size 26px

</style>
