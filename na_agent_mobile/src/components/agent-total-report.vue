<template>
  <div class="agent_total_report">
    <agent-title-item  title="总报表"/>
    <agent-report-list />
  </div>
</template>

<script>
import agentTitleItem from './agent-title'
import agentReportList from './agent-report-list'
export default {
  name: 'agent-total-report',
  components: {
    agentTitleItem,
    agentReportList
  }
}
</script>

<style lang="stylus" scoped>
// 总报表
.agent_total_report
  width 750px
</style>
