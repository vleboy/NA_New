<template>
  <div class="agent-report-items">
    <agent-title :title="reportItemsTitle" v-on:message="cnm" />
    <agent-report-item :lag="reportItemsLag" v-show="lag"/>
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
</style>
