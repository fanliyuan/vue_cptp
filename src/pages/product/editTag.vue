<template>
  <div>
    <BreadCrumb :options="breadCrumbOption" class="mybreadcrumb"/>
    <RightButton :options="rightButtonOption" class="myrightbutton"/>
    <Table :options="tableOption" />
    <el-dialog :visible.sync="visibility" class="mydialog" :width="'30%'">
      <div class="dialogbox">
        <span class="label">标签名</span>
        <el-input v-model="addTagInfo" class="input"></el-input>
      </div>
      <el-button type="primary" class="button" @click="addHandler">确定</el-button>
    </el-dialog>
    <el-dialog :visible.sync="editVisibility" class="mydialog" :width="'30%'">
      <div class="dialogbox">
        <span class="label">原标签名</span>
        <el-input v-model="editTagInfo.oldValue" class="input" readonly=""></el-input>
      </div>
      <div class="dialogbox">
        <span class="label">新标签名</span>
        <el-input v-model="editTagInfo.newValue" class="input"></el-input>
      </div>
      <el-button type="primary" class="button" @click="editHandler">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>
import BreadCrumb from '../../components/breadcrumb/BreadCrumb'
import RightButton from '../../components/rightbutton/RightButton'
import Table from '../../components/table/Table'
import editTagService from './service/editTagService'
export default {
  components: {
    BreadCrumb,
    RightButton,
    Table
  },
  data () {
    let editFun = (row) => {
      this.editVisibility = true
      this.editTagInfo = {
        oldValue: row.oldValue
      }
    }
    let delFun = (row) => {
      this.$confirm(`是否删除 ${row.oldValue} 标签`).then(data => {
      // 这里确认然后调用删除接口
        if (data) console.log(row, '删除')
      }).catch(err => {
        if (err) this.$message('删除取消')
      })
    }
    return {
      breadCrumbOption: editTagService().getBreadCrumbOption(),
      rightButtonOption: editTagService().getRightButtonOption({that: this}),
      tableOption: editTagService().getTableOption({that: this, editFun, delFun}),
      visibility: false,
      editVisibility: false,
      addTagInfo: '',
      editTagInfo: {}
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
    }
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
