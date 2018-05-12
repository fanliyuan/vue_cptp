<template>
  <div>
    <el-dialog :visible.sync="addPosition" class="mydialog" :width="'30%'">
      <div class="dialogbox">
        <span class="label">职位名</span>
        <el-input v-model="editPositionInfo.dictDesc" class="input"></el-input>
      </div>
      <el-button type="primary" class="button" @click="addHandler">确定</el-button>
    </el-dialog>
    <Tabel :options="tableOptions" />
    <el-pagination v-if="pageInfo.total > 10" :total="pageInfo.total" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" background layout="prev, pager, next, jumper" class="mypagenation" @current-change="pageHandler"></el-pagination>
    <el-dialog :visible.sync="editPosition" class="mydialog" :width="'30%'">
      <div class="dialogbox">
        <span class="label">原职位名</span>
        <el-input v-model="editPositionInfo.nowPosition" class="input" readonly=""></el-input>
      </div>
      <div class="dialogbox">
        <span class="label">新职位名</span>
        <el-input v-model="editPositionInfo.dictDesc" class="input"></el-input>
      </div>
      <el-button type="primary" class="button" @click="editHandler">确定</el-button>
    </el-dialog>
    <!-- <el-table :data="tableOptions.data">
      <el-table-column prop="nowPosition" label="现有职位">
      </el-table-column>
      <el-table-column label="操作">
        <el-table-column prop="edit" label="更新">
        </el-table-column>
        <el-table-column prop="delete" label="删除">
        </el-table-column>
      </el-table-column>
    </el-table> -->
  </div>
</template>
<script>
import Tabel from '../../components/table/Table'
import editPositionService from './service/editPositionService'
import dicAPIs from '../../api/dic/dicAPIs'
// import authAPIs from '../../api/auth/authAPIs'
export default {
  components: {
    Tabel
  },
  data () {
    let vm = this
    let editFun = (row) => {
      this.editPositionInfo.dictDesc = ''
      this.editPosition = true
    }
    let delFun = (row) => {
      this.$confirm(`是否删除 ${row.nowPosition} 职位`).then(data => {
        if (data) {
          this.deleteDictValue(row)
        } else {
          this.$message('取消删除')
        }
      }).catch(err => {
        if (err) {
          this.$message('取消删除')
        }
      })
    }
    return {
      breadCrumbOptions: {
        bread: [
          {
            label: '权限管理',
            path: '/auth'
          },
          {
            label: '职位设置'
          }
        ]
      },
      tableOptions: editPositionService().getTableOption({editFun, delFun}),
      rightButtonOptions: [
        {
          label: '添加职位',
          fun () {
            // alert('添加职位')
            vm.addPosition = true
          }
        }
      ],
      addPosition: false,
      editPosition: false,
      editPositionInfo: {dictDesc: '', dictType: ''},
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      }
    }
  },
  methods: {
    async addHandler () {
      // alert(`${this.positionValue}添加成功`)
      // let lastPositionInfo = this.tableOptions[this.tableOptions.length - 1]
      let editPositionInfo = {
        dictDesc: this.editPositionInfo.dictDesc,
        dictType: 'ZHIWEIXINXI',
        dictIndex: this.tableOptions.data.length,
        dictParent: 0,
        dictValue: ''
      }
      try {
        let { data } = await dicAPIs.saveDictValue(editPositionInfo)
        if (data.code === 200) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.getPositionList()
        }
      } catch (error) {}
      this.addPosition = false
    },
    async editHandler () {
      // 这里调用更新接口
      // alert(`${this.editPositionInfo.oldValue}修改成功`)
      delete this.editPositionInfo.nowPosition
      delete this.editPositionInfo.operation
      try {
        let { data } = await dicAPIs.updateSystemDictValue(this.editPositionInfo)
        if (data.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.getPositionList()
        }
      } catch (error) {}
      this.editPosition = false
    },
    pageHandler (val) {
      this.pageInfo.pageNum = val
      console.log(this.pageInfo)
      // 接口
    },
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadCrumbOptions,
        rightButtonOption: this.rightButtonOptions
      })
    },
    async getPositionList () {
      try {
        let { data } = await dicAPIs.selectInfoByValues({ type: 'ZHIWEIXINXI' })
        let editFun = (row) => {
          this.editPositionInfo = row
          this.editPositionInfo.dictDesc = ''
          this.editPosition = true
        }
        let delFun = (row) => {
          this.$confirm(`是否删除 ${row.nowPosition} 职位`).then(data => {
            if (data) {
              // 这里调用删除接口
              this.deleteDictValue(row)
            } else {
              this.$message('取消删除')
            }
          }).catch(err => {
            if (err) {
              this.$message('取消删除')
            }
          })
        }
        data.data.forEach(item => {
          item.nowPosition = item.dictDesc
          item.operation = [
            {
              textProp: '修改'
            },
            {
              textProp: '删除'
            }
          ]
        })
        this.tableOptions = editPositionService(data.data).getTableOption({editFun, delFun})
      } catch (error) {}
    },
    async deleteDictValue (row) {
      let { data } = await dicAPIs.deleteDictValue({ id: row.id })
      if (data.code === 200) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.getPositionList()
      }
    }
  },
  mounted () {
    this.resetOption()
    this.getPositionList()
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
<style lang="less">
.myoperation{
  display: inline-block;
  width: 50%;
  text-align: center;
  box-sizing: border-box;
}
</style>
