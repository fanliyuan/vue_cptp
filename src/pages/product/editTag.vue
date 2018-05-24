<template>
  <div>
    <Table :options="tableOption" />
    <!-- <el-pagination v-if="pageInfo.total > 10" :total="pageInfo.total" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" background layout="prev, pager, next, jumper" class="mypagenation" @current-change="pageHandler"></el-pagination> -->
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
    async addHandler () {
      // 调用新增接口
      let last = this.tagList[this.tagList.length - 1] ? this.tagList[this.tagList.length - 1] : { dictIndex: -1, dictParent: 0, dictType: 'CHANPINBIAOQIAN' }
      let { data } = await dicAPIs.saveDictValue({
        dictDesc: this.addTagInfo,
        parentId: last.dictParent,
        dictType: last.dictType
      })
      try {
        if (data && data.code === 200) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.visibility = false
          this.loadAll()
        }
      } catch (error) {
        console.log()
      }
    },
    editHandler () {
      // 调用编辑接口
      this.editTagInfo.dictDesc = this.editTagInfo.newValue
      delete this.editTagInfo.newValue
      delete this.editTagInfo.oldValue
      dicAPIs.updateSystemDictValue(this.editTagInfo).then(data => {
        console.log(data)
        if (data && data.data && data.data.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.editVisibility = false
          this.loadAll()
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
      let { data } = await dicAPIs.selectInfoByValues({type: 'CHANPINBIAOQIAN'})
      try {
        this.tagList = data.data
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
            if (data && data.data && data.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.loadAll()
            }
          }).catch(err => {
            if (err) this.$message('删除取消')
          })
        }
        this.tableOption = editTagService().getTableOption({that: this, data: data.data, editFun, delFun})
      } catch (error) {
        console.log()
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
      margin-left: 10%;
    }
    .input{
      display: inline-block;
      margin-left: 20px;
      width: 60%;
    }
    .dialogbox{
      // width: 500px;
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
