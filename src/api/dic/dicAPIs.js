/*
 * @Author: ChouEric
 * @Date: 2018-04-25 13:27:31
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-05-11 15:47:02
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
    },
    {
      method: 'post',
      name: 'deleteDictValue',
      url: '/deleteDictValue'
    },
    {
      method: 'post',
      name: 'queryDictValueInfo',
      url: '/queryDictValueInfo'
    },
    {
      method: 'post',
      name: 'selectSystemDictValueInfo',
      url: '/selectSystemDictValueInfo'
    },
    {
      method: 'post',
      name: 'saveDictPostionInfo',
      url: '/saveDictPostionInfo'
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
