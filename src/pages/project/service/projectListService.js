class Option {
  constructor (data) {
    this.data = data
  }
  getBreadCrumbOption ({ type } = {type: null}) {
    let bread
    if (type === 'search') {
      bread = [
        {
          label: '项目管理',
          path: '/project'
        },
        {
          label: '项目搜索页'
        }
      ]
    } else {
      bread = [
        {
          label: '项目列表'
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
        label: '添加项目',
        fun () {
          that.$router.push('/project/editProject')
        }
      }
    ]
  }
  getSelectSearchOption ({ that, selectList, selectFun }) {
    return {
      select: [
        {
          value: '0',
          option: selectList[0] ? selectList[0] : [],
          selectHandler (val) {
            val = +val
            selectFun && selectFun(val, 0)
          }
        },
        {
          value: '0',
          option: selectList[1] ? selectList[1] : [],
          selectHandler (val) {
            val = +val
            selectFun && selectFun(0, val)
          }
        }
      ],
      search: {
        value: '',
        searchHandler (val) {
          if (!val) val = 'all'
          that.$router.push(`/project/search/${val}`)
        }
      }
    }
  }
  getTableOption ({that, editFun, delFun}) {
    let thead = [
      {
        label: '项目名称',
        prop: 'projectName'
      },
      {
        label: '立项部门',
        prop: 'department'
      },
      {
        label: '负责人',
        prop: 'manager'
      },
      {
        xtype: 'links',
        label: '涉及产品',
        prop: 'product',
        textProp: 'textProp',
        OnClick (item, row) {
          that.$router.push(`/product/detail/${item.productId}`)
        },
        linkStyle: 'display: block'
      },
      {
        xtype: 'links',
        label: '操作',
        prop: 'operation',
        textProp: 'textProp',
        OnClick (item, row) {
          if (item.textProp === '修改') {
            sessionStorage.setItem('projectInfo', JSON.stringify(row))
            that.$router.push(`/project/editProject/${row.projectId}`)
          } else {
            delFun && delFun(row)
          }
        },
        linkStyle: 'display: inline-block;width: 50%'
      }
    ]
    let data = [
      {
        projectName: '项目1',
        projectId: 1,
        department: '部门1',
        manager: '负责人1',
        product: [
          {
            textProp: '产品1',
            productId: 1
          },
          {
            textProp: '产品2',
            productId: 2
          }
        ],
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
        projectName: '项目1',
        projectId: 1,
        department: '部门1',
        manager: '负责人1',
        product: [
          {
            textProp: '产品1',
            productId: 1
          },
          {
            textProp: '产品2',
            productId: 2
          }
        ],
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
        projectName: '项目1',
        projectId: 1,
        department: '部门1',
        manager: '负责人1',
        product: [
          {
            textProp: '产品1',
            productId: 1
          },
          {
            textProp: '产品2',
            productId: 2
          }
        ],
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
        projectName: '项目1',
        projectId: 1,
        department: '部门1',
        manager: '负责人1',
        product: [
          {
            textProp: '产品1',
            productId: 1
          },
          {
            textProp: '产品2',
            productId: 2
          }
        ],
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
        projectName: '项目1',
        projectId: 1,
        department: '部门1',
        manager: '负责人1',
        product: [
          {
            textProp: '产品1',
            productId: 1
          },
          {
            textProp: '产品2',
            productId: 2
          }
        ],
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
        projectName: '项目1',
        projectId: 1,
        department: '部门1',
        manager: '负责人1',
        product: [
          {
            textProp: '产品1',
            productId: 1
          },
          {
            textProp: '产品2',
            productId: 2
          }
        ],
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
        projectName: '项目1',
        projectId: 1,
        department: '部门1',
        manager: '负责人1',
        product: [
          {
            textProp: '产品1',
            productId: 1
          },
          {
            textProp: '产品2',
            productId: 2
          }
        ],
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
        projectName: '项目1',
        projectId: 1,
        department: '部门1',
        manager: '负责人1',
        product: [
          {
            textProp: '产品1',
            productId: 1
          },
          {
            textProp: '产品2',
            productId: 2
          },
          {
            textProp: '产品2',
            productId: 2
          }
        ],
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
        projectName: '项目1',
        projectId: 1,
        department: '部门1',
        manager: '负责人1',
        product: [
          {
            textProp: '产品1',
            productId: 1
          },
          {
            textProp: '产品2',
            productId: 2
          },
          {
            textProp: '产品2',
            productId: 2
          }
        ],
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
      stripe: true,
      border: true
    }
  }
}
export default (data) => {
  return new Option(data)
}
