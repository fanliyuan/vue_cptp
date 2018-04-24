<template>
  <div>
    <el-dialog :visible.sync="addRole" class="mydialog" :width="'30%'">
      <div class="dialogbox">
        <span class="label">角色名称</span>
        <el-input v-model="roleInfo.roleName" class="input"></el-input>
      </div>
      <div class="dialogbox">
        <span class="label">职位类型</span>
        <el-input v-model="roleInfo.positionClass" class="input"></el-input>
      </div>
      <div class="dialogbox">
        <span class="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;权限</span>
        <el-checkbox-group v-model="roleInfo.auth" class="input">
          <el-checkbox label="查看" :value="0"></el-checkbox>
          <el-checkbox label="下载" :value="1"></el-checkbox>
          <el-checkbox label="上传" :value="2"></el-checkbox>
          <el-checkbox label="编辑" :value="3"></el-checkbox>
          <el-checkbox label="删除" :value="4"></el-checkbox>
        </el-checkbox-group>
      </div>
      <el-button type="primary" class="button" @click="addHandler">确定</el-button>
    </el-dialog>
    <el-table :data="tableData">
      <el-table-column align="center" label="角色" prop="roleName"></el-table-column>
      <el-table-column align="center" label="职位类型" prop="positionClass"></el-table-column>
      <el-table-column align="center" label="权限">
        <el-table-column align="center" label="查看" width="100" prop="positionClass"></el-table-column>
        <el-table-column align="center" label="下载" width="100" prop="positionClass"></el-table-column>
        <el-table-column align="center" label="上传" width="100" prop="positionClass"></el-table-column>
        <el-table-column align="center" label="编辑" width="100" prop="positionClass"></el-table-column>
        <el-table-column align="center" label="删除" width="100" prop="positionClass"></el-table-column>
      </el-table-column>
      <el-table-column align="center" label="操作" prop="operate">
        <template slot-scope="scope">
          <a href="javascript:;" class="acolor" v-for="item in scope.row.operate" v-text="item.label" :key="item.index" @click="operate.handler(item, scope.row)">
          </a>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="pageInfo.total > 10" :total="pageInfo.total" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" background layout="prev, pager, next, jumper" class="mypagenation" @current-change="pageHandler"></el-pagination>
    <el-dialog :visible.sync="editRole" class="mydialog" :width="'30%'">
      <div class="dialogbox">
        <span class="label">角色名称</span>
        <el-input v-model="roleInfo.roleName" class="input" readonly></el-input>
      </div>
      <div class="dialogbox">
        <span class="label">职位类型</span>
        <el-input v-model="roleInfo.positionClass" class="input"></el-input>
      </div>
      <div class="dialogbox">
        <span class="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;权限</span>
        <el-checkbox-group v-model="roleInfo.auth" class="input">
          <el-checkbox label="查看" :value="0"></el-checkbox>
          <el-checkbox label="下载" :value="1"></el-checkbox>
          <el-checkbox label="上传" :value="2"></el-checkbox>
          <el-checkbox label="编辑" :value="3"></el-checkbox>
          <el-checkbox label="删除" :value="4"></el-checkbox>
        </el-checkbox-group>
      </div>
      <el-button type="primary" class="button" @click="editHandler">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    let vm = this
    return {
      breadCrumOption: {
        bread: [
          {
            label: '权限管理',
            path: '/auth'
          },
          {
            label: '角色设置'
          }
        ]
      },
      rightButtonOptions: [
        {
          label: '添加角色',
          fun (val) {
            vm.addRole = true
          }
        }
      ],
      addRole: false,
      editRole: false,
      roleInfo: {auth: [], roleName: ''},
      tableData: [
        {
          roleName: '领导',
          operate: [
            {
              label: '编辑'
            },
            {
              label: '删除'
            }
          ]
        }
      ],
      operate: {
        handler (item, row) {
          if (item.label === '编辑') {
            // 编辑
            vm.editRole = true
            vm.roleInfo.roleName = row.roleName
          } else {
            vm.$confirm(`确认要删除角色: ${row.roleName}`)
              .then(data => {
                if (data) {
                  // 调用删除接口
                } else {
                  vm.$message('取消删除')
                }
              })
              .catch(err => {
                if (err) vm.$message('取消删除')
              })
          }
        }
      },
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 11
      }
    }
  },
  methods: {
    addHandler () {
      // 这里调用添加接口
      console.log('调用添加角色接口')
      this.addRole = false
    },
    editHandler () {
      // 调用编辑接口
      console.log('编辑')
      this.editRole = false
    },
    pageHandler (val) {
      this.pageInfo.pageNum = val
      console.log(this.pageInfo)
      // 调用接口
    },
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadCrumOption,
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
    vertical-align: top;
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
.acolor{
  color: #333 !important;
  display: inline-block;
  width: 50%;
  box-sizing: border-box;
  text-align: center;
}
</style>
