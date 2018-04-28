class Option {
  constructor (data) {
    this.data = data
  }
  getTabelOptions ({that, forbidFun, cancelForbid}) {
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
        prop: 'pm'
      },
      {
        label: '产品状态',
        prop: 'stateName'
      },
      {
        xtype: 'links',
        label: '操作',
        prop: 'operation',
        textProp: 'textProp',
        OnClick (val, row) {
          if (val.textProp === '修改') {
            sessionStorage.setItem('productInfo', JSON.stringify(row))
            that.$router.push(`/product/editProduct/${row.productId}`)
          } else if (val.textProp === '冻结') {
            that.$confirm(`是否冻结${row.productName[0].textProp} ?`)
              .then(data => {
                if (!data) throw new Error('取消冻结')
                // 调用用冻结接口
                forbidFun && forbidFun(row)
              }).catch(err => {
                if (err) {
                  that.$message('取消冻结')
                }
              })
          } else if (val.textProp === '已冻结') {
            cancelForbid && cancelForbid(row)
          } else {
            console.log(row, '停用')
          }
        },
        linkStyle: 'display: inline-block;width: 49%;'
      }
    ]
    let data = this.data
    return {
      data,
      thead,
      stripe: true,
      border: true
    }
  }
}
export default (data) => {
  return new Option(data)
}
