import Vue from 'vue'
import Router from 'vue-router'
import Auth from './auth'
import Layout from '../views/layouts/MainContent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...Auth,
    {
      path: '/',
      name: 'home',
      redirect: 'dashboard',
      component: Layout,
      meta: { auth: true },
      children: [
        {
          name: 'dashboard',
          path: '/dashboard',
          component: () => import('../views/dashboard/Index')
        }
      ]
    }
  ]
})
