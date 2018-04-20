<template>
  <div>
    <bread-crumb :options="breadCrumbOptions"  class="mybreadcrumb" />
    <RightButton :options="rightButtonOptions"/>
    <el-dialog :visible.sync="addPositionClass" class="mydialog" :width="'30%'">
      <div class="dialogbox">
        <span class="label">职位类型</span>
        <el-input v-model="positionClassValue" class="input"></el-input>
      </div>
      <div class="dialogbox">
        <span class="label">对应职位</span>
        <el-input v-model="positionClassValue" class="input"></el-input>
      </div>
      <el-button type="primary" class="button" @click="addHandler">确定</el-button>
    </el-dialog>
    <Tabel :options="tableOptions" />
    <el-pagination v-if="pageInfo.total > 10" :total="pageInfo.total" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" background layout="prev, pager, next, jumper" class="mypagenation" @current-change="pageHandler"></el-pagination>
    <el-dialog :visible.sync="editPositionClass" class="mydialog" :width="'30%'">
      <div class="dialogbox">
        <span class="label">原职位类型</span>
        <el-input v-model="editPositionClassInfo.oldValue" class="input" readonly=""></el-input>
      </div>
      <div class="dialogbox">
        <span class="label">新职位类型</span>
        <el-input v-model="editPositionClassInfo.newValue" class="input"></el-input>
      </div>
      <div class="dialogbox">
        <span class="label">对应的职位</span>
        <el-input v-model="editPositionClassInfo.newValue" class="input"></el-input>
      </div>
      <el-button type="primary" class="button" @click="editHandler">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>
import BreadCrumb from '../../components/breadcrumb/BreadCrumb'
import RightButton from '../../components/rightbutton/RightButton'
import Tabel from '../../components/table/Table'
import editPositionClassService from './service/editPositionClassService'
export default {
  components: {
    BreadCrumb,
    Tabel,
    RightButton
  },
  data () {
    let vm = this
    let editFun = (row) => {
      this.editPositionClassInfo = {
        oldValue: row.positionClass
      }
      this.editPositionClass = true
    }
    let delFun = (row) => {
      this.$confirm(`是否删除 ${row.positionClass} 职位类型`).then(data => {
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
            label: '职位类型设置'
          }
        ]
      },
      tableOptions: editPositionClassService().getTableOption({editFun, delFun}),
      rightButtonOptions: [
        {
          label: '添加职位类型',
          fun () {
            // alert('添加职位')
            vm.addPositionClass = true
          }
        }
      ],
      addPositionClass: false,
      positionClassValue: '',
      editPositionClass: false,
      editPositionClassInfo: {},
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 11
      }
    }
  },
  methods: {
    addHandler () {
      alert(`${this.positionClassValue}添加成功`)
    },
    editHandler () {
      // 这里调用更新接口
      alert(`${this.editPositionClassInfo.oldValue}修改成功`)
      this.editPosition = false
    },
    pageHandler (val) {
      this.pageInfo.pageNum = val
      console.log(this.pageInfo)
      // 调用接口
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
<style lang="less">
.myoperation{
  display: inline-block;
  width: 50%;
  text-align: center;
  box-sizing: border-box;
}
</style>
