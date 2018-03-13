<template>
  <div class="p-personal">
    <div class="-p-nav">
      <span class="-n-arrow"> <img @click="goBack" src="/static/arrow_left.png"></span>
      <span class="-n-name">James</span>
    </div>
    <div class="-p-content">
      <div class="-c-item">
        <span>用户名</span>
        <span class="-item-color">James</span>
      </div>
      <div class="-c-item">
        <span>代理标识</span>
        <span class="-item-color">xxX898</span>
      </div>
      <div class="-c-item">
        <span>剩余点数</span>
        <span class="-item-color">4545</span>
      </div>
    </div>
    <div class="-p-footer">
      <a class="-button" @click="loginOut">退出登录</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'personal',
  data () {
    return {

    }
  },
  methods: {
    loginOut () {},
    goBack () {
      alert('回退')
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
