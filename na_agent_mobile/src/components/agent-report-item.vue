<template>
  <div class="agent_report_item">
    <ul>
      <li
        v-for="(item, index) in 3"
        :key="index"
      >
        <div class="agent_items">
          <div class="agent_user_lag">
            <a href="javascript:;">{{ lag }}</a>
            James1
          </div>
          <span>111,111,111.00
            <i>
              <img src="../assets/img/sub-lag.png" alt="">
            </i>
          </span>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
import agentItem from './agent-total-report'
export default {
  name: 'agent-report-item',
  props: ['lag'],
  components: {
    agentItem
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
