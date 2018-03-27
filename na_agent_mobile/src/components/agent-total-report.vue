<template>
  <div class="agent_total_report">
    <agent-title-item  title="总报表"  v-on:message="cnm" />
    <agent-report-list v-show="lag" ref="childMethodTotalList"/>
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
      this.lag = !this.lag
    },
    getAllReport () {
      this.$refs.childMethodTotalList.getAllReport()
    }
  }
}
</script>

<style lang="stylus" scoped>
// 总报表
.agent_total_report
  width 750px
</style>
