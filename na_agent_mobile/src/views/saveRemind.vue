<template>
  <div class="p-player">
    <div class="-p-nav">
      <span class="-n-arrow"> <img @click="goBack" src="/static/arrow_left.png"></span>
      <span class="-n-name">{{isSave ? '存点' : '提点'}}</span>
    </div>
    <div class="-p-content" v-if="!isSuccess">
      <div class="-c-item">
        <div class="-item-text">发起方:</div>
        <div class="-item-name" v-if="!isEdit">
          <span>James</span>
          <span @click="showEdit" class="-item-edit">编辑</span>
          <div class="-item-tip" :class="{'-tips-color-player': !isSave,'-tips-color-agent':isSave}">{{isSave ? '代理' : '玩家'}}</div>
        </div>
        <div class="-item-point" v-if="!isEdit">1111111111211</div>
        <div v-if="isEdit">
          <input class="-item-input" type="text" placeholder="请输入发起方用户名" v-model="pointInfo.fromUser">
        </div>
      </div>
      <div class="-c-item">
        <div class="-item-text">接收方:</div>
        <div class="-item-name" v-if="!isEdit">
          <span>James2</span>
          <span @click="showEdit" class="-item-edit">编辑</span>
          <div class="-item-tip " :class="{'-tips-color-player': isSave,'-tips-color-agent':!isSave}">{{isSave ? '玩家' : '代理'}}</div>
        </div>
        <div class="-item-point" v-if="!isEdit">11111111111</div>
        <div v-if="isEdit">
          <input class="-item-input" type="text" placeholder="请输入接收方用户名" v-model="pointInfo.toUser">
        </div>
      </div>
      <div class="-c-item">
        <label class="-item-text">交易点数:</label>
        <div class="-item-color">
          <input type="text" placeholder="请输入交易点数" v-model="pointInfo.amount">
        </div>
      </div>
      <div class="-c-item" v-if="isEdit">
        <label class="-item-text -item-type">{{isSave ? '接收方类型' : '发起方类型'}}:</label>
        <div class="-item-color">
          <span v-for="item of typeList" class="-item-btn" @click="checkType(item)"
                :class="{'-tips-color-agent':item.isChecked }">
            {{item.name}}
          </span>
        </div>
      </div>
    </div>
    <div v-else class="-p-content">
      <div class="-c-success-text">{{isSave ? '存点成功' : '提点成功'}}</div>
      <div class="-c-success-content">
        <div class="-c-item">
          <div class="-item-text">发起方:</div>
          <div class="-item-name">James
            <div class="-item-tip" :class="{'-tips-color-player': !isSave,'-tips-color-agent':isSave}">{{isSave ? '代理' : '玩家'}}</div>
          </div>
          <div class="-item-point">11111111113431</div>
        </div>
        <div class="-c-success-deduction">-111000</div>
        <div class="-c-success-result">11111111111</div>
      </div>
      <div class="-c-success-content">
        <div class="-c-item">
          <div class="-item-text">接收方:</div>
          <div class="-item-name">James3
            <div class="-item-tip" :class="{'-tips-color-player': isSave,'-tips-color-agent':!isSave}">{{isSave ? '玩家' : '代理'}}</div>
          </div>
          <div class="-item-point">11111111113431</div>
        </div>
        <div class="-c-success-deduction">+111000</div>
        <div class="-c-success-result">11111111111</div>
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
      storage: '',
      pointInfo: {
        fromUser: '', // 存提点目标代理/玩家username
        toUser: '', // 存提点目标代理/玩家username
        amount: '', // 金额
        action: this.isSave ? '1' : '2', // 1存点，2提点
        type: '' // 1,针对玩家存提点，2，针对代理存提点
      }
    }
  },
  computed: {
    isSave () {
      return this.$route.query.state === 1
    }
  },
  methods: {
    saveSubmit () {
      let param = {}
      for (let item of this.typeList) {
        if (item.isChecked) {
          this.pointInfo.type = item.id
        }
      }
      if(!this.pointInfo.fromUser) {
        return this.$toast({
          position: 'top',
          message: `请输入发起方`,
          className: '-item-message'
        });
      } else if (!this.pointInfo.toUser) {
        return this.$toast({
          position: 'top',
          message: `请输入接收方`,
          className: '-item-message'
        });
      } else if (!this.pointInfo.amount) {
        return this.$toast({
          position: 'top',
          message: `请输入交易点数`,
          className: '-item-message'
        });
      } else if (!pattern.positive.exec(this.pointInfo.amount)) {
        return this.$toast({
          position: 'top',
          message: `请输入正确的交易点数`,
          className: '-item-message'
        });
      } else if (!this.pointInfo.type) {
        return this.$toast({
          position: 'top',
          message: `请选择类型`,
          className: '-item-message'
        });
      }
      this.$indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      param = this.pointInfo
      this.$http({
        method: 'post',
        url: api.points,
        data:param
      }).then(res => {
        this.$indicator.close()
        if (res.data.code != '0') {
          this.$toast({
            position: 'top',
            message: `${res.data.msg}`,
            className: '-item-message'
          })
        } else {
          this.$toast({
            position: 'top',
            message: `创建成功`,
            className: '-item-message'
          })
          this.isSuccess = !this.isSuccess
        }
    })

    },
    showEdit () {
      this.isEdit = !this.isEdit
    },
    checkType(item){
      this.storage = item
      for (let data of this.typeList){
        if(data.id == item.id) {
          item.isChecked = !item.isChecked
        } else {
          data.isChecked = false
        }
      }
    },
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

            font-size: 12px;
            border-radius: 0.9em;
            width: 3.6em;
            margin: 0 auto;
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
