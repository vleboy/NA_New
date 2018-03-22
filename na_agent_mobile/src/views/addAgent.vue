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
          {{agentSuffix || '暂无'}}
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
          <input type="text" placeholder="输入范围0~0.8" v-model="agentInfo.rate">
        </div>
      </div>
      <div class="-c-item">
        <label class="-item-text">首次添加点数:</label>
        <div class="-item-color">
          <input type="text" :placeholder="pointsTip" v-model="agentInfo.points">
        </div>
      </div>
      <div class="-c-item">
        <label class="-item-text">视讯洗码比:</label>
        <div class="-item-color">
          <input type="text" placeholder="输入范围0~0.8" v-model="agentInfo.videoRatio">
        </div>
      </div>
      <div class="-c-item">
        <label class="-item-text">电游洗码比:</label>
        <div class="-item-color">
          <input type="text" placeholder="输入范围0~0.8" v-model="agentInfo.electronicsRatio">
        </div>
      </div>
      <div class="-c-item">
        <label class="-item-text">街机洗码比:</label>
        <div class="-item-color">
          <input type="text" placeholder="输入范围0~0.8" v-model="agentInfo.arcadeRatio">
        </div>
      </div>
      <div class="-c-item">
        <label class="-item-text">棋牌洗码比:</label>
        <div class="-item-color">
          <input type="text" placeholder="输入范围0~0.8" v-model="agentInfo.chessRatio">
        </div>
      </div>
      <div class="-c-item">
        <label class="-item-text">体育洗码比:</label>
        <div class="-item-color">
          <input type="text" placeholder="输入范围0~0.8" v-model="agentInfo.sportsRatio">
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
      agentSuffix: this.$route.query.agentSuffix,
      agentName: this.$route.query.agentName,
      agentInfo: {
        username: '', // 用户名
        password: '', // 密码
        displayName: '', // 昵称
        rate: '', // 成数
        points: '', // 点数
        videoRatio: '0', // 视讯洗码比
        electronicsRatio: '0', // 电子洗码比
        arcadeRatio: '0', // 街机洗码比
        chessRatio: '0', // 棋牌洗码比
        sportsRatio: '0' // 体育洗码比
      },
      formValidationName: {
        'username': '用户名',
        'password': '密码',
        'displayName': '昵称',
        'rate': '代理成数',
        'points': '首次添加点数',
        'videoRatio': '视讯洗码比',
        'electronicsRatio': '电子洗码比',
        'arcadeRatio': '街机洗码比',
        'chessRatio': '棋牌洗码比',
        'sportsRatio': '体育洗码比'
      },
      parentId:'d5cd8c7c-50e8-45af-97a5-141efc49a13a',
      pointsTip: '',
      limitList: [],
      chipList: [],
      oldChipList: [],
      billInfo: [], // 代理可分配点数以及相关信息
      userId: localStorage.getItem('loginId')
    }
  },
  mounted () {
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
        if (res.data.code != '0') {
          this.$toast({
            position: 'top',
            message: `${res.data.msg}`,
            className: '-item-message'
          })
        } else {
          this.billInfo = res.data.payload
          this.pointsTip = `可分配点数为：${this.billInfo.balance}`
        }
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
          parentId:this.parentId
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
      })
    },
    addAgentFun () {
      let param = JSON.parse(JSON.stringify(this.agentInfo))

      this.chipList = []

      param.role = '1000'

      param.parent = this.parentId

      param.gameList = [
        {
          name: '视讯',
          mix: this.agentInfo.videoRatio
        },
        {
          name: '电子',
          mix: this.agentInfo.electronicsRatio
        },
        {
          name: '街机',
          mix: this.agentInfo.arcadeRatio
        },
        {
          name: '棋牌',
          mix: this.agentInfo.chessRatio
        },
        {
          name: '体育',
          mix: this.agentInfo.sportsRatio
        }
      ]

      // 处理限红
      for (let item of this.limitList) {
        if(item.isChecked){
          this.chipList.push(item.value)
        }
        this.oldChipList.push(item.value)
      }

      param.chip = this.chipList.length ? this.chipList : this.oldChipList // 限红没选择默认就是上一级全部

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
          console.log(1)
          return this.$toast({
            position: 'top',
            message: `请输入符合规则的${this.formValidationName[item]}`,
            className: '-item-message'
          });
        } else if((this.agentInfo[item]>0.8 || this.agentInfo[item]<0)&& (item!='points')) {
          console.log(2)
          return this.$toast({
            position: 'top',
            message: `请输入符合规则的${this.formValidationName[item]}`,
            className: '-item-message'
          });
        }
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
        if (res.data.code != '0') {
          this.$toast({
            position: 'top',
            message: `${res.data.msg}`,
            className: '-item-message'
          })
        } else {
          this.$route.push('/home')
          this.$toast({
            position: 'top',
            message: `创建成功`,
            className: '-item-message'
          })
        }
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
