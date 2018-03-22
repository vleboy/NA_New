import axios from 'axios'
import router from '@/router'
require('es6-promise').polyfill()
import { Toast } from 'mint-ui';

export const Axios = axios.create({
  timeout: 10000,
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyOTdkNTgxMC1jOTkyLTQ0YzgtOTA0OC02ZmI4MjUwNGNmYjEiLCJyb2xlIjoiMTAwMCIsInN1ZmZpeCI6IkFnZW50IiwidXNlcm5hbWUiOiJOQWFnZW50IiwicGFyZW50IjoiMDAiLCJwYXJlbnROYW1lIjoiU3VwZXJBZG1pbiIsInBhcmVudFJvbGUiOiIwMCIsImRpc3BsYXlOYW1lIjoi5Luj55CG566h55CG5ZGYIiwibGV2ZWwiOjAsInZlZGlvTWl4IjoxLCJsaXZlTWl4IjoxLCJkaXNwbGF5SWQiOjIwMzE4MiwiY29udHJhY3RQZXJpb2QiOjAsImlzZm9yZXZlciI6dHJ1ZSwidXBkYXRlZEF0IjoxNTIwOTExNjU1NDYxLCJzbiI6Ik5VTEwhIiwiZmVlZGJhY2tVUkwiOiJOVUxMISIsImxhdW5jaEltZyI6Ik5VTEwhIiwiZXhwIjoxNTIxNjgzMDY0LCJpYXQiOjE1MjE0MjM4MzR9.MPD_e2MhnmtqCNnko0ysG5ATzFSccKgbAg-HEhJA8Sk'
  }
})
// POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(config => {
  if (localStorage.loginToken) {
    config.headers.Authorization = 'JWT ' + localStorage.loginToken
  }
  return config
}, error => {
  alert('错误的传参', 'fail')
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(res => {
  // 对响应数据做些事
  if (res.data.code != '0') {
    Toast({
      position: 'top',
      message: `${res.data.msg}`,
      className: '-item-message'
    });
    if(res.data.code =='-2') {
      router.push('/login')
      localStorage.clear()
    }
    return Promise.reject(res)
  }
  return Promise.resolve(res)
}, error => {
  // if (error.response.status === 401) {
  // // 401 说明 token 验证失败
  // // 可以直接跳转到登录页面，重新登录获取 token
  //   location.href = '/login'
  // } else {
  // // do something
  // }
  // 返回response里的错误信息
  return Promise.reject(error)
})

export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$http', { value: Axios })
  }
}
