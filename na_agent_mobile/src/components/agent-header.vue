<template>
  <div class="agent_header">
    <div class="agent_header_container">
      <div class="agent_timepicker" @click="showTimeView()" :class="{ showTimeActive: showTimepicker }">
        <i>
          <img src="../assets/img/timepicker.png" alt="">
        </i>
      </div>

      <div class="agent_user" @click="showUserInfo">
        {{userName}}
      </div>

      <div class="agent_navbar">

        <!--<div class="navbar_search">-->
          <!--<img src="../assets/img/search.png" alt="">-->
        <!--</div>-->

        <div class="navbar_menu">
          <img src="../assets/img/exit.png" alt="" @click="loginOut">
        </div>

      </div>

    </div>

    <transition name="timepicker-fade">
      <agent-timepicker
        v-show="showTimepicker" @searchTime="searchDatetime"
      />
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import agentTimepicker from './agent-timepicker'
export default {
  name: 'agent-header',
  data () {
    return {
      userName: localStorage.getItem('loginUsername'),
      showTimepicker: false
    }
  },
  methods: {
    searchDatetime () {
      this.$emit('searchDatetime')
    },
    showTimeView () {
      this.showTimepicker = !this.showTimepicker
    },
    showUserInfo () {
      this.$router.push('/personal')
    },
    loginOut () {
      this.$message.confirm('确定退出登录?')
        .then(action => {
          this.$store.commit({
            type: 'agentInfo_storageAgentList',
            state: 2
          })
          this.$store.commit({
            type: 'agentInfo_storageAgentItem',
            data: ''
          })
          this.$router.push('/login')
          localStorage.clear()
        }).catch(error => {

      });
    }
  },
  components: {
    agentTimepicker
  }
}
</script>

<style lang="stylus" scoped>
.agent_header
  position: fixed;
  z-index: 999999;
  width: 100%
// 顶部
.agent_header_container
  display flex
  justify-content space-between
  width 100%
  height 80px
  line-height 80px
  font-size 36px
  color #ffffff
  background-color #014073

.agent_timepicker
  display:flex;
  align-items: center;
  justify-content: center;
  width 80px
  height 80px
  i
    display block
    width 50px
    height 50px
    img
      width 100%

.agent_navbar
  display flex
  align-items: center;
  justify-content space-between
  width 70px

.navbar_search, .navbar_menu
  width 50px
  height 50px
  margin-right 15px
  img
    width 100%
    height 100%

.showTimeActive
  background-color #005DA9

// 显示隐藏动画
.timepicker-fade-enter-active
  transition all .3s ease

.timepicker-fade-leave-active
  transition all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.timepicker-fade-enter, .timepicker-fade-leave-to
  opacity 0
</style>
