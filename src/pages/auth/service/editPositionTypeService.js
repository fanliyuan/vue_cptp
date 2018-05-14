class Option {
  constructor (data) {
    this.data = data
  }
  getTableOption ({editFun, delFun} = {}) {
    let thead = [
      {
        label: '现有职位类型',
        prop: 'nowPosition'
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
    let data = this.data ? this.data : [
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
