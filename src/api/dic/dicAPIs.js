/*
 * @Author: ChouEric
 * @Date: 2018-04-25 13:27:31
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-04-26 16:30:24
*/

import apiBase from '../apiBase'
import apiFactory from '../apiFactory'

const module = {
  moduleName: 'dic',
  apis: [
    {
      method: 'get',
      name: 'selectInfoByValues',
      url: '/selectInfoByValues'
    },
    {
      method: 'post',
      name: 'saveDictValue',
      url: '/saveDictValue'
    },
    {
      method: 'delete',
      name: 'deleteDictValue',
      url: '/deleteDictValue'
    },
    {
      method: 'post',
      name: 'updateSystemDictVlue',
      url: '/updateSystemDictVlue'
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
