<template>
  <div class="home">
    <agent-header @searchDatetime="searchDatetime" />
    <agent-item  ref="childMethod" @dispatchAgentList="searchDatetime"/>
  </div>
</template>

<script type="text/ecmascript-6">
import agentHeader from '@/components/agent-header'
import agentItem from '@/components/agent-item'
import api from '@/api/api'

export default {
  name: 'home',
  components: {
    agentHeader,
    agentItem
  },
  mounted () {
  },
  methods: {
    searchDatetime () {
      this.$refs.childMethod.distribute()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .home{
    overflow: hidden;
  }
</style>
