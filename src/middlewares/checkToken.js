/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2017/11/21
 *
 * 描述 ：页面token验证
 */
import userAPIs from '../api/user/userAPIs'
export default (to, from, next) => {
  if (localStorage.token) {
    userAPIs.checkToken({token: localStorage.token}).then(({ data }) => {
      if (data) {
        next()
      } else {
        next({
          path: '/login',
          query: { redUrl: to.fullPath }
        })
      }
    }).catch(ex => {
      window.alert('网络不通畅')
    })
  } else {
    next({
      path: '/login',
      query: { redUrl: to.fullPath }
    })
  }
}
