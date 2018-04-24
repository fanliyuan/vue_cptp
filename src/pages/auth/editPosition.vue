<template>
  <div>
    <el-dialog :visible.sync="addPosition" class="mydialog" :width="'30%'">
      <div class="dialogbox">
        <span class="label">职位名</span>
        <el-input v-model="positionValue" class="input"></el-input>
      </div>
      <el-button type="primary" class="button" @click="addHandler">确定</el-button>
    </el-dialog>
    <Tabel :options="tableOptions" />
    <el-pagination v-if="pageInfo.total > 10" :total="pageInfo.total" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" background layout="prev, pager, next, jumper" class="mypagenation" @current-change="pageHandler"></el-pagination>
    <el-dialog :visible.sync="editPosition" class="mydialog" :width="'30%'">
      <div class="dialogbox">
        <span class="label">原职位名</span>
        <el-input v-model="editPositionInfo.oldValue" class="input" readonly=""></el-input>
      </div>
      <div class="dialogbox">
        <span class="label">新职位名</span>
        <el-input v-model="editPositionInfo.newValue" class="input"></el-input>
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
export default {
  components: {
    Tabel
  },
  data () {
    let vm = this
    let editFun = (row) => {
      this.editPositionInfo = {
        oldValue: row.nowPosition
      }
      this.editPosition = true
    }
    let delFun = (row) => {
      this.$confirm(`是否删除 ${row.nowPosition} 职位`).then(data => {
        if (data) {
          // 这里调用删除接口
          console.log('确认删除')
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
      positionValue: '',
      editPosition: false,
      editPositionInfo: {},
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 11
      }
    }
  },
  methods: {
    addHandler () {
      alert(`${this.positionValue}添加成功`)
    },
    editHandler () {
      // 这里调用更新接口
      alert(`${this.editPositionInfo.oldValue}修改成功`)
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
<style lang="less">
.myoperation{
  display: inline-block;
  width: 50%;
  text-align: center;
  box-sizing: border-box;
}
</style>
