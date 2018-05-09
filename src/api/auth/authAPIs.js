/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2017/11/24
 *
 * 描述 ：接口类 - 授权
 */
import apiBase from '../apiBase'
import apiFactory from '../apiFactory'

const module = {
  moduleName: 'auth',
  apis: [{
    method: 'post', // 请求方式
    name: 'deleteRole', // 接口名称
    url: '/deleteRole' // 接口全路径
  }, {
    method: 'get', // 请求方式
    name: 'getRoleInfoById', // 接口名称
    url: '/getRoleInfoById' // 接口全路径
  }, {
    method: 'get', // 请求方式
    name: 'getRoleInfoByUserId', // 接口名称
    url: '/getRoleInfoByUserId' // 接口全路径
  }, {
    method: 'post', // 请求方式
    name: 'saveRole', // 接口名称
    url: '/saveRole' // 接口全路径
  }, {
    method: 'post',
    name: 'selectRoleInfoAll',
    url: '/selectRoleInfoAll'
  }, {
    method: 'post',
    name: 'selectUserInfoByRoleName',
    url: '/selectUserInfoByRoleName'
  }, {
    method: 'post',
    name: 'updateRole',
    url: '/updateRole'
  }, {
    method: 'get',
    name: 'getUserRoleList',
    url: '/getUserRoleList'
  }, {
    method: 'post',
    name: 'saveRole',
    url: '/saveRole'
  }, {
    method: 'post',
    name: 'deleteRole',
    url: '/deleteRole'
  }, {
    method: 'post',
    name: 'getRoleByRoleId',
    url: '/getRoleByRoleId'
  }, {
    method: 'post',
    name: 'updateRoleInfo',
    url: '/updateRoleInfo'
  }]
}

class ApiSub extends apiBase {
  constructor (module) {
    super()
    this.moduleName = module.moduleName
    this.apis = module.apis
  }
}

export default apiFactory(new ApiSub(module))
