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

import Login from '../pages/login/login.vue'
import ProductDetailPage from '../pages/product/productDetail.vue'
// 路由中间件
import middlewares from '../middlewares'

// 产品模板页面
import productDetailLayout from '../pages/product/productDetailLayout'
// 模板布局页面
const Layout = () => import('@/pages/layout.vue')
// const productDetailLayout = () => import('@pages/product/productDetailLayout.vue')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home-index',
      component: Layout,
      redirect: '/user'
    },
    {
      path: '/product/detail',
      name: 'product-detail',
      component: productDetailLayout,
      children: [
        {
          path: ':productId',
          name: 'detail',
          component: ProductDetailPage
        }
      ]
    },
    {
      path: '/product',
      name: 'product-index',
      component: Layout,
      children: [
        ...product
      ]
    },
    {
      path: '/user',
      name: 'user-index',
      component: Layout,
      children: [
        ...user
      ]
    },
    {
      path: '/auth',
      name: 'auth-index',
      component: Layout,
      children: [
        ...auth
      ]
    },
    {
      path: '/me',
      name: 'me-index',
      component: Layout,
      children: [
        ...me
      ]
    },
    {
      path: '/project',
      name: 'project-index',
      component: Layout,
      children: [
        ...project
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach(middlewares)

export default router
