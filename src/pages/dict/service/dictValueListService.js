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
          that.$router.push('/dict/editValue')
          sessionStorage.setItem('editValueId', '')
        }
      }
    ]
  }
  getTableOption ({that, delFun}) {
    let thead = [
      {
        label: '字典类型',
        prop: 'tDesc'
      },
      {
        label: '字典值索引',
        prop: 'tIndex'
      },
      {
        label: '字典值下标',
        prop: 'tId'
      },
      {
        label: '字典值描述',
        prop: 'tDesc'
      },
      {
        label: '是否父类',
        prop: 'tParentId'
      },
      {
        label: '字典值',
        prop: 'vValue'
      },
      {
        xtype: 'links',
        label: '修改',
        prop: 'operation',
        textProp: 'textProp',
        OnClick (item, row) {
          if (item.textProp === '修改') {
            sessionStorage.setItem('dictValueInfo', JSON.stringify(row))
            that.$router.push(`/dict/editValue/${row.id}`)
            sessionStorage.setItem('editValueId', row.id)
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
        dictValueKey: 2,
        dictSubValue: 3,
        dictValueDesc: '字典值描述1',
        isParentClass: '是',
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
        dictValueKey: 3,
        dictSubValue: 4,
        dictValueDesc: '字典值描述2',
        isParentClass: '否',
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
        dictValueKey: 6,
        dictSubValue: 9,
        dictValueDesc: '字典值描述3',
        isParentClass: '是',
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
        dictValueKey: 9,
        dictSubValue: 13,
        dictValueDesc: '字典值描述4',
        isParentClass: '否',
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
