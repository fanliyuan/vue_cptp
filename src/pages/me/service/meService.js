class Option {
  constructor (data) {
    this.data = data
  }
  getBreadCrumbOption ({ type } = {}) {
    let bread
    if (type === 'password') {
      bread = [
        {
          label: '个人中心',
          path: '/me'
        },
        {
          label: '密码修改'
        }
      ]
    } else if (type === 'mobile') {
      bread = [
        {
          label: '个人中心',
          path: '/me'
        },
        {
          label: '手机号修改'
        }
      ]
    } else {
      bread = [
        {
          label: '个人中心'
        }
      ]
    }
    return {
      bread
    }
  }
}
export default (data) => {
  return new Option(data)
}
