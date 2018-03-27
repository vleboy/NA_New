<template>
  <div class="p-personal">
    <div class="-p-nav">
      <span class="-n-arrow"> <img @click="goBack" src="/static/arrow_left.png"></span>
      <span class="-n-name">{{userInfo.username || '暂无'}}</span>
    </div>
    <div class="-p-content">
      <div class="-c-item">
        <span>用户名</span>
        <span class="-item-color">{{userInfo.username || '暂无'}}</span>
      </div>
      <div class="-c-item">
        <span>代理标识</span>
        <span class="-item-color">{{ (userInfo.sn == 'NULL!' ? 'NA369' : userInfo.sn) || '暂无' }}</span>
      </div>
      <div class="-c-item">
        <span>剩余点数</span>
        <span class="-item-color">{{userInfo.balance || '0'}}</span>
      </div>
    </div>
    <div class="-p-footer">
      <a class="-button" @click="loginOut">退出登录</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from '@/api/api'
  export default {
  name: 'personal',
  data () {
    return {
      userId: localStorage.getItem('loginId'),
      userInfo: {}
    }
  },
  mounted () {
    this.getBills()
  },
  methods: {
    getBills () {
      this.$indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      this.$http({
        method: 'get',
        url: `${api.bills}/${this.userId}`
      }).then(res => {
        this.$indicator.close()
        this.userInfo = res.data.payload
      }).catch(err=>{

      })
    },
    loginOut () {
      this.$message.confirm('确定退出登录?').then(action => {
        this.$router.push('/login')
        localStorage.clear()
      }).catch(error => {

      });
    },
    goBack () {
      window.history.back()
    }
  }
}
</script>

<style lang="stylus" scoped>

  .p-personal{
    font-size: 2em;

    .-p-nav{
      text-align: center;
      background-color: #f9f9f9;
      padding: 10px 0;

      .-n-arrow{
        position: absolute;
        display: inline-grid;
        left: 10px;
        top: 26px;;
        font-size: 1.2em;

        img{
          width: 5%;
        }
      }
      .-n-name{
        font-size: 1.2em;
        display: inline-block;
      }
    }

    .-p-content{
      padding: 20px;

      .-c-item{
        display: flex;
        padding: 5px 0;
        justify-content: space-between;

        .-item-color{
          color: #7f7f7f;
        }
      }
    }

    .-p-footer{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 5%;

      .-button{
        display: block;
        margin: 0 auto;
        width: 80%;
        text-align: center;
        line-height: 80px;
        color: #fff;
        letter-spacing: 5px;
        border-radius: 40px;
        background-color: #409eff;
      }
    }
  }
</style>
