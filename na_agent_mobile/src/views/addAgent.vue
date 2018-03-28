<template>
  <div class="p-player">
    <div class="-p-nav">
      <span class="-n-arrow"> <img @click="goBack" src="/static/arrow_left.png"></span>
      <span class="-n-name">创建代理</span>
    </div>
    <div class="-p-content">
      <div class="-c-item">
        <label class="-item-text">所属代理</label>
        <div class="-item-agent">
          {{agentName || '暂无'}}
          <!--<span class="-item-edit">编辑</span>-->
        </div>
      </div>
      <div class="-c-item">
        <label class="-item-text">代理标识</label>
        <div class="-item-agent">
          {{agentSn || '暂无'}}
        </div>
      </div>
      <div class="-c-item">
        <label class="-item-text">用户名:</label>
        <div class="-item-color">
          <input type="text" placeholder="以字母开头不小于6位字符" v-model="agentInfo.username">
        </div>
      </div>
      <div class="-c-item">
        <label class="-item-text">密码:</label>
        <div class="-item-color">
          <input type="text" placeholder="以字母开头不小于6位字符" v-model="agentInfo.password">
        </div>
      </div>
      <div class="-c-item">
        <label class="-item-text">昵称:</label>
        <div class="-item-color">
          <input type="text" placeholder="以字母开头不小于6位字符" v-model="agentInfo.displayName">
        </div>
      </div>
      <div class="-c-item">
        <label class="-item-text">代理成数:</label>
        <div class="-item-color">
          <input type="text" :placeholder="rateTip" v-model="agentInfo.rate">
        </div>
      </div>
      <div class="-c-item">
        <label class="-item-text">首次添加点数:</label>
        <div class="-item-color">
          <input type="text" :placeholder="pointsTip" v-model="agentInfo.points">
        </div>
      </div>
      <div class="-c-item" v-for="item in parentGameList">
        <label class="-item-text">{{item.name}}:</label>
        <div class="-item-color">
          <input type="text" :placeholder="item.mixTip" v-model="item.percentage">
        </div>
      </div>
      <div class="-c-checked">
        <div class="-c-checked-text">代理限红</div>
        <div class="-c-checked-wrap">
          <div class="-c-checked-item" @click="checkLimit(item)" :class="{'active':item.isChecked}" v-for="(item,index) in limitList" :key="index">
            <div>{{item.text}}</div>
            <div>{{item.chip}}</div>
            <div class="-c-checked-img" v-if="item.isChecked"><img src="/static/checked.png"></div>
          </div>
          <div v-if="!limitList.length">暂无数据</div>
        </div>
      </div>
    </div>
    <div class="-p-footer">
      <a class="-button" @click="addAgentFun">提交</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { pattern } from '@/unit/regexp'
  import api from '@/api/api'
