class Options {
  constructor (data) {
    this.data = data
  }
}
export default (data) => {
  return new Options(data)
}
