class TabelOptions {
  constructor (data) {
    this.data = data
  }
  getOptions () {
    let thead = [
      {
        label: '用户名',
        prop: 'userName'
      },
      {
        label: '账号',
        prop: 'account'
      },
      {
        label: '手机号',
        prop: 'mobile'
      },
      {
        label: '部门',
        prop: 'department'
      },
      {
        label: '职位',
        prop: 'position'
      },
      {
        label: '角色',
        prop: 'role'
      },
      {
        label: '权限',
        prop: 'auth'
      },
      {
        xtype: 'links',
        label: '操作',
        prop: 'opetate',
        textProp: 'textProp',
        OnClick (val) {
          console.log(val)
        },
        width: '200px',
        linkStyle: 'padding-left: 20px;'
      }
    ]
    let options = {
      thead,
      data: this.data,
      border: true
    }
    return options
  }
}
export default (data) => {
  return new TabelOptions(data)
}
