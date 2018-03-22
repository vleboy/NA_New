<template>
  <div class="total_report_list">
    <div class="total_loss_win" @click="showTotalReport()">
      <label>总输赢</label>
      <span>111,111,111.00
        <i :class="{ showTotalReportActive: !showTotalReportView }">
          <img src="../assets/img/sub-lag.png" alt="">
        </i>
      </span>
    </div>

    <div class="game_list" v-show="showTotalReportView">
      <ul>
        <li
          v-for="(game, index) in gameLists"
          :key="index"
        >
          <div class="game_list_items" @click="showGameListInfo(index)">
            <label>{{ game.name }}</label>
            <span>{{ game.num }}
              <i :class="{ showTotalReportActive2: showGameListInfoView && index === showGameListInfoIndex}" style="transform:rotate(-90deg)">
                <img src="../assets/img/sub-lag.png" alt="">
              </i>
            </span>
          </div>

          <div class="game_list_info" v-show="showGameListInfoView && index === showGameListInfoIndex">
            <ul>
              <li
                v-for="(info, index) in gameListInfos"
                :key="index"
              >
                <label>{{ info.name }}</label>
                <span>{{ info.num }}
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

<script>
export default {
  name: 'agent-report-list',
  data () {
    return {
      gameLists: [
        { name: '视讯', num: '111,111,111.00' },
        { name: '电游', num: '111,111,111.00' },
        { name: '街机', num: '111,111,111.00' },
        { name: '体育', num: '111,111,111.00' },
        { name: '棋牌', num: '111,111,111.00' }
      ],
      gameListInfos: [
        { name: '交易次数', num: '111,111,111.00' },
        { name: '投注金额', num: '111,111,111.00' },
        { name: '输赢金额', num: '111,111,111.00' },
        { name: '返水比例', num: '111,111,111.00' },
        { name: '洗码量', num: '111,111,111.00' },
        { name: '佣金', num: '111,111,111.00' },
        { name: '代理总金额', num: '111,111,111.00' },
        { name: '代理占成', num: '111,111,111.00' },
        { name: '代理交公司', num: '111,111,111.00' },
        { name: '获利比例', num: '111,111,111.00' }
      ],
      showTotalReportView: false,
      showGameListInfoView: false,
      showGameListInfoIndex: ''
    }
  },
  methods: {
    showTotalReport () {
      this.showTotalReportView = !this.showTotalReportView
    },
    showGameListInfo (index) {
      this.showGameListInfoIndex = index
      this.showGameListInfoView = !this.showGameListInfoView
//      alert('123123')
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
</style>
