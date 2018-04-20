class Option {
  constructor (data) {
    this.data = data
  }
  getBreadCrumbOption ({ projectId } = {}) {
    if (projectId) {
      return {
        bread: [
          {
            label: '项目管理',
            path: '/project'
          },
          {
            label: '修改项目'
          }
        ]
      }
    } else {
      return {
        bread: [
          {
            label: '项目管理',
            path: '/project'
          },
          {
            label: '添加项目'
          }
        ]
      }
    }
  }
}
export default (data) => {
  return new Option(data)
}
