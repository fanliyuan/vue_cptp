class Options {
  constructor (data) {
    this.data = data
  }
  getBreadCrumbOption ({id} = {}) {
    if (id) {
      let options = {
        bread: [
          {
            label: '字典类型',
            path: '/dict/key'
          },
          {
            label: '修改类型'
          }
        ]
      }
      return options
    } else {
      return {
        bread: [
          {
            label: '字典类型',
            path: '/dict/key'
          },
          {
            label: '添加类型'
          }
        ]
      }
    }
  }
}
export default (data) => {
  return new Options(data)
}
