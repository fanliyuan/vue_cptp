/*
 * @Author: ChouEric
 * @Date: 2018-04-25 13:27:31
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-04-27 16:23:28
*/

import apiBase from '../apiBase'
import apiFactory from '../apiFactory'

const module = {
  moduleName: 'dic',
  apis: [
    {
      method: 'post',
      name: 'selectInfoByValues',
      url: '/selectInfoByValues'
    },
    {
      method: 'post',
      name: 'saveDictValue',
      url: '/saveDictValue'
    },
    {
      method: 'post',
      name: 'deleteDictValue',
      url: '/deleteDictValue'
    },
    {
      method: 'post',
      name: 'updateSystemDictValue',
      url: '/updateSystemDictValue'
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
