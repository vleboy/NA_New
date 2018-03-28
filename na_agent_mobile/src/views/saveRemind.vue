<template>
  <div class="p-player">
    <div class="-p-nav">
      <span class="-n-arrow"> <img @click="goBack" src="/static/arrow_left.png"></span>
      <span class="-n-name">{{isSave ? '存点' : '提点'}}</span>
    </div>
    <div class="-p-content" v-if="!isSuccess">
      <div class="-c-item">
        <div class="-item-text">发起方:</div>
        <div class="-item-name">
          <span>{{isSave ? agentInfo.username : playerInfo.userName}}</span>
          <div class="-item-tip" :class="{'-tips-color-player': !isSave,'-tips-color-agent':isSave}">{{isSave ? '代理' : '玩家'}}</div>
        </div>
        <div class="-item-point">{{isSave ? balanceInfo : playerInfo.balance}}</div>
      </div>
      <div class="-c-item">
        <div class="-item-text">接收方:</div>
        <div class="-item-name">
          <span>{{isSave ? playerInfo.userName : agentInfo.username}}</span>
          <div class="-item-tip " :class="{'-tips-color-player': isSave,'-tips-color-agent':!isSave}">{{isSave ? '玩家' : '代理'}}</div>
        </div>
        <div class="-item-point">{{isSave ? playerInfo.balance : balanceInfo}}</div>
      </div>
      <div class="-c-item">
        <label class="-item-text">交易点数:</label>
        <div class="-item-color">
          <input type="text" placeholder="请输入交易点数" v-model="amount">
        </div>
      </div>
      <!--<div class="-c-item">-->
        <!--<label class="-item-text -item-type">{{isSave ? '接收方类型' : '发起方类型'}}:</label>-->
        <!--<div class="-item-color">-->
          <!--<span v-for="item of typeList" class="-item-btn" @click="checkType(item)"-->
                <!--:class="{'-tips-color-agent':item.isChecked }">-->
            <!--{{item.name}}-->
          <!--</span>-->
        <!--</div>-->
      <!--</div>-->
    </div>

    <div v-else class="-p-content">
      <div class="-c-success-text">{{isSave ? '存点成功' : '提点成功'}}</div>
      <div class="-c-success-content">
        <div class="-c-item">
          <div class="-item-text">发起方:</div>
          <div class="-item-name">
            <span>{{isSave ? agentInfo.username : playerInfo.userName}}</span>
            <div class="-item-tip" :class="{'-tips-color-player': !isSave,'-tips-color-agent':isSave}">{{isSave ? '代理' : '玩家'}}</div>
          </div>
          <div class="-item-point">{{isSave ? balanceInfo : playerInfo.balance}}</div>
        </div>
        <div class="-c-success-deduction">-{{amount||0}}</div>
        <div class="-c-success-result">{{(isSave ? balanceInfo : playerInfo.balance)-amount}}</div>
      </div>
      <div class="-c-success-content">
        <div class="-c-item">
          <div class="-item-text">接收方:</div>
          <div class="-item-name">
            <span>{{isSave ? playerInfo.userName : agentInfo.username}}</span>
            <div class="-item-tip" :class="{'-tips-color-player': isSave,'-tips-color-agent':!isSave}">{{isSave ? '玩家' : '代理'}}</div>
          </div>
          <div class="-item-point">{{isSave ? playerInfo.balance : balanceInfo}}</div>
        </div>
        <div class="-c-success-deduction">+{{amount||0}}</div>
        <div class="-c-success-result">{{+(isSave ? playerInfo.balance : balanceInfo)+(+amount)}}</div>
      </div>

    </div>

    <div class="-p-footer">
      <a class="-button" @click="saveSubmit">{{isSuccess ? '关闭':'提交'}}</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { pattern } from '@/unit/regexp'
  import api from '@/api/api'
