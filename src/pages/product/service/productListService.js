class Option {
  constructor (data) {
    this.data = data
  }
  getTabelOptions ({that}) {
    let thead = [
      {
        xtype: 'links',
        label: '产品名称',
        prop: 'productName',
        textProp: 'textProp',
        OnClick (item, row) {
          if (item) that.$router.push(`/product/detail/${row.productId}`)
        }
      },
      {
        label: '产品经理',
        prop: 'productManager'
      },
      {
        label: '产品状态',
        prop: 'productState'
      },
      {
        xtype: 'links',
        label: '操作',
        prop: 'operation',
        textProp: 'textProp',
        OnClick (val, row) {
          if (val.textProp === '修改') {
            that.$router.push(`/product/editProduct/${row.productId}`)
          } else if (val.textProp === '冻结') {
            // 调用冻结接口,从上面传入
            console.log(row, '冻结')
          } else {
            console.log(row, '停用')
          }
        },
        linkStyle: 'padding: 14px 40px;'
      }
    ]
    let data = this.data
    return {
      data,
      thead,
      strip: true,
      border: true
    }
  }
}
export default (data) => {
  return new Option(data)
}
