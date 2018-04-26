<template>
  <div>
    <Table :options="tableOption" />
    <el-pagination v-if="pageInfo.total > 10" :total="pageInfo.total" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" background layout="prev, pager, next, jumper" class="mypagenation" @current-change="pageHandler"></el-pagination>
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
import Table from '../../components/table/Table'
import editTagService from './service/editTagService'
import dicAPIs from '../../api/dic/dicAPIs'
export default {
  components: {
    Table
  },
  data () {
    let editFun = (row) => {
      this.editVisibility = true
      this.editTagInfo = {
        oldValue: row.dictDesc
      }
    }
    let delFun = (row) => {
      this.$confirm(`是否删除 ${row.dictDesc} 标签`).then(data => {
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
      editTagInfo: {},
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
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
      this.editTagInfo.dictDesc = this.editTagInfo.newValue
      delete this.editTagInfo.newValue
      delete this.editTagInfo.oldValue
      dicAPIs.updateSystemDictVlue(this.editTagInfo).then(data => {
        console.log(data)
        if (data && data.code) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }
      })
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
    },
    async loadAll () {
      let { data } = await dicAPIs.selectInfoByValues({URI: 'CHANPINBIAOQIAN'})
      try {
        data.data.forEach(item => {
          item.operation = [
            {
              textProp: '修改'
            },
            {
              textProp: '删除'
            }
          ]
        })
        let editFun = (row) => {
          this.editVisibility = true
          this.editTagInfo = {
            oldValue: row.dictDesc,
            newValue: '',
            dictIndex: row.dictIndex,
            id: row.id,
            dictValue: row.dictValue,
            dictType: row.dictType,
            dictParent: row.dictParent
          }
        }
        let delFun = (row) => {
          this.$confirm(`是否删除 ${row.dictDesc} 标签`).then(data => {
          // 这里确认然后调用删除接口
            if (data) {
              return dicAPIs.deleteDictValue({id: row.id})
            }
          }).then(data => {
            if (data && data.code) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            }
          }).catch(err => {
            if (err) this.$message('删除取消')
          })
        }
        this.tableOption = editTagService().getTableOption({that: this, data: data.data, editFun, delFun})
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.resetOption()
    this.loadAll()
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
