<template>
  <div class="home">
    <agent-header />
    <agent-item />
  </div>
</template>

<script>
import agentHeader from '@/components/agent-header'
import agentItem from '@/components/agent-item'

export default {
  name: 'home',
  components: {
    agentHeader,
    agentItem
  }
}
</script>

<style lang="stylus" scoped>
</style>
