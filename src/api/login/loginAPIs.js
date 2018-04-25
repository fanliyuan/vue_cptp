/*
 * @Author: ChouEric
 * @Date: 2018-04-23 17:13:04
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-04-25 10:58:49
*/

import apiBase from '../apiBase'
import apiFactory from '../apiFactory'

const module = {
  moduleName: 'login',
  apis: [
    {
      method: 'post',
      name: 'login',
      url: '/login'
    },
    {
      method: 'get',
      name: 'logout',
      url: '/logout'
    },
    {
      method: 'post',
      name: 'forget',
      url: '/forget'
    },
    // 检查token权限
    {
      method: 'get',
      name: 'checkToken',
      url: '/checkToken'
    }
  ]
}

class ApiSub extends apiBase {
  constructor (module) {
    super()
    this.moduleName = module.moduleName
    this.apis = module.apis
  }
}

export default apiFactory(new ApiSub(module))
