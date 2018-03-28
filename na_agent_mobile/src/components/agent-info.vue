<template>
  <div class="agent_info">
    <agentClickList @getNewAgentTop="refreshAgent"></agentClickList>
    <agentOperation :navOperation="operates"></agentOperation>
    <div class="agent_account">
      <ul>
        <li>
          <label>剩余点数</label>
          <span>{{balance || 0}}</span>
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
import agentClickList from './agent-click-list'
export default {
  name: 'agent-info',
  components:{agentOperation,agentClickList},
  data () {
    return {}
  },
  computed: {
    operates () {
      let navList = [
        {
          name: '创建代理',
          img: require('assets/img/add-agent.png'),
          url: '/addAgent',
          param: {
            agentSn: this.addAgentSn,
            agentName: this.addAgentName
          },
          isUrl: true
        },
        {
          name: '创建玩家',
          img: require('assets/img/add-player.png'),
          url: '/addPlayer',
          param: {
            agentSn: this.addAgentSn,
            agentName: this.addAgentName
          },
          isUrl: true
        },
        {
          name: '存点',
          img: require('assets/img/save.png'),
          url: '/saveRemind',
          param:{state: 1,toFrom:1},
          isUrl: true
        },
        {
          name: '提点',
          img: require('assets/img/get.png'),
          url: '/saveRemind',
          param: {state: 2,toFrom:1},
          isUrl: true
        }
      ]

      return navList
    },
    agentInfo () {
      return this.$store.state.agentInfo
    },
    balance () {
      return this.$store.state.balance
    },
    addAgentSn () {
      let param = ''
      if (this.$store.state.storageAgentOne == '') {
        param = localStorage.loginSuffix == 'Agent' ?  'NA369': localStorage.loginSn
      } else {
        param =  this.$store.state.storageAgentOne.sn
      }
      return param
    },
    addAgentName () {
      let param = ''
      if (this.$store.state.storageAgentOne == '') {
        param = localStorage.loginSuffix == 'Agent' ? '直属' : localStorage.loginDisplayName
      } else {
        param =  this.$store.state.storageAgentOne.displayName
      }
      return param
    }
  },
  methods: {
    jumpUrl (data) {
      this.$router.push({path: data.url, query: data.param})
    },
    refreshAgent () {
      this.$emit('getAgentClickNew')
    }
  }
}
</script>

<style lang="stylus" scoped>

// 代理信息
.agent_info
  width 100%

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
