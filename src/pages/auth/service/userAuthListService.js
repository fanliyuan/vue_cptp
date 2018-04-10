class TabelOptions {
  constructor (data) {
    this.data = data
  }
  getOptions () {
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
          console.log(val)
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
}
export default (data) => {
  return new TabelOptions(data)
}
