<template>
  <div class="agent_item">
    <agent-info />
    <agent-total-report />
    <agent-report-items
      reportItemsTitle = "代理列表"
      reportItemsLag = "代理"
    />
    <agent-report-items
      reportItemsTitle = "玩家列表"
      reportItemsLag = "玩家"
    />
  </div>
</template>

<script>
import agentInfo from './agent-info'
import agentTotalReport from './agent-total-report'
import agentReportItems from './agent-report-items'

export default {
  name: 'agent-item',
  components: {
    agentInfo,
    agentTotalReport,
    agentReportItems
  }
}
</script>

<style lang="stylus" scoped>
</style>