export default {
  name: 'addAgent',
  data () {
    return {
      isChecked: false,
      agentSn: this.$route.query.agentSn,
      agentName: this.$route.query.agentName,
      agentInfo: {
        username: '', // 用户名
        password: '', // 密码
        displayName: '', // 昵称
        rate: '', // 成数
        points: '' // 点数
      },
      formValidationName: {
        'username': '用户名',
        'password': '密码',
        'displayName': '昵称',
        'rate': '代理成数',
        'points': '首次添加点数'
      },
      pointsTip: '', // 点数提示
      rateTip: '', // 成数提示
      limitList: [], // 限红列表
      chipList: [], // 存储限红列表
      oldChipList: [], // 存储限红列表
      billInfo: [], // 代理可分配点数以及相关信息
      gameReportForm: [
        {
          code: '10000',
          name: 'NA棋牌游戏',
          mix: '1'
        },
        {
          code: '30000',
          name: 'NA真人游戏',
          mix: '1'
        },
        {
          code: '40000',
          name: 'NA电子游戏',
          mix: '1'
        },
        {
          code: '50000',
          name: 'NA街机游戏',
          mix: '1'
        }
      ]
    }
  },
  computed: {
    gameList () {
      return this.$store.state.storageAgentOne.gameList || JSON.parse(localStorage.loginGameList)
    },
    parentGameList () {
      let param = ''

      if (this.$store.state.storageAgentOne == '') {// 首先判断是否是第一次登录 是第一次登录 判断是否是顶级管理员
        param = this.gameList.length ?  this.gameList : this.gameReportForm
      } else {
        param = this.gameList
      }

      return param
    },
    userId () {
      // 默认为登录用户的代理信息  点击代理列表后，开始传递点击代理的信息
      return this.$store.state.storageAgentOne.userId || localStorage.loginId
    },
    parentPlayerId () {
      let parent = ''
      if (this.$store.state.storageAgentOne == '') {// 首先判断是否是第一次登录 是第一次登录 判断是否是顶级管理员
        parent = localStorage.loginSuffix == 'Agent' ? '' : this.userId
      } else {
        parent = this.userId
      }
      return parent
    },
    addParentId () {
      let agent = ''
      if (this.$store.state.storageAgentOne == '') {// 首先判断是否是第一次登录 是第一次登录 判断是否是顶级管理员
        agent = localStorage.loginSuffix == 'Agent' ? '01' : this.userId
      } else {
        agent = this.userId
      }
      return agent
    } // 处理创建代理如果是直属那么传递的值为01
  },
  mounted () {
    for (let item of this.parentGameList) {
      item.mixTip = `可分配洗码比为0~${item.mix}`
    }
    this.getChildAgentList()
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
        this.billInfo = res.data.payload
        this.pointsTip = `可分配点数为：${this.billInfo.balance}`
        this.rateTip = `可分配成数为：${this.billInfo.rate}`
      }).catch(err=>{
        this.$indicator.close()
      })
    },
    getChildAgentList () {
      this.$indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      this.$http({
        method: 'post',
        url: api.chipList,
        data: {
          parentId: this.parentPlayerId
        }
      }).then(res => {
        this.$indicator.close()
        for (let item of res.data.list) {
          this.limitList.push({
            id: item.id,
            isChecked: false,
            text:`${item.gameId == 1 ? '百家乐' : '轮盘'}，最大：${item.max}，最小：${item.min}`,
            chip: `筹码：${item.jtton}`,
            value: item
          })
        }
      }).catch(err=>{
        this.$indicator.close()
      })
    },
    addAgentFun () {
      let param = JSON.parse(JSON.stringify(this.agentInfo))

      this.chipList = []

      this.oldChipList = []

      param.gameList = []

      param.role = '1000'

      param.parent = this.addParentId

      param.sn = this.$route.query.agentSn

      // 处理所代理的游戏洗码比
      for (let item of this.parentGameList) {
        if(item.percentage) {
          if(item.percentage > item.mix || item.percentage < 0) {
           return this.$toast({
              position: 'top',
              message: `请输入正确的${item.name}洗码比范围`,
              className: '-item-message'
            });
          } else {
            param.gameList.push({
              code: item.code,
              name: item.name,
              mix: item.percentage
            })
          }
        }
      }

      // 处理限红
      for (let item of this.limitList) {
        if(item.isChecked){
          this.chipList.push(item.value)
        }
        this.oldChipList.push(item.value)
      }

      // 限红没选择默认就是上一级全部
      param.chip = this.chipList.length ? this.chipList : this.oldChipList

      // 检测表单是否符合标准
      for (let item in this.agentInfo) {
        if (this.agentInfo[item] === '') {
          return this.$toast({
            position: 'top',
            message: `请输入${this.formValidationName[item]}`,
            className: '-item-message'
          });
        } else if (!pattern.firstLetter.exec(this.agentInfo[item]) && (item=='username'||item=='password'||item=='displayName')) {
          return this.$toast({
            position: 'top',
            message: `请输入符合规则的${this.formValidationName[item]}`,
            className: '-item-message'
          });
        } else if (item=='points' && !pattern.positiveInteger.exec(this.agentInfo[item])) {
          return this.$toast({
            position: 'top',
            message: `请输入符合规则的${this.formValidationName[item]}`,
            className: '-item-message'
          });
        }
      }

      if (param.rate > this.billInfo.rate) {
        return this.$toast({
          position: 'top',
          message: `已超出上级成数`,
          className: '-item-message'
        });
      } else if (param.points > this.billInfo.balance)  {
        return this.$toast({
          position: 'top',
          message: `已超出上级点数余额`,
          className: '-item-message'
        });
      } else if (!param.gameList.length ){
        return this.$toast({
          position: 'top',
          message: `请至少填写一款代理游戏`,
          className: '-item-message'
        });
      }

      this.$indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })

      this.$http({
        method: 'post',
        url: api.addAgent,
        data: param
      }).then(res => {
        this.$indicator.close()
        this.$toast({
          position: 'top',
          message: `创建成功`,
          className: '-item-message'
        })
        this.$router.push('/home')
      }).catch(err=>{
        this.$indicator.close()
      })
    },
    goBack () {
      window.history.back()
    },
    checkLimit (item) {
      item.isChecked = !item.isChecked
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
        padding: 10px 0;

        .-item-text{
          width: 220px;
          text-align: right;
          vertical-align: middle;
          float: left;
          line-height: 40px;
          padding: 0 12px 0 0;
          box-sizing: border-box;
          position: relative;
          top:20px;
        }

        .-item-color{
          margin-left: 220px;
          line-height: 40px;
          position: relative;

          color: #7f7f7f;

          input{
            padding: 20px 0 0 10px;
            width: 14.4em;
            font-size: 30px;
            border: none;
            border-bottom: 1px solid #7f7f7f;
          }
        }

        .-item-agent{
          position: relative;
          top: 10px;
          display: flex;
          justify-content: space-between;
        }

        .-item-edit{
          color: #26a2ff;
        }
      }

      .-c-checked{
        margin-top: 20px;

        .-c-checked-text{
          margin-bottom: 20px;
        }

        .-c-checked-wrap{

          .-c-checked-item{
            position: relative;
            margin-bottom: 10px;
            border: 1px solid #c3c3c3;
            border-radius: 10px;
            padding: 10px 10px 10px 100px;
            font-size: 0.8em;
          }

          .-c-checked-img{
            position: absolute;
            top: 27px;
            left: 30px;
            bottom: 0;
            text-align: right;
            display: inline-block;
            width: 2em;
            img{
              width: 100%;
            }
          }

        }

        .active{
          border: 1px solid #7fb5e4!important;
        }
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
