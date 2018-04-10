<template>
  <div>
    <Table :options="TableOptions"></Table>
  </div>
</template>
<script>
import Table from '../../components/table/Table'
import userListService from './service/userListService'
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
        opetate: [
          {
            textProp: '修改'
          },
          {
            textProp: '停用'
          }
        ]
      }
    ]
    return {
      TableOptions: userListService(temp).getOptions()
    }
  }
}
</script>
