<template>
  <div class="agent_info">
    <div class="agent_info_operate">
      <ul>
        <li v-for="(operate, index) in navOperation" :key="index" @click="jumpUrl(operate)">
          <div class="operate_icon"><img :src="operate.img" alt=""></div>
          <span>{{ operate.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'agent-operation',
  props: ['navOperation'],
  data () {
    return {
    }
  },
  methods: {
    jumpUrl (data) {
      if(data.isUrl) {
        this.$router.push({path: data.url, query: data.param})
      } else {
        switch (data.param.state) {
          case 3:
            this.$emit('frozenClick')
            break;
          case 4:
            this.$emit('passwordClick')
            break
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

// 代理信息
.agent_info
  /*width 750px*/
  background-color #fff

.agent_info_operate
  height 120px
  color #5796CC
  font-size 24px
  ul
    display flex
    height 100%
    li
      display flex
      flex-direction column
      align-items center
      justify-content center
      width 25%
      height 100%
      .operate_icon
        width 55px
        height 55px
        img
          width 100%
          height 100%
</style>