export default {
  name: 'saveRemind',
  data () {
    return {
      isEdit: false,
      isSuccess: false,
      typeList: [
        {
          name: '代理',
          id: 2,
          isChecked: false
        },
        {
          name: '玩家',
          id: 1,
          isChecked: false
        }
      ],

      amount: ''
    }
  },
  computed: {
    balanceInfo () {
      return this.$store.state.balance
    },
    agentInfo () {
      return this.$store.state.storageAgentOne
    },
    playerInfo () {
      return this.$store.state.storagePlayerOne
    },
    isSave () {
      // 1为存点  2位提点
      return this.$route.query.state == 1
    },
    isComeFromTop () {
      // 1为顶层存提点 2为玩家存提点
      return this.$route.query.toFrom == 1
    }
  },
  mounted() {
//    if(this.isSave) {
//      this.pointInfo.fromUser = this.isComeFromTop ? localStorage.loginUsername : ''
//      this.pointInfo.toUser = this.isComeFromTop ? '' : this.$route.query.userName
//    } else {
//      this.pointInfo.fromUser = this.isComeFromTop ? '' : this.$route.query.userName
//      this.pointInfo.toUser = this.isComeFromTop ? localStorage.loginUsername : ''
//    }
  },
  methods: {
    saveSubmit () {
      if(this.isSuccess) {
       return this.$router.push('/home')
      }
      let param = {}
      if (!this.amount) {
        return this.$toast({
          position: 'top',
          message: `请输入交易点数`,
          className: '-item-message'
        });
      } else if (!pattern.positive.exec(this.amount)) {
        return this.$toast({
          position: 'top',
          message: `请输入正确的交易点数`,
          className: '-item-message'
        });
      }

      this.$indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })

      param = {
        fromUserId: this.agentInfo.userId, // 代理ID
        toUser: this.playerInfo.userName, // 玩家用户民
        amount: this.amount // 金额
      }

      this.$http({
        method: 'post',
        url: `${this.isSave ? api.deposit : api.take}`,
        data:param
      }).then(res => {
        this.$indicator.close()
        this.$toast({
          position: 'top',
          message: `交易成功`,
          className: '-item-message'
        })
        this.isSuccess = !this.isSuccess

    }).catch(err=>{
        this.$indicator.close()
      })

    },
    showEdit () {
      this.isEdit = !this.isEdit
    },
//    checkType(item){
//      for (let data of this.typeList){
//        if(data.id == item.id) {
//          item.isChecked = !item.isChecked
//        } else {
//          data.isChecked = false
//        }
//      }
//    },
    goBack () {
      window.history.back()
    }
  }
}
</script>

<style lang="stylus" scoped>

  .p-player{
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
      padding: 1.5em 1.5em 0;

      .-c-item{
        display: flex;
        justify-content: space-between;
        padding: 20px 0;


        .-item-text{
          width: 25%;
          padding: 0 12px 0 0;
          box-sizing: border-box;
        }

        .-item-type{
          width: 35%;
        }

        .-item-name{
          width: 35%;
          text-align: center;

          .-item-tip{
            border-radius: 10px;
            border: 2px solid #ffcc54;
            padding: 0 6px;
            font-size: 26px;
            margin: 0 auto;
            width: 2.2em;
          }

          .-item-edit{
            font-size: .8em;
            color: #26a2ff;
          }
        }

        .-tips-color-agent{
          color: #26a2ff!important;
          border: 1px solid #26a2ff!important;
        }
        .-tips-color-player{
          color: #e6a23c;
          border: 1px solid #e6a23c;
        }

        .-item-input{
          padding: 20px 0 0 10px;
          width: 17.4em;
          font-size: 30px;
          border: none;
          border-bottom: 1px solid #7f7f7f;
        }
        .-item-point{
          text-align: right;
          width: 45%;
        }
        .-item-color{
          position: relative;
          color: #7f7f7f;
          width:75%;

          input{
            padding-top: 20px;
            width: 16.4em;
            font-size: 30px;
            border: none;
            border-bottom: 1px solid #7f7f7f;
          }

          .-item-btn{
            border: 1px solid #7f7f7f;
            display: inline-block;
            padding: 2px 26px;
            border-radius: 10px;
            margin-right: 1em;
          }
        }
      }

      .-c-success-text {
        text-align: center;
        margin-bottom: 1em;
      }
      .-c-success-content{
        border: 1px solid #d8d8d8;
        padding:20px;
        margin-bottom: 2em;
      }

      .-c-success-deduction{
        text-align: right;
        padding-bottom:10px;
        border-bottom: 2px solid #d8d8d8;
      }

      .-c-success-result{
        text-align: right;
        padding:10px 0;
      }
    }

    .-p-footer{
      margin-bottom: 1em;
      position: relative;
      left: 0;
      right: 0;
      top: 50px;

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
