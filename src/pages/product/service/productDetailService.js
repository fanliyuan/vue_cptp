class Option {
  constructor (data) {
    this.data = data
  }
  getTableOption (data = []) {
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
