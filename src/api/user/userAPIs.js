/*
 * @Author: ChouEric
 * @Date: 2018-04-25 11:26:30
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-05-21 10:54:27
*/

import apiBase from '../apiBase'
import apiFactory from '../apiFactory'

const module = {
  moduleName: 'user',
  apis: [
    {
      method: 'post',
      name: 'login',
      url: '/login'
    },
    {
      method: 'post',
      name: 'logout',
      url: '/logout'
    },
    // 检查token权限
    {
      method: 'get',
      name: 'checkToken',
      url: '/checkToken'
    },
    {
      method: 'post',
      name: 'addUser',
      url: '/addUser'
    },
    // 批量上传用户接口
    {
      method: 'post',
      name: 'batchAddUser',
      url: '/batchAddUser'
    },
    {
      method: 'post',
      name: 'filterUserList',
      url: '/filterUserList'
    },
    {
      method: 'get',
      name: 'getUserInfoByRoleId',
      url: '/getUserInfoByRoleId'
    },
    {
      method: 'post',
      name: 'searchUserList',
      url: '/searchUserList'
    },
    {
      method: 'post',
      name: 'updatePhone',
      url: '/updatePhone'
    },
    {
      method: 'post',
      name: 'updatePwd',
      url: '/updatePwd'
    },
    {
      method: 'post',
      name: 'updateUser',
      url: '/updateUser'
    },
    {
      method: 'post',
      name: 'getUserByPositionName',
      url: '/getUserByPositionName'
    },
    {
      method: 'get',
      name: 'getCodeImage',
      url: '/getCodeImage'
    },
    {
      method: 'post',
      name: 'getUserInfoById',
      url: '/getUserInfoById'
    },
    {
      method: 'post',
      name: 'addUser',
      url: '/addUser'
    },
    {
      method: 'post',
      name: 'updataUserIsDisable',
      url: '/updataUserIsDisable'
    },
    {
      method: 'post',
      name: 'getValidateCode',
      url: '/getValidateCode'
    },
    {
      method: 'post',
      name: 'forgetPwd',
      url: '/forgetPwd'
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
