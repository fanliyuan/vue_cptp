class Option {
  constructor (data) {
    this.data = data
  }
  getTableOption ({editFun, delFun} = {}) {
    let thead = [
      {
        label: '类型职位',
        prop: 'positionClass'
      },
      {
        label: '职位',
        prop: 'position'
      },
      {
        xtype: 'links',
        label: '操作',
        prop: 'operation',
        OnClick (val, row) {
          if (val.textProp === '修改') {
            console.log(row)
            editFun && editFun(row)
          } else {
            delFun && delFun(row)
          }
        },
        textProp: 'textProp',
        linkClassName: 'myoperation'
      }
    ]
    let data = [
      {
        positionClass: '领导类型',
        position: '领导职位',
        operation: [
          {
            textProp: '修改'
          },
          {
            textProp: '删除'
          }
        ]
      }
    ]
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
