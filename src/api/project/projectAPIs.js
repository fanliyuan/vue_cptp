/*
 * @Author: ChouEric
 * @Date: 2018-04-25 16:07:51
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-04-25 16:26:39
*/

import apiBase from '../apiBase'
import apiFactory from '../apiFactory'

const module = {
  moduleName: 'project',
  apis: [
    {
      method: 'post',
      name: 'addProject',
      url: '/addProject'
    },
    {
      method: 'post',
      name: 'changeProductProject',
      url: '/changeProductProject'
    },
    {
      method: 'post',
      name: 'deleteProject',
      url: '/deleteProject'
    },
    {
      method: 'post',
      name: 'filterProductList',
      url: '/filterProductList'
    },
    {
      method: 'post',
      name: 'getProdutLevelList',
      url: '/getProdutLevelList'
    },
    {
      method: 'post',
      name: 'searchProjectList',
      url: '/searchProjectList'
    },
    {
      method: 'post',
      name: 'updateProductProject',
      url: '/updateProductProject'
    },
    {
      method: 'post',
      name: 'updateProject',
      url: '/updateProject'
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
