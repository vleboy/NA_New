<template>
  <div class="agent-report-items">
    <agent-title :title="reportItemsTitle" v-on:message="cnm" />
    <player-report-item v-show="lag" ref="childMethodPlayerList" />
  </div>
</template>

<script>
import agentTitle from './agent-title'
import playerReportItem from './player-report-item'

export default {
  name: 'player-report-items',
  props: ['reportItemsTitle', 'reportItemsLag'],
  components: {
    agentTitle,
    playerReportItem
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
    getPlayerList () {
      this.$refs.childMethodPlayerList.getPlayerList()
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
