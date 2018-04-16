class Option {
  constructor (data) {
    this.data = data
  }
  getTableOption ({editFun, delFun} = {}) {
    let thead = [
      {
        label: '现有职位',
        prop: 'nowPosition'
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
        nowPosition: '领导',
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
