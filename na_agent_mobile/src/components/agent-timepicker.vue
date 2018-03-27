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

      <div class="tiem_userdefine" @click="showTimeDefineView('picker')" :class="{ user_define_active: showTimeDefine }">
        <span>自定义</span>
        <i>
          <img src="../assets/img/icon-down.png" alt="">
        </i>
      </div>

    </div>

    <div class="time_input" v-show="showTimeDefine">
      <div class="time_start">
        <div>开始 : <input type="text" v-model="startDateValues" @click="selectStartDate('pickerStartDate')" readonly/></div>
        <mt-datetime-picker
          ref="pickerStartDate"
          v-model="startDate">
        </mt-datetime-picker>
      </div>

      <div class="time_end">
        <div>结束 : <input type="text" v-model="endDateValues" @click="selectEndDate('pickerEndDate')" readonly/><span @click="timeSearch()">搜索</span></div>
        <mt-datetime-picker
          ref="pickerEndDate"
          :startDate="new Date(startDateValues.replace(' ', 'T'))"
          v-model="endDate">
        </mt-datetime-picker>
      </div>
    </div>
  </div>
</template>

<script>
import filters from '../assets/common/filters'
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
      show: '',
      showTimeDefine: false,
      startDate: '',
      endDate: ''
    }
  },
  computed: {
    'startDateValues' () {
      return filters.formatTime(new Date(this.startDate).getTime(), 'yyyy-MM-dd hh:mm:ss')
    },
    'endDateValues' () {
      return filters.formatTime(new Date(this.endDate).getTime(), 'yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
    getUserData (time, index) {
      this.show = index
      console.log(time,index)
    },
    showTimeDefineView () {
      this.showTimeDefine = !this.showTimeDefine
    },
    selectStartDate (picker) {
      this.$refs[picker].open()
    },
    selectEndDate (picker) {
      this.$refs[picker].open()
    },
    timeSearch () {
      console.log(this.startDateValues, this.endDateValues)
      this.show = ''
      this.$emit('searchTime')
    }
  }
}
</script>

<style lang="stylus" scoped>
// 时间选择框
.timepicker_contanier, .time_input
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
  padding 0 15px
  i
    display inline-block
    width 30px
    height 25px
    img
      width 100%
      transition .5s

.active
  background-color #014073

// 自定义选择时间
.time_input
  background-color #5796CC
  justify-content normal

.time_start, .time_end
  margin 0 15px
  input
    width 220px
    font-size 20px
    outline-style none
    border 0
    border-radius 0
    border-bottom 1px solid #ffffff
    background-color #5796CC
    color #ffffff
    padding 0
  span
    margin-left 15px

.user_define_active
  background #014073
  img
    transform rotate(180deg)
    transition transform .5s
</style>
