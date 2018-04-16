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
        prop: 'account'
      },
      {
        label: '角色',
        prop: 'role'
      },
      {
        label: '职位类型',
        prop: 'positionClass'
      },
      {
        label: '职位',
        prop: 'position'
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
        prop: 'delete'
      },
      {
        xtype: 'links',
        label: '权限设置',
        prop: 'opetate',
        textProp: 'textProp',
        OnClick (val) {
          // console.log(val)
          that.$router.push(`/auth/editUserAuth/${val.userId || val.textProp}`)
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
  selectSearchOptions ({that}) {
    return {
      select: [
        {
          selectHandler (val) {
            console.log(val)
          },
          value: '2',
          className: 'my-select',
          option: [
            {
              label: '选择一',
              value: '1'
            },
            {
              label: '选择二',
              value: '2'
            }
          ]
        },
        {
          selectHandler (val) {
            console.log(val)
          },
          value: '2',
          option: [
            {
              label: '选择一',
              value: '1'
            },
            {
              label: '选择二',
              value: '2'
            }
          ]
        },
        {
          selectHandler (val) {
            console.log(val)
          },
          value: '2',
          option: [
            {
              label: '选择一',
              value: '1'
            },
            {
              label: '选择二',
              value: '2'
            }
          ]
        }
      ],
      search: {
        searchHandler (val) {
          if (!val) return that.$router.push(`/auth/search/${'all'}`)
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
