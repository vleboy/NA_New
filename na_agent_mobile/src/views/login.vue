<template>
  <div class="p-login">
    <div class="-l-top">
      <img class="-top-img" src="/static/NAlogo.png">
    </div>
    <div class="-l-down">
      <form class="-l-form" autocomplete="off">
        <div class="form-item">
          <label class="-label-text">账号</label>
          <input class="-input" type="text" placeholder="请输入账号" v-model="userName">
        </div>
        <div class="form-item">
          <label class="-label-text">密码</label>
          <input class="-input" type="password" placeholder="请输入密码" v-model="password">
        </div>
        <div class="form-item">
          <a class="-button" @click="login">立即登录</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from '@/api/api'
  import bcrypt from "bcryptjs";
export default {
  name: 'login',
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    login () {
      let password = bcrypt.hashSync(this.password, 10);

      if(!this.userName || !this.password) {
        return  this.$toast({
          position: 'top',
          message: `请输入用户名或者密码`,
          className: '-item-message'
        })
      }
      this.$indicator.open({
        text: '登录中...',
        spinnerType: 'fading-circle'
      })

        this.$http({
          method: 'post',
          url: api.agentLogin,
          data: {
            mobileFlag: true,
            username: this.userName,
            password: password,
            role: '1000'
          }
        }).then(res => {
          this.$indicator.close()
          let loginInfo = res.data.payload
          localStorage.setItem('loginToken', loginInfo.token)
          localStorage.setItem('loginLevel', loginInfo.level)
          localStorage.setItem('loginSuffix', loginInfo.suffix)
          localStorage.setItem('loginSn', loginInfo.sn)
          localStorage.setItem('loginParent', loginInfo.parent)
          localStorage.setItem('loginDisplayName', loginInfo.displayName)
          localStorage.setItem('loginId', loginInfo.userId)
          localStorage.setItem('loginRole', loginInfo.role)
          localStorage.setItem('loginUsername', loginInfo.username)
          localStorage.setItem('loginParentName', loginInfo.parentName)
          localStorage.setItem('loginGameList', JSON.stringify(loginInfo.gameList))
          localStorage.setItem('loginRate', JSON.stringify(loginInfo.rate))
          this.$router.push('/home')
      }).catch(()=>{
          this.$indicator.close()
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .p-login{
    width: 100%;
    text-align: center;
    padding-top: 30%;
    height: 100%;
    background: url(../assets/login/login-bg.png) no-repeat;
    background-size: cover;
    position: fixed;
    z-index: -10;

    .-l-top {
      width: 100%;
      .-top-img{
        width:50%;
      }
    }

    .-l-down{
      font-size: 1.8em;
      padding: 20px 0;

      .-l-form{

        .form-item{
          margin: 0 40px 15px 40px;
          border: 1px solid #fff;
          border-radius: 50px;
          text-align: left;
        }

        .-label-text{
          width: 4em;
          text-align: center;
          display: inline-block;
          color: #fff;
        }

        .-input{
          line-height: 80px;
          color: #fff!important;
          background-color: transparent;
          border: none;
          outline: none;
          margin-left: 10px;
          width: 60%;
        }
        .-input {
          background-color: transparent !important;
        }
        .-input:-webkit-autofill {
          -webkit-transition: background-color 10000s cubic-bezier(1, -100, 1, -100) 0s;
          -webkit-text-fill-color:#fff;
        }


        .-input::-webkit-input-placeholder{
          color:#fff;
        }
        .-input::-moz-placeholder{   /* Mozilla Firefox 19+ */
          color:#fff;
        }
        .-button{
          display: block;
          width: 100%;
          text-align: center;
          line-height: 80px;
          color: #fff;
          letter-spacing: 5px;
        }
      }
    }

  }
</style>
