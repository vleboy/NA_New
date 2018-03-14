<template>
  <div class="p-player">
    <div class="-p-nav">
      <span class="-n-arrow"> <img @click="goBack" src="/static/arrow_left.png"></span>
      <span class="-n-name">{{isSave ? '存点' : '提点'}}</span>
    </div>
    <div class="-p-content" v-if="!isSuccess">
      <div class="-c-item">
        <div class="-item-text">发起方:</div>
        <div class="-item-name">James
          <div class="-item-tip" :class="{'-tips-color-player': !isSave,'-tips-color-agent':isSave}">{{isSave ? '代理' : '玩家'}}</div>
        </div>
        <div class="-item-point">1111111111211</div>
      </div>
      <div class="-c-item">
        <div class="-item-text">接收方:</div>
        <div class="-item-name">James2
          <div class="-item-tip " :class="{'-tips-color-player': isSave,'-tips-color-agent':!isSave}">{{isSave ? '玩家' : '代理'}}</div>
        </div>
        <div class="-item-point">11111111111</div>
      </div>
      <div class="-c-item">
        <label class="-item-text">交易点数:</label>
        <div class="-item-color">
          <input type="text" placeholder="输入范围0~0.8">
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

<script>
export default {
  name: 'saveRemind',
  data () {
    return {
      isChecked: false,
      isSuccess: false
    }
  },
  computed: {
    isSave () {
      return this.$route.query.state === 1
    }
  },
  methods: {
    saveSubmit () {
      this.isSuccess = !this.isSuccess
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
        padding: 10px 0;


        .-item-text{
          width: 25%;
          padding: 0 12px 0 0;
          box-sizing: border-box;
        }

        .-item-name{
          width: 25%;
          text-align: center;

          .-item-tip{

            font-size: 12px;
            border-radius: 0.9em;
            width: 3.6em;
            margin: 0 auto;
          }
          .-tips-color-agent{
            color: #26a2ff;
            border: 1px solid #26a2ff;
          }
          .-tips-color-player{
            color: #e6a23c;
            border: 1px solid #e6a23c;
          }
        }

        .-item-point{
          text-align: right;
          width: 50%;
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
