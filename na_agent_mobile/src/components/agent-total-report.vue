<template>
  <div class="agent_total_report">
    <agent-title-item  title="总报表"  v-on:message="cnm" />
    <agent-report-list v-show="lag" />
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
  },
  data () {
    return {
      lag: false
    }
  },
  methods: {
    cnm (data) {
      console.log(data)
      this.lag = !this.lag
    }
  }
}
</script>

<style lang="stylus" scoped>
// 总报表
.agent_total_report
  width 750px
</style>
