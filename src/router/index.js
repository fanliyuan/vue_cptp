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
import me from './me/index'
import user from './user/user'
import auth from './auth/auth'
import project from './project/project'
import dict from './dict'

import Login from '../pages/login/login.vue'
import Forget from '../pages/login/forget.vue'
import Error from '../pages/error/error.vue'
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
      redirect: '/me',
      meta: {isAdmin: 0}
    },
    {
      path: '/product',
      name: 'product-index',
      component: LayoutWithBreadCrumb,
      children: [
        ...product
      ],
      meta: {isAdmin: 0}
    },
    {
      path: '/me',
      name: 'me-index',
      component: LayoutWithBreadCrumb,
      children: [
        ...me
      ],
      meta: {isAdmin: 0}
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {isAdmin: 0}
    },
    {
      path: '/logout',
      name: 'logout',
      component: Login,
      meta: {isAdmin: 0}
    },
    {
      path: '/Forget',
      name: 'foget',
      component: Forget,
      meta: {isAdmin: 0}
    },
    {
      path: '/user',
      name: 'user-index',
      component: LayoutWithBreadCrumb,
      children: [
        ...user
      ],
      meta: {isAdmin: 3}
    },
    {
      path: '/auth',
      name: 'auth-index',
      component: LayoutWithBreadCrumb,
      children: [
        ...auth
      ],
      meta: {isAdmin: 3}
    },
    {
      path: '/project',
      name: 'project-index',
      component: LayoutWithBreadCrumb,
      children: [
        ...project
      ],
      meta: {isAdmin: 3}
    },
    {
      path: '/dict',
      redirect: '/dict/key',
      component: LayoutWithBreadCrumb,
      children: [
        ...dict
      ],
      meta: {isAdmin: 3}
    },
    {
      path: '*',
      component: Error
    }
  ]
})

router.beforeEach(middlewares)

export default router
