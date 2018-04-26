/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2017/11/21
 *
 * 描述 ：页面token验证
 */
import userAPIs from '../api/user/userAPIs'
export default (to, from, next) => {
  // console.log("userId", localStorage)
  if (localStorage.token) {
    userAPIs.checkToken({token: localStorage.token}).then(({ data }) => {
      // if (data.code === 10012) {
      //   next()
      // } else {
      //   next({
      //     path: '/login',
      //     query: { redUrl: to.fullPath }
      //   })
      // }
      next()
    }).catch(ex => {
      next()
    })
  } else {
    next({
      path: '/login',
      query: { redUrl: to.fullPath }
    })
  }
}
