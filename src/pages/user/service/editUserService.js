class Options {
  constructor (data) {
    this.data = data
  }
  getOptions () {
    let options = {
      breadCrumbOptions: {
        bread: [
          {
            label: '用户管理',
            path: '/user'
          },
          {
            label: '添加用户'
          }
        ]
      }
    }
    return options
  }
}
export default (data) => {
  return new Options(data)
}
