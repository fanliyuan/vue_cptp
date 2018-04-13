/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2018/3/27
 *
 * 描述 ：子路由 - 用户模块
 */
import UserListPage from '@/pages/user/userList.vue'
// 添加与修改公用一个页面,有restful参数则是修改,否则是添加
// import AddUserPage from '@/pages/user/addUser.vue'
import editUserPage from '@/pages/user/editUser.vue'
// 搜索与列表页面公用一个模板
// const UserListPage = () => import('@/pages/user/userList.vue')
export default [
  {
    path: '/user',
    name: 'userList',
    component: UserListPage,
    children: [
      // restful参数
      {
        path: 'search/:keyword',
        name: 'searchUserResult',
        component: UserListPage
      }
    ]
  },
  {
    path: 'editUser',
    name: 'editUser',
    component: editUserPage,
    children: [
      {
        path: ':userId'
      }
    ]
  }
]
