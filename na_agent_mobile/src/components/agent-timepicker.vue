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
          {{time.name}}
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
        {
          name: '1小时',
          id: 1
        },
        {
          name: '今日',
          id: 2
        },
        {
          name: '三日',
          id: 3
        },
        {
          name: '本周',
          id: 4
        },
        {
          name: '本月',
          id: 5
        }
      ],
      show: '',
      showTimeDefine: false,
      startDate: new Date(new Date(new Date().getTime() - 24*60*60*1000).setHours(11,59,59,0)),
      endDate: new Date()
    }
  },
  computed: {
    'startDateValues' () {
      return filters.formatTime(new Date(this.startDate).getTime(), 'yyyy-MM-dd hh:mm')
    },
    'endDateValues' () {
      return filters.formatTime(new Date(this.endDate).getTime(), 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    getUserData (time,index) {
      if(this.show === index) return
      this.showTimeDefine = false
      this.show = index
      let nowTime = new Date()
      let startDateTime,endDateTime = ''
      switch (time.id) {
        case 1:
          // 获取一小时数据
          startDateTime = nowTime.getTime() - 60*60*1000
          endDateTime = nowTime.getTime()
              break
        case 2:
          // 获取一天数据
          startDateTime = nowTime.setHours(0,0,0,0)
          endDateTime = nowTime.setHours(0,0,0,0) + 24*60*60*1000-1
              break
        case 3:
          // 获取三日数据
          startDateTime = nowTime.setHours(0,0,0,0) - 2*24*3600*1000
          endDateTime = nowTime.setHours(0,0,0,0) +  24*60*60*1000-1
              break
        case 4:
          // 获取本周数据
          startDateTime = this.getWeek().setHours(0, 0, 0, 0)
          endDateTime = this.getWeek().setHours(0, 0, 0, 0) + 7*24*3600*1000 - 1
              break
        case 5:
          // 获取本月数据
          startDateTime = new Date(nowTime.setMonth(nowTime.getMonth(),1)).setHours(0,0,0,0)
          endDateTime =  new Date(nowTime.setMonth(nowTime.getMonth()+1,0)).setHours(0,0,0,0)+24*3600*1000-1
              break
      }
      this.$store.commit({
        type: 'agentInfo_dateTime',
        data: {
          startDateTime: startDateTime,
          endDateTime: endDateTime
        }
      })
      this.$emit('searchTime')
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
      if(!this.startDateValues || !this.endDateValues) {
        return  this.$toast({
          position: 'top',
          message: `请输入完整的日期`,
          className: '-item-message'
        });
      }
      this.show = ''
      this.$store.commit({
        type: 'agentInfo_dateTime',
        data: {
          startDateTime: new Date(this.startDate).getTime(),
          endDateTime: new Date(this.endDate).getTime()
        }
      })
      this.$emit('searchTime')
    },
    getWeek() {
      let nowDate= new Date()  ;
      let nowDay = nowDate.getDay() || 7;
      return new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1 - nowDay);
    } // 处理周次
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
