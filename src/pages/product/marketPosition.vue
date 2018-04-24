<template>
  <div>
    <Table :options="tableOption" />
    <el-pagination v-if="pageInfo.total > 10" :total="pageInfo.total" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" background layout="prev, pager, next, jumper" class="mypagenation" @current-change="pageHandler"></el-pagination>
    <el-dialog :visible.sync="visibility" class="mydialog" :width="'30%'">
      <div class="dialogbox">
        <span class="label">市场定位名</span>
        <el-input v-model="addMarketPositionInfo" class="input"></el-input>
      </div>
      <el-button type="primary" class="button" @click="addHandler">确定</el-button>
    </el-dialog>
    <el-dialog :visible.sync="editVisibility" class="mydialog" :width="'30%'">
      <div class="dialogbox">
        <span class="label">原市场定位</span>
        <el-input v-model="editMarketPositionInfo.oldValue" class="input" readonly=""></el-input>
      </div>
      <div class="dialogbox">
        <span class="label">新市场定位</span>
        <el-input v-model="editMarketPositionInfo.newValue" class="input"></el-input>
      </div>
      <el-button type="primary" class="button" @click="editHandler">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>
import Table from '../../components/table/Table'
import marketPositionService from './service/marketPositionService'
export default {
  components: {
    Table
  },
  data () {
    let editFun = (row) => {
      this.editVisibility = true
      this.editMarketPositionInfo = {
        oldValue: row.oldValue
      }
    }
    let delFun = (row) => {
      this.$confirm(`是否删除 ${row.oldValue} 定位`).then(data => {
      // 这里确认然后调用删除接口
        if (data) console.log(row, '删除')
      }).catch(err => {
        if (err) this.$message('删除取消')
      })
    }
    return {
      breadCrumbOption: marketPositionService().getBreadCrumbOption(),
      rightButtonOption: marketPositionService().getRightButtonOption({that: this}),
      tableOption: marketPositionService().getTableOption({that: this, editFun, delFun}),
      visibility: false,
      editVisibility: false,
      addMarketPositionInfo: '',
      editMarketPositionInfo: {},
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 11
      }
    }
  },
  methods: {
    addHandler () {
      // 调用新增接口
      console.log('提交')
    },
    editHandler () {
      // 调用编辑接口
      console.log('编辑')
    },
    pageHandler (val) {
      this.pageInfo.pageNum = val
      console.log(this.pageInfo)
      // 接口
    },
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadCrumbOption,
        rightButtonOption: this.rightButtonOption
      })
    }
  },
  mounted () {
    this.resetOption()
  }
}
</script>
<style lang="less" scoped>
  .mydialog{
    .label{
      margin-left: 80px;
    }
    .input{
      display: inline-block;
      margin-left: 20px;
      width: 250px;
    }
    .dialogbox{
      width: 500px;
      margin: 0 auto 30px;
      display: block;
    }
    .button{
      display: block;
      margin: 0 auto 20px;
      padding: 10px 100px;
    }
  }
</style>
