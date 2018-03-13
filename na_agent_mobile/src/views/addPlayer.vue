<template>
  <div class="p-player">
    <div class="-p-nav">
      <span class="-n-arrow"> <img @click="goBack" src="/static/arrow_left.png"></span>
      <span class="-n-name">创建玩家</span>
    </div>
    <div class="-p-content">
      <div class="-c-item">
        <label class="-item-text">用户名:</label>
        <div class="-item-color">
          <input type="text" placeholder="以字母开头不小于6位字符">
        </div>
      </div>
      <div class="-c-item">
        <label class="-item-text">密码:</label>
        <div class="-item-color">
          <input type="text" placeholder="以字母开头不小于6位字符">
        </div>
      </div>
      <div class="-c-item">
        <label class="-item-text">所属代理</label>
        <div class="-item-agent">
          NA876
          <span class="-item-edit">编辑</span>
        </div>
      </div>
      <div class="-c-item">
        <label class="-item-text">首次添加点数:</label>
        <div class="-item-color">
          <input type="text" placeholder="可分配点数为：1010">
        </div>
      </div>
      <div class="-c-item">
        <label class="-item-text">视讯洗码比:</label>
        <div class="-item-color">
          <input type="text" placeholder="输入范围0~0.8">
        </div>
      </div>
      <div class="-c-item">
        <label class="-item-text">电游洗码比:</label>
        <div class="-item-color">
          <input type="text" placeholder="输入范围0~0.8">
        </div>
      </div>
      <div class="-c-item">
        <label class="-item-text">街机洗码比:</label>
        <div class="-item-color">
          <input type="text" placeholder="输入范围0~0.8">
        </div>
      </div>
      <div class="-c-item">
        <label class="-item-text">棋牌洗码比:</label>
        <div class="-item-color">
          <input type="text" placeholder="输入范围0~0.8">
        </div>
      </div>
      <div class="-c-item">
        <label class="-item-text">体育洗码比:</label>
        <div class="-item-color">
          <input type="text" placeholder="输入范围0~0.8">
        </div>
      </div>
      <div class="-c-checked">
        <div class="-c-checked-text">玩家限红</div>
        <div class="-c-checked-wrap">
          <div class="-c-checked-item" @click="checkLimit" :class="{'active':isChecked}">
            <div>百家乐：最小下注0.1，最大下注121212121</div>
            <div>轮盘：最小下注0.1，最大下注121212121</div>
            <div class="-c-checked-img" v-if="isChecked"><img src="/static/checked.png"></div>
          </div>
          <div class="-c-checked-item" @click="checkLimit" :class="{'active':isChecked}">
            <div>百家乐：最小下注0.1，最大下注121212121</div>
            <div>轮盘：最小下注0.1，最大下注121212121</div>
            <div class="-c-checked-img" v-if="isChecked"><img src="/static/checked.png"></div>
          </div>
          <div class="-c-checked-item" @click="checkLimit" :class="{'active':isChecked}">
            <div>百家乐：最小下注0.1，最大下注121212121</div>
            <div>轮盘：最小下注0.1，最大下注121212121</div>
            <div class="-c-checked-img" v-if="isChecked"><img src="/static/checked.png"></div>
          </div>
          <div class="-c-checked-item" @click="checkLimit" :class="{'active':isChecked}">
            <div>百家乐：最小下注0.1，最大下注121212121</div>
            <div>轮盘：最小下注0.1，最大下注121212121</div>
            <div class="-c-checked-img" v-if="isChecked"><img src="/static/checked.png"></div>
          </div>
          <div class="-c-checked-item" @click="checkLimit" :class="{'active':isChecked}">
            <div>百家乐：最小下注0.1，最大下注121212121</div>
            <div>轮盘：最小下注0.1，最大下注121212121</div>
            <div class="-c-checked-img" v-if="isChecked"><img src="/static/checked.png"></div>
          </div>
          <div class="-c-checked-item" @click="checkLimit" :class="{'active':isChecked}">
            <div>百家乐：最小下注0.1，最大下注121212121</div>
            <div>轮盘：最小下注0.1，最大下注121212121</div>
            <div class="-c-checked-img" v-if="isChecked"><img src="/static/checked.png"></div>
          </div>
          <div class="-c-checked-item" @click="checkLimit" :class="{'active':isChecked}">
            <div>百家乐：最小下注0.1，最大下注121212121</div>
            <div>轮盘：最小下注0.1，最大下注121212121</div>
            <div class="-c-checked-img" v-if="isChecked"><img src="/static/checked.png"></div>
          </div>

        </div>
      </div>
    </div>
    <div class="-p-footer">
      <a class="-button" @click="addPlayer">提交</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addPlayer',
  data () {
    return {
      isChecked: false
    }
  },
  methods: {
    addPlayer () {},
    goBack () {
      alert('回退')
    },
    checkLimit () {
      this.isChecked = !this.isChecked
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
            padding-top: 20px;
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
            padding: 10px 10px 10px 70px;
            font-size: 0.8em;
          }

          .-c-checked-img{
            position: absolute;
            top: 27px;
            left: 10px;
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
