class TabelOptions {
  constructor (data) {
    this.data = data
  }
  getOptions ({that, editUser = () => {}, enableUser = () => {}, disableUser = () => {}, uploadUser = () => {}}) {
    let thead = [
      {
        label: '用户名',
        prop: 'userName',
        width: 130
      },
      {
        label: '账号',
        prop: 'userEmail',
        width: 270
      },
      {
        label: '手机号',
        prop: 'userPhone',
        width: 150
      },
      {
        label: '部门',
        prop: 'deptName'
      },
      {
        label: '职位',
        prop: 'positionName'
      },
      {
        label: '角色',
        prop: 'roleName'
      },
      {
        label: '权限',
        prop: 'privilegeName'
      },
      {
        xtype: 'links',
        label: '操作',
        prop: 'operate',
        textProp: 'textProp',
        OnClick (val, row) {
          // 调用不同的接口
          // that.$router.push()
          if (val.textProp === '修改') {
            sessionStorage.setItem('userInfo', JSON.stringify(row))
            that.$router.push(`/user/editUser/${row.userId}`)
          } else if (val.textProp === '已停用') {
            // console.log(row, '启用')
            enableUser && enableUser(row)
          } else {
            // console.log(row, '停用')
            disableUser && disableUser(row)
          }
        },
        linkStyle: 'display:inline-block; width: 50%;'
      }
    ]
    let rightbuttonOptions = [
      {
        label: '批量导入',
        fun () {
          uploadUser && uploadUser()
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
