class Option {
  constructor (data) {
    this.data = data
  }
  getTableOption ({editFun, delFun} = {}) {
    let thead = [
      {
        label: '类型职位',
        prop: 'parentDesc'
      },
      {
        label: '职位',
        prop: 'dictDesc'
      },
      {
        xtype: 'links',
        label: '操作',
        prop: 'operation',
        OnClick (val, row) {
          if (val.textProp === '修改') {
            editFun && editFun(row)
          } else {
            delFun && delFun(row)
          }
        },
        textProp: 'textProp',
        linkClassName: 'myoperation'
      }
    ]
    let data = this.data ? this.data : []
    return {
      thead,
      data,
      border: true,
      stripe: true
    }
  }
}
export default (data) => {
  return new Option(data)
}
