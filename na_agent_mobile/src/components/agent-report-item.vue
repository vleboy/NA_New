<template>
  <div class="agent_report_item">
    <ul>
      <li
        v-for="(item, index) in reportItemList"
        :key="index"
      >
        <div class="agent_items">
          <div class="agent_user_lag">
            <a href="javascript:;">代理</a>
            {{item.displayName}}
          </div>
          <span>
            {{item.winlose}}
            <i>
              <img src="../assets/img/sub-lag.png" alt="">
            </i>
          </span>
        </div>

      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import api from '@/api/api'
export default {
  name: 'agent-report-item',
  data() {
    return{
      reportItemList: []
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
        url: api. reportInfo,
        data: {
          parent: localStorage.loginSuffix == 'Agent' ? '01' : localStorage.loginId
        }
      }).then(res => {
        this.$indicator.close()
        this.reportItemList = res.data.payload
      }).catch(error => {
        this.$indicator.close()
      })
    } // 获取代理列表
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
</style>
