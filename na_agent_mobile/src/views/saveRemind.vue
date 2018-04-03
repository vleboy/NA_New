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
          <span>{{initiatorName}}</span>
          <div class="-item-tip" :class="{'-tips-color-player': !isSave,'-tips-color-agent':isSave}">{{initiatorTag}}</div>
        </div>
        <div class="-item-point">{{initiatorBalance || 0}}</div>
      </div>
      <div class="-c-item">
        <div class="-item-text">接收方:</div>
        <div class="-item-name">
          <span>{{receiverName}}</span>
          <div class="-item-tip " :class="{'-tips-color-player': isSave,'-tips-color-agent':!isSave}">{{receiverTag}}</div>
        </div>
        <div class="-item-point">{{receiverBalance}}</div>
      </div>
      <div class="-c-item">
        <label class="-item-text">交易点数:</label>
        <div class="-item-color">
          <input type="text" placeholder="请输入交易点数" v-model="amount">
        </div>
      </div>
    </div>

    <div v-else class="-p-content">
      <div class="-c-success-text">{{isSave ? '存点成功' : '提点成功'}}</div>
      <div class="-c-success-content">
        <div class="-c-item">
          <div class="-item-text">发起方:</div>
          <div class="-item-name">
            <span>{{initiatorName}}</span>
            <div class="-item-tip" :class="{'-tips-color-player': !isSave,'-tips-color-agent':isSave}">{{initiatorTag}}</div>
          </div>
          <div class="-item-point">{{initiatorBalance}}</div>
        </div>
        <div class="-c-success-deduction">-{{amount||0}}</div>
        <div class="-c-success-result">{{initiatorBalance-amount}}</div>
      </div>
      <div class="-c-success-content">
        <div class="-c-item">
          <div class="-item-text">接收方:</div>
          <div class="-item-name">
            <span>{{receiverName}}</span>
            <div class="-item-tip" :class="{'-tips-color-player': isSave,'-tips-color-agent':!isSave}">{{receiverTag}}</div>
          </div>
          <div class="-item-point">{{receiverBalance}}</div>
        </div>
        <div class="-c-success-deduction">+{{amount||0}}</div>
        <div class="-c-success-result">{{+(receiverBalance)+(+amount)}}</div>
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
      amount: '',
      parentBalance: ''
    }
  },
  computed: {
    balanceInfo () {
      return this.$store.state.balance
    }, // 当前代理的剩余点数
    agentInfo () {
      return this.$store.state.storageAgentOne
    }, // 单个代理信息
    playerInfo () {
      return this.$store.state.storagePlayerOne
    }, // 单个玩家信息
    parentUserId () {
      return localStorage.loginSuffix=='Agent' ? localStorage.loginId : this.$store.state.storageAgentOne.parent
    },// 获取上级的userID
    isSave () {
      return this.$route.query.state == 1
    },// 1为存点  2位提点
    isComeFromTop () {
      return this.$route.query.toFrom == 1
    }, // 1为代理存提点 2为玩家存提点
    initiatorName () {
      let param
      if (this.isComeFromTop ) {
        param = this.isSave ? this.agentInfo.parentDisplayName : this.agentInfo.displayName
      } else {
        console.log(this.agentInfo)
        param = this.isSave ? this.agentInfo.username || localStorage.loginUsername : this.playerInfo.userName
      }
      return param
    }, // 发起方名称
    receiverName () {
      let param
      if (this.isComeFromTop ) {
        param = this.isSave ? this.agentInfo.displayName : this.agentInfo.parentDisplayName
      } else {
        param = this.isSave ? this.playerInfo.userName : this.agentInfo.username || localStorage.loginUsername
      }
      return param
    }, // 接收方名称
    initiatorTag () {
      let param
      if (this.isComeFromTop ) {
        param = '代理'
      } else {
        param = this.isSave ? '代理' : '玩家'
      }
      return param
    }, // 发起方标识提示
    receiverTag () {
      let param
      if (this.isComeFromTop ) {
        param = '代理'
      } else {
        param = this.isSave ? '玩家' : '代理'
      }
      return param
    }, // 接收方标识提示
    initiatorBalance () {
      let param
      if (this.isComeFromTop ) {
        param = this.isSave ? this.parentBalance : this.balanceInfo
      } else {
        param = this.isSave ? this.balanceInfo : this.playerInfo.balance
      }
      return param
    }, // 发起方余额
    receiverBalance () {
      let param
      if (this.isComeFromTop ) {
        param = this.isSave ? this.balanceInfo : this.parentBalance
      } else {
        param = this.isSave ? this.playerInfo.balance :  this.balanceInfo
      }
      return param
    } // 接收方余额
  },
  mounted () {
    this.isComeFromTop && this.getBills()
  },
  methods: {
    saveSubmit () {
      if(this.isSuccess) {
       return this.$router.push('/home')
      }

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

      this.isComeFromTop ? this.agentSaveRemind() : this.playerSaveRemind()

    },
    showEdit () {
      this.isEdit = !this.isEdit
    },
    goBack () {
      window.history.back()
    },
    getBills () {
      this.$indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      this.$http({
        method: 'get',
        url: `${api.bills}/${this.parentUserId}`
      }).then(res => {
        this.$indicator.close()
        this.parentBalance = res.data.payload.balance
      }).catch(err=>{
        this.$indicator.close()
      })
    }, // 获取剩余点数
    playerSaveRemind () {
      let param = {
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
    },// 玩家存取点
    agentSaveRemind () {
      let param = {
        fromUserId: this.isSave ? (localStorage.loginSuffix=='Agent' ? localStorage.loginId : this.agentInfo.parent) : this.agentInfo.userId, //  存点： 父级id  提点： 当前代理id
        toUser: this.isSave ? this.agentInfo.username : this.agentInfo.parentName, // 存点：当前代理的用户名  提点： 父级用户名
        amount: this.amount, // 金额
        toRole: '1000'
      }

      this.$http({
        method: 'post',
        url: api.billTransfer,
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
    } //代理存取点
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
        }

        .-tips-color-agent{
          color: #26a2ff!important;
          border: 1px solid #26a2ff!important;
        }
        .-tips-color-player{
          color: #e6a23c;
          border: 1px solid #e6a23c;
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
