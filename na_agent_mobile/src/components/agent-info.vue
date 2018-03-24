<template>
  <div class="agent_info">
    <agentOperation :navOperation="operates"></agentOperation>
    <div class="agent_account">
      <ul>
        <li>
          <label>剩余点数</label>
          <span>{{agentInfo.balance || 0}}</span>
        </li>
        <li>
          <label>总洗码量</label>
          <span>{{agentInfo.mixAmount || 0}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import agentOperation from './agent-operation'
export default {
  name: 'agent-info',
  components:{agentOperation},
  data () {
    return {
      operates: [
        {
          name: '创建代理',
          img: require('assets/img/add-agent.png'),
          url: '/addAgent',
          param: {
            agentSn: localStorage.loginSuffix == 'Agent' ?  'NA369': localStorage.loginSn,
            agentName: localStorage.loginSuffix == 'Agent' ? '直属' : localStorage.loginDisplayName
          }
        },
        {
          name: '创建玩家',
          img: require('assets/img/add-player.png'),
          url: '/addPlayer',
          param: {
            agentSn: localStorage.loginSuffix == 'Agent' ?  'NA369': localStorage.loginSn,
            agentName: localStorage.loginSuffix == 'Agent' ? '直属' : localStorage.loginDisplayName
          }
        },
        {
          name: '存点',
          img: require('assets/img/save.png'),
          url: '/saveRemind',
          param:{state: 1}
        },
        {
          name: '提点',
          img: require('assets/img/get.png'),
          url: '/saveRemind',
          param: {state: 2}
        }
      ]
    }
  },
  computed: {
    agentInfo () {
      return this.$store.state.agentInfo
    }
  },
  methods: {
    jumpUrl (data) {
      this.$router.push({path: data.url, query: data.param})
    }
  }
}
</script>

<style lang="stylus" scoped>

// 代理信息
.agent_info
  width 750px

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

// 代理账户
.agent_account
  font-size 30px
  color #787878
  padding 0 25px
  ul
    li
      display flex
      justify-content space-between
      height 70px
      span
        margin-right 40px
</style>
