// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Fastclick from 'fastclick'
import { DatetimePicker } from 'mint-ui'
import filters from './assets/common/filters'
import fetch from './api/fetch'
import 'normalize.css'

// 封装ajax请求
Vue.use(fetch)

// 添加过滤器
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]))

// 引用mint-ui时间控件
Vue.component(DatetimePicker.name, DatetimePicker)

// 解决移动端点击延迟
Fastclick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
