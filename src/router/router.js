/*
 * @Author: ChouEric
 * @Date: 2018-05-23 17:23:46
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-05-23 17:26:23
 * 这个路由是用来登录的时候加载的,如果权限不够将不加载此页面的路由;
 * 如果先加载此页面的路由,再退出,再低权限用户,此页面路由还存在内存中,所有再退出用户前,需要刷新
*/

import user from './user/user'
import auth from './auth/auth'
import project from './project/project'
import dict from './dict'

// 路由中间件

// 重写模板布局页
import LayoutWithBreadCrumb from '../pages/layoutWithBreadCrumb'
const router = [
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
    path: '/project',
    name: 'project-index',
    component: LayoutWithBreadCrumb,
    children: [
      ...project
    ]
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
export default router
