class Option {
  constructor (data) {
    this.data = data
  }
  getTableOption () {
    let thead = [
      {
        label: '项目角色',
        prop: 'roleName'
      },
      {
        label: '用户名称',
        prop: 'userName'
      },
      {
        label: '手机号',
        prop: 'mobile'
      }
    ]
    let data = [
      {
        roleName: '前端工程师',
        userName: '尼古拉斯花',
        mobile: '13912341234'
      },
      {
        roleName: '产品经理',
        userName: '奥巴牛',
        mobile: '11111111111'
      }
    ]
    return {
      thead,
      data,
      stripe: true,
      border: true
    }
  }
}
export default (data) => {
  return new Option(data)
}
