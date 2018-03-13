<template>
  <div class="contanier">
    <div class="agent_total_report_title" @click="test(title)">
      <div></div>
      <h2>{{ title }}</h2>
      <div class="agent-lag">
        <img src="../assets/img/title-lag.png" alt="" :class="{ active_title: showLag }">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'agent-title-item',
  props: ['title'],
  data () {
    return {
      showLag: false
    }
  },
  methods: {
    test (title) {
      this.$emit('message', title)
      this.showLag = !this.showLag
    }
  }
}
</script>

<style lang="stylus" scoped>
.contanier
  padding 0 25px
  background-color #014073

.agent_total_report_title
  display flex
  justify-content space-between
  width 100%
  height 80px
  line-height 80px
  color #ffffff
  h2
    font-size 36px
  .agent-lag
    width 40px
    height 20px
    img
      width 100%
      height 100%
      transform rotate(-90deg)
      transition transform .2s
      vertical-align middle

.active_title
  transform rotate(0deg)!important
  transition transform .2s!important
</style>
