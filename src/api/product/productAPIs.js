/*
 * @Author: ChouEric
 * @Date: 2018-04-23 17:09:02
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-04-25 15:43:23
*/

import apiBase from '../apiBase'
import apiFactory from '../apiFactory'

const module = {
  moduleName: 'product',
  apis: [
    {
      method: 'post',
      name: 'getProductList',
      url: '/getProductList'
    },
    {
      method: 'post',
      name: 'getProductById',
      url: '/getProductById'
    },
    {
      method: 'post',
      name: 'addProduct',
      url: '/addProduct'
    },
    {
      method: 'post',
      name: 'updateProductInfo',
      url: '/updateProductInfo'
    },
    {
      method: 'post',
      name: 'updateProductFrozenStatus',
      url: '/updateProductFrozenStatus'
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
