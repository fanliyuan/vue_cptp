import MyInfoPage from '../../pages/me/myInfo.vue'
import ChangePasswordPage from '../../pages/me/changePassword.vue'
import ChangeMobilePage from '../../pages/me/changeMobile.vue'

export default [
  {
    path: '/me',
    name: 'me',
    component: MyInfoPage
  },
  {
    path: 'changePassword',
    name: 'changePassword',
    component: ChangePasswordPage
  },
  {
    path: 'changeMobile',
    name: 'changeMobile',
    component: ChangeMobilePage
  }
]
