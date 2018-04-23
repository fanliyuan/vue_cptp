/*
 * @Author: ChouEric
 * @Date: 2018-04-23 17:09:02
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-04-23 17:09:25
*/

import apiBase from '../apiBase'
import apiFactory from '../apiFactory'

const module = {
  moduleName: 'product',
  apis: [
    {
      method: 'get',
      name: 'getProductList',
      url: '/getProductList'
    },
    {
      method: 'post',
      name: 'addProduct',
      url: '/addProduct'
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
