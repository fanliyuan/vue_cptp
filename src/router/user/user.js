/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2018/3/27
 *
 * 描述 ：子路由 - 用户模块
 */
import UserListPage from '@/pages/user/userList.vue'
import AddUserPage from '@/pages/user/addUser.vue'
import editUserPage from '@/pages/user/editUser.vue'
import searchUserResultPage from '@/pages/user/searchUserResult.vue'
// const UserListPage = () => import('@/pages/user/userList.vue')
export default [
  {
    path: '/user',
    name: 'userList',
    component: UserListPage
  },
  {
    path: 'addUser',
    name: 'addUser',
    component: AddUserPage
  },
  {
    path: 'editUser',
    name: 'editUser',
    component: editUserPage
  },
  {
    path: 'searchUserResult',
    name: 'searchUserResult',
    component: searchUserResultPage
  }
]
