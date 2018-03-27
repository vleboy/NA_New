<template>
  <div class="agent-report-items">
    <agent-title :title="reportItemsTitle" v-on:message="cnm" />
    <agent-report-item v-show="lag" ref="childMethodAgentList" @getNewAgent="dispatchParent"/>
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
    },
    getAgentList () {
      this.$refs.childMethodAgentList.getAgentList()
    },
    dispatchParent (item) {
      this.$emit('getParentAgent',item)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
