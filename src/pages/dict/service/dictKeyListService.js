class Option {
  constructor (data) {
    this.data = data
  }
  getBreadCrumbOption ({ type } = {type: null}) {
    let bread
    if (type === 'search') {
      bread = [
        {
          label: '字典配置'
        },
        {
          label: '字典类型搜索页'
        }
      ]
    } else {
      bread = [
        {
          lable: '字典类型'
        }
      ]
    }
    return {
      bread
    }
  }
  getRightButtonOption ({ that }) {
    return [
      {
        label: '添加',
        fun () {
          that.$router.push('/dict/editKey')
          sessionStorage.setItem('editId', '')
        }
      }
    ]
  }
  getTableOption ({that, delFun}) {
    let thead = [
      {
        label: '字典类型',
        prop: 'dictType'
      },
      {
        label: '字典描述',
        prop: 'dictDesc'
      },
      {
        xtype: 'links',
        label: '修改',
        prop: 'operation',
        textProp: 'textProp',
        OnClick (item, row) {
          if (item.textProp === '修改') {
            sessionStorage.setItem('dictInfo', JSON.stringify(row))
            that.$router.push(`/dict/editKey/${row.id}`)
            sessionStorage.setItem('editId', row.id)
          } else if (item.textProp === '删除') {
            that.$confirm(`是否删除`).then(data => {
              if (!data) throw new Error('取消删除')
              delFun && delFun(row)
            }).catch(err => {
              if (err) that.$message('取消删除')
            })
          }
        },
        linkStyle: 'display: inline-block;width:50%'
      }
    ]
    /* let data = [
      {
        dictType: 'a',
        dictDesc: '字典描述1',
        operation: [
          {
            textProp: '修改'
          },
          {
            textProp: '删除'
          }
        ]
      },
      {
        dictType: 'b',
        dictDesc: '字典描述2',
        operation: [
          {
            textProp: '修改'
          },
          {
            textProp: '删除'
          }
        ]
      },
      {
        dictType: 'c',
        dictDesc: '字典描述3',
        operation: [
          {
            textProp: '修改'
          },
          {
            textProp: '删除'
          }
        ]
      },
      {
        dictType: 'gg',
        dictDesc: '字典描述4',
        operation: [
          {
            textProp: '修改'
          },
          {
            textProp: '删除'
          }
        ]
      }
    ] */
    return {
      thead,
      data: this.data,
      stripe: true,
      border: true
    }
  }
}
export default (data) => {
  return new Option(data)
}
