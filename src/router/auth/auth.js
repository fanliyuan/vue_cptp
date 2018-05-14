import UserAuthListPage from '../../pages/auth/userAuthList.vue'
import EditUserAuthPage from '../../pages/auth/editUserAuth.vue'
import EditPositionPage from '../../pages/auth/editPosition.vue'
import AuthSearchResultPage from '../../pages/auth/authSearchResult.vue'
import EditPositionClassPage from '../../pages/auth/editPositionClass.vue'
import EditRolePage from '../../pages/auth/editRole.vue'
import EditPositionTypePage from '../../pages/auth/editPositionType'
export default [
  {
    path: '/auth',
    name: 'userAuthList',
    component: UserAuthListPage,
    children: [
      {
        path: 'search/:keyword',
        name: 'authSearch'
      }
    ]
  },
  {
    path: 'editUserAuth',
    name: 'editUserAuth',
    component: EditUserAuthPage,
    children: [
      {
        path: ':userId'
      }
    ]
  },
  {
    path: 'editPosition',
    name: 'editPosition',
    component: EditPositionPage
  },
  {
    path: 'authSearchResult',
    name: 'authSearchResult',
    component: AuthSearchResultPage
  },
  {
    path: 'editPositionClass',
    name: 'editPositionClass',
    component: EditPositionClassPage
  },
  {
    path: 'editPositionType',
    component: EditPositionTypePage
  },
  {
    path: 'editRole',
    name: 'editRole',
    component: EditRolePage
  }
]
