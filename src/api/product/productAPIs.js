/*
 * @Author: ChouEric
 * @Date: 2018-04-23 17:09:02
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-05-22 14:28:37
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
    },
    {
      method: 'post',
      name: 'getProductByFrozenStatus',
      url: '/getProductByFrozenStatus'
    },
    {
      method: 'post',
      name: 'getFileInfo',
      url: '/getFileInfo'
    },
    {
      method: 'post',
      name: 'getProductMember',
      url: '/getProductMember'
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
