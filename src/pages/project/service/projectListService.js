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
  getSelectSearchOption ({ that, departmentList = [], managerList = [], selectFun1, selectFun2 }) {
    return {
      select: [
        {
          value: '-1',
          option: departmentList,
          selectHandler (val) {
            val = +val
            selectFun1 && selectFun1(val)
          }
        },
        {
          value: '-1',
          option: managerList,
          selectHandler (val) {
            val = +val
            selectFun2 && selectFun2(val)
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
        prop: 'deptName'
      },
      {
        label: '负责人',
        prop: 'projectLeader'
      },
      {
        xtype: 'links',
        label: '涉及产品',
        prop: 'products',
        textProp: 'productName',
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
          } else if(item.textProp === '删除'){
           // console.log(row.projectName[0].textProp)
           that.$confirm(`是否删除${row.projectName} ?`).then(data=>{
             if(!data) throw new Error('取消删除')
             console.log("bbbbb")
             delFun && delFun(row)
           }).catch(err => {
             if(err) that.$message('取消删除')
           })
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
        projectName: '项目3',
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
      data:this.data,
      stripe: true,
      border: true
    }
  }
}
export default (data) => {
  return new Option(data)
}
