class Options {
  constructor (data) {
    this.data = data
  }
  getBreadCrumbOption ({id} = {}) {
    if (id) {
      let options = {
        bread: [
          {
            label: '字典类型值',
            path: '/dict/value'
          },
          {
            label: '修改类型值'
          }
        ]
      }
      return options
    } else {
      return {
        bread: [
          {
            label: '字典类型值',
            path: '/dict/value'
          },
          {
            label: '添加类型值'
          }
        ]
      }
    }
  }
}
export default (data) => {
  return new Options(data)
}
