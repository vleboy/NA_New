<template>
  <div class="home">
    <agent-header />
    <agent-item />
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
  }
}
</script>

<style lang="stylus" scoped>
</style>
