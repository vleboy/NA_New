<template>
  <div class="agent-report-items">
    <agentTitle :title="reportItemsTitle" />
    <agent-report-item :lag="reportItemsLag"/>
  </div>
</template>

<script>
import agentTitle from './agent-title'
import agentReportItem from './agent-report-item'

export default {
  name: 'agent-report-items',
  props: ['reportItemsTitle', 'reportItemsLag'],
  components: {
    agentTitle,
    agentReportItem
  }
}
</script>

<style lang="stylus" scoped>
</style>
