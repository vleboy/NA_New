<template>
  <div class="timepicker">
    <div class="timepicker_contanier">
      <div class="time_group">
        <span
          v-for="(time, index) in times"
          :key="index"
          @click="getUserData(time, index)"
          :class="{ active: show === index }"
        >
          {{time}}
        </span>
      </div>

      <div class="tiem_userdefine">
        自定义
        <i>
          <img src="../assets/img/icon-down.png" alt="">
        </i>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'timepicker',
  data () {
    return {
      times: [
        '1小时',
        '今日',
        '三日',
        '本周',
        '本月'
      ],
      show: ''
    }
  },
  methods: {
    getUserData (time, index) {
      this.show = index
    }
  }
}
</script>

<style lang="stylus" scoped>
// 时间选择框
.timepicker_contanier
  display flex
  justify-content space-between
  width 750px
  height 60px
  line-height 60px
  font-size 30px
  color #ffffff
  background-color #005DA9

.time_group
  display flex
  margin-left 15px
  span
    display block
    height 100%
    padding 0 15px

.tiem_userdefine
  margin-right 55px
  i
    display inline-block
    width 30px
    height 25px
    img
      width 100%

.active
  background-color #014073
</style>
