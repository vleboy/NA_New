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
    let test = {
      userId: '1b78317b-3c6e-4244-9487-61ba6fa44e3e'
    }
    this.$http({
      method: 'post',
      url: api.reportPlayer,
      data: test
    })
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style lang="stylus" scoped>
</style>
