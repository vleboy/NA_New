import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import Login from '@/views/login'
import Personal from '@/views/personal'
import AddPlayer from '@/views/addPlayer'
import AddAgent from '@/views/addAgent'
import SaveRemind from '@/views/saveRemind'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personal
    },
    {
      path: '/addPlayer',
      name: 'addPlayer',
      component: AddPlayer
    },
    {
      path: '/addAgent',
      name: 'addAgent',
      component: AddAgent
    },
    {
      path: '/saveRemind',
      name: 'saveRemind',
      component: SaveRemind
    }

  ]
})
