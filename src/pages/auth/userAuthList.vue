<template>
  <div>
    <Table :options="TableOptions"></Table>
  </div>
</template>
<script>
import Table from '../../components/table/Table'
import userAuthListService from './service/userAuthListService'
export default {
  components: {
    Table
  },
  data () {
    // 展示数据
    let temp = [
      {
        userName: '用户名1',
        account: '账户',
        look: '√',
        edit: '×',
        opetate: [
          {
            textProp: '编辑'
          }
        ]
      }
    ]
    return {
      TableOptions: userAuthListService(temp).getOptions()
    }
  }
}
</script>
