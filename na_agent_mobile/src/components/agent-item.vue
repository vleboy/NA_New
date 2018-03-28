<template>
  <div class="agent_item">
    <agent-info @getAgentClickNew="dispatchFirst"/>
    <agent-total-report  ref="childMethodTotal"/>
    <agent-report-items reportItemsTitle = "代理列表" ref="childMethodAgent" @getParentAgent="dispatchFirst"/>
    <player-report-items reportItemsTitle = "玩家列表" ref="childMethodPlayer"/>
  </div>
</template>

<script>
import agentInfo from './agent-info'
import agentTotalReport from './agent-total-report'
import agentReportItems from './agent-report-items'
import playerReportItems from './player-report-items'

export default {
  name: 'agent-item',
  components: {
    agentInfo,
    agentTotalReport,
    agentReportItems,
    playerReportItems
  },
  methods: {
    distribute () {
      this.$refs.childMethodTotal.getAllReport()
      this.$refs.childMethodPlayer.getPlayerList()
      this.$refs.childMethodAgent.getAgentList()
    },
    dispatchFirst (item) {
      this.$emit('dispatchAgentList',item)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .agent_item{
    position: absolute;
    top: 80px;
    width:100%;
    overflow: hidden;
  }
</style>
