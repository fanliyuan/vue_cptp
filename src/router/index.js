/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2017/11/13
 *
 * 描述 ：路由配置
 */
import Vue from 'vue'
import Router from 'vue-router'

import product from './product/product'
import user from './user/user'
import me from './me/index'
import auth from './auth/auth'
import project from './project/project'
import dict from './dict'

import Login from '../pages/login/login.vue'
import Forget from '../pages/login/forget.vue'
// 路由中间件
import middlewares from '../middlewares'

// 重写模板布局页
import LayoutWithBreadCrumb from '../pages/layoutWithBreadCrumb'
// 模板布局页面
// const Layout = () => import('@/pages/layout.vue')
// const productDetailLayout = () => import('@pages/product/productDetailLayout.vue')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home-index',
      redirect: '/user'
    },
    {
      path: '/product',
      name: 'product-index',
      component: LayoutWithBreadCrumb,
      children: [
        ...product
      ]
    },
    {
      path: '/user',
      name: 'user-index',
      component: LayoutWithBreadCrumb,
      children: [
        ...user
      ]
    },
    {
      path: '/auth',
      name: 'auth-index',
      component: LayoutWithBreadCrumb,
      children: [
        ...auth
      ]
    },
    {
      path: '/me',
      name: 'me-index',
      component: LayoutWithBreadCrumb,
      children: [
        ...me
      ]
    },
    {
      path: '/project',
      name: 'project-index',
      component: LayoutWithBreadCrumb,
      children: [
        ...project
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Login
    },
    {
      path: '/Forget',
      name: 'foget',
      component: Forget
    },
    {
      path: '/dict',
      redirect: '/dict/key',
      component: LayoutWithBreadCrumb,
      children: [
        ...dict
      ]
    }
  ]
})

router.beforeEach(middlewares)

export default router
