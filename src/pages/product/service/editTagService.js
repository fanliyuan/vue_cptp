class Option {
  constructor (data) {
    this.data = data
  }
  getBreadCrumbOption () {
    return {
      bread: [
        {
          label: '产品管理',
          path: '/product'
        },
        {
          label: '标签管理'
        }
      ]
    }
  }
  getRightButtonOption ({that}) {
    return [
      {
        label: '添加标签',
        fun () {
          that.visibility = true
        }
      }
    ]
  }
  getTableOption ({that, editFun, delFun, data}) {
    let thead = [
      {
        label: '现有标签',
        prop: 'dictDesc'
      },
      {
        xtype: 'links',
        label: '操作',
        prop: 'operation',
        textProp: 'textProp',
        OnClick (item, row) {
          if (item.textProp === '修改') {
            editFun && editFun(row)
          } else {
            delFun && delFun(row)
          }
        },
        linkStyle: 'display: inline-block;width:50%;text-align:center'
      }
    ]
    if (!(data instanceof Array)) {
      data = [
        {
          dictDesc: '标签1',
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
    }
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
