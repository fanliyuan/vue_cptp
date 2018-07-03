/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2017/12/02
 *
 * 描述 ：业务配置文件 - 开发环境
 *
 * 修改 : ChouEric
 *
 * 修改内容: 加入webpack全局变量的后台接口,分为开发接口和生产接口,当前页面会自动适应
 *          同时当前页面也可以更改scopeURL来修改接口
 */

let scopeURL = 'http://192.168.0.151:8769/api/back'// 这里替换默认设置的后台接口地址   http://192.168.0.151:8769/api/back   http://192.168.100.63:8769/api/back
//let scopeURL = 'http://192.168.100.9:8769/api/back'
let downloadURl = 'http://192.168.0.151:8763'

export default {
  env: 'development',
  apiParams: {
    // api接口通用参数获取策略
    configs: [
      // {
      // type: "header", // 参数类型：header、parameter、
      // keys: [{
      //   name: "token", // 参数key
      //   source: "localStorage" // 值的来源
      // }, {
      //   name: "accountId",
      //   source: "cookie"
      // }]
      // },
      // {
      //   type: 'parameter',
      //   keys: [{
      //     name: 'token', // 参数key
      //     source: 'localStorage' // 值的来源
      //   }]
      // }
    ]
  },
  apis: {
    // api接口url配置
    modules: {
      // 目录审核
      checkDir: {
        host: '',
        url: '/checkDir'
      },
      // 目录管理
      dir: {
        host: '', // http://192.168.112.47:8081
        url: '/dir'
      },
      // 系统管理
      sys: {
        host: '',
        url: '/sys'
      },
      // 授权模块
      auth: {
        host: '',
        url: '/user'
      },
      // 模板管理
      template: {
        host: '',
        url: '/template'
      },
      // 部门管理
      department: {
        host: '',
        url: '/department'
      },
      // 角色管理
      role: {
        host: '',
        url: '/role'
      },
      // 用户管理
      user: {
        host: '',
        url: '/user'
      },
      // 登录模块
      login: {
        host: '',
        url: '/user'
      },
      // 字典模块
      dic: {
        host: '',
        url: '/user'
      },
      product: {
        host: '',
        url: '/product'
      },
      project: {
        host: '',
        url: '/project'
      },
      // 测试用
      test: {
        host: '',
        url: '/portalInterface'
      }
    },
    defaultHost: scopeURL || process.env.API_URL, // 'http://192.168.0.151:8769/api/back',//'http://192.168.108.5:8769/api/back',//'http://210.13.50.98:10133', //http://www.youedata.com/portalInterface/goods/category
    defaultUrl: ''
  },
  siteInfo: {
    // 多站点配置
    sites: {
      login_site_host: 'http://login.mainsite.com/', // 登录站地址
      main_site_host: 'http://www.mainsite.com/', // 本站地址
      file_server_url: downloadURl || scopeURL || process.env.API_URL // 文件服务器地址
    }
  }
}
