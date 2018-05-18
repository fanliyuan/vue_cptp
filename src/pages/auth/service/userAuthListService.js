class TabelOptions {
  constructor (data) {
    this.data = data
  }
  getOptions ({that}) {
    let thead = [
      {
        label: '用户名',
        prop: 'userName'
      },
      {
        label: '账号',
        prop: 'userAccount',
        width: 270
      },
      {
        label: '角色',
        prop: 'roleName'
      },
      {
        label: '职位类型',
        prop: 'postionTypeName'
      },
      {
        label: '职位',
        prop: 'postionName'
      },
      {
        label: '查看',
        prop: 'look'
      },
      {
        label: '下载',
        prop: 'download'
      },
      {
        label: '上传',
        prop: 'upload'
      },
      {
        label: '编辑',
        prop: 'edit'
      },
      {
        label: '删除',
        prop: 'del'
      },
      {
        xtype: 'links',
        label: '权限设置',
        prop: 'opetate',
        textProp: 'textProp',
        OnClick (item, row) {
          sessionStorage.setItem('authInfo', JSON.stringify(row))
          that.$router.push(`/auth/editUserAuth/${row.id}`)
        },
        width: '200px',
        linkStyle: 'padding-left: 20px;'
      }
    ]
    let options = {
      thead,
      data: this.data,
      border: true
    }
    return options
  }
  selectSearchOptions ({that, roleList, positionTypeList, positionList, selectFun1, selectFun2, selectFun3}) {
    return {
      select: [
        {
          selectHandler (val) {
            selectFun1 && selectFun1(val)
          },
          value: null,
          className: 'my-select',
          option: roleList
        },
        {
          selectHandler (val) {
            selectFun2 && selectFun2(val)
          },
          value: null,
          option: positionTypeList
        },
        {
          selectHandler (val) {
            selectFun3 && selectFun3(val)
          },
          value: null,
          option: positionList
        }
      ],
      search: {
        searchHandler (val) {
          if (!val) return that.$router.push(`/auth`)
          that.$router.push(`/auth/search/${val}`)
        }
      }
    }
  }
  rightOptions ({that}) {
    return [
      {
        label: '角色设置',
        fun (row) {
          // console.log('角色设置', row)
          that.$router.push('/auth/editRole')
        }
      },
      {
        label: '职位类型设置',
        fun (row) {
          // console.log('职位类型设置', row)
          that.$router.push('/auth/editPositionClass')
        }
      },
      {
        label: '职位设置',
        fun (row) {
          // console.log('职位设置', row)
          that.$router.push('/auth/editPosition')
        }
      }
    ]
  }
  breadcrumbOptions () {
    return {
      bread: [
        {
          label: '权限列表'
        }
      ]
    }
  }
}
export default (data) => {
  return new TabelOptions(data)
}
