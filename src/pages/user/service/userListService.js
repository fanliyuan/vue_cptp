class TabelOptions {
  constructor (data) {
    this.data = data
  }
  getOptions ({that, editUser, enableUser, disableUser}) {
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
        label: '手机号',
        prop: 'mobile'
      },
      {
        label: '部门',
        prop: 'department'
      },
      {
        label: '职位',
        prop: 'position'
      },
      {
        label: '角色',
        prop: 'role'
      },
      {
        label: '权限',
        prop: 'auth'
      },
      {
        xtype: 'links',
        label: '操作',
        prop: 'opetate',
        textProp: 'textProp',
        OnClick (val, row) {
          // 调用不同的接口
          // that.$router.push()
          if (val.textProp === '修改') {
            sessionStorage.setItem('userInfo', JSON.stringify(row))
            that.$router.push(`/user/editUser/${row.userId}`)
          } else if (val.textProp === '启用') {
            // console.log(row, '启用')
          } else {
            console.log(row, '停用')
          }
        },
        width: '200px',
        linkStyle: 'padding-left: 20px;'
      }
    ]
    let rightbuttonOptions = [
      {
        label: '批量导入',
        fun () {
          console.log('批量导入')
        }
      },
      {
        label: '添加用户',
        fun () {
          that.$router.push('/user/editUser')
          // console.log(that)
        }
      }
    ]
    let options = {
      tableOptions: {
        thead,
        data: this.data,
        border: true
      },
      rightbuttonOptions
    }
    return options
  }
}
export default (data) => {
  return new TabelOptions(data)
}
