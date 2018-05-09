<template>
  <div>
    <el-dialog :visible.sync="addRole" class="mydialog" :width="'30%'">
      <div class="dialogbox">
        <span class="label">角色名称</span>
        <!-- <el-input v-model="roleInfo.roleName" class="input"></el-input> -->
        <el-select v-model="roleInfo.roleId" class="input">
          <el-option v-for="item in roleList" :label="item.dictDesc" :value="item.dictIndex" :key="item.id"></el-option>
        </el-select>
      </div>
      <div class="dialogbox">
        <span class="label">职位类型</span>
        <!-- <el-input v-model="roleInfo.positionClass" class="input"></el-input> -->
        <el-select v-model="roleInfo.positionClass" class="input" @change="positionTypeSelectHandler">
          <el-option v-for="item in positionTypeList" :value="item.dictDesc" :label="item.dictDesc" :key="item.id"></el-option>
        </el-select>
      </div>
      <div class="dialogbox">
        <span class="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;权限</span>
        <el-checkbox-group v-model="authCheckList" class="input" @change="authSelectHandler">
          <!-- 这里用循环 -->
          <!-- <el-checkbox label="查看" :value="0"></el-checkbox> -->
          <el-checkbox v-for="item in authList" :label="item.dictDesc" :key="item.id"></el-checkbox>
        </el-checkbox-group>
      </div>
      <el-button type="primary" class="button" @click="addHandler">确定</el-button>
    </el-dialog>
    <el-table :data="tableData">
      <el-table-column align="center" label="角色" prop="roleName"></el-table-column>
      <el-table-column align="center" label="职位类型" prop="positionTypeName"></el-table-column>
      <el-table-column align="center" label="权限">
        <el-table-column align="center" label="查看" width="100" prop="look"></el-table-column>
        <el-table-column align="center" label="下载" width="100" prop="download"></el-table-column>
        <el-table-column align="center" label="上传" width="100" prop="upload"></el-table-column>
        <el-table-column align="center" label="编辑" width="100" prop="edit"></el-table-column>
        <el-table-column align="center" label="删除" width="100" prop="del"></el-table-column>
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
        <el-input v-model="roleInfo.positionTypeName" readonly class="input"></el-input>
        <!-- <el-select v-model="roleInfo.positionClass" class="input">
          <el-option v-for="item in positionTypeList" :value="item.dictDesc" :label="item.dictDesc" :key="item.id"></el-option>
        </el-select> -->
      </div>
      <div class="dialogbox">
        <span class="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;权限</span>
        <el-checkbox-group v-model="authCheckList" class="input" @change="authSelectHandler">
          <el-checkbox v-for="item in authList" :label="item.dictDesc" :key="item.id"></el-checkbox>
        </el-checkbox-group>
      </div>
      <el-button type="primary" class="button" @click="editHandler">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>
import dicAPIs from '../../api/dic/dicAPIs'
import authAPIs from '../../api/auth/authAPIs'
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
            vm.authCheckList = []
            vm.roleInfo.roleName = ''
            vm.roleInfo.positionType = 0
            vm.roleInfo.positionTypeName = ''
          }
        }
      ],
      addRole: false,
      editRole: false,
      roleInfo: {roleName: '', powerList: ''},
      tableData: [
      ],
      operate: {
        handler (item, row) {
          if (item.label === '编辑') {
            // 编辑
            vm.editRole = true
            vm.roleInfo.roleName = row.roleName
            vm.roleInfo.roleId = row.roleId
            vm.roleInfo.positionTypeName = row.positionTypeName
            vm.roleInfo.powerList = row.powerList
            vm.roleInfo.id = row.id
            vm.roleInfo.positionType = row.positionType
            vm.roleInfo.powerList = vm.roleInfo.powerList.split(',')
            vm.authCheckList = []
            vm.roleInfo.powerList.forEach(item => {
              vm.authList.forEach(sub => {
                if (+item === +sub.dictIndex) {
                  vm.authCheckList.push(sub.dictDesc)
                }
              })
            })
          } else {
            vm.$confirm(`确认要删除角色: ${row.roleName}`)
              .then(async (flag) => {
                if (flag) {
                  // 调用删除接口
                  try {
                    let {data} = await authAPIs.deleteRole({
                      id: row.id
                    })
                    if (data.code === 200) {
                      vm.$message({
                        type: 'success',
                        message: '删除成功'
                      })
                      vm.getDataList()
                    } else {
                      vm.$message({
                        type: 'error',
                        message: '操作失败'
                      })
                    }
                  } catch (error) {}
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
        total: 0
      },
      authList: [],
      roleList: [],
      positionTypeList: [],
      authCheckList: [],
      userAccount: '',
      userName: '',
      postionInfoId: -1,
      positionTypeId: -1,
      roleId: -1
    }
  },
  methods: {
    async addHandler () {
      // 这里调用添加接口
      if (!this.roleInfo.positionTypeName) {
        this.$message({
          type: 'error',
          message: '职位类型选择为空'
        })
        return false
      }
      this.roleList.some(item => {
        if (item.dictIndex === this.roleInfo.roleId) {
          this.roleInfo.roleName = item.dictDesc
        }
      })
      delete this.roleInfo.positionClass
      this.positionTypeList.some(item => {
        if (item.dictDesc === this.roleInfo.positionTypeName) {
          this.roleInfo.positionType = item.dictIndex
          return true
        }
      })
      this.roleInfo.powerList = []
      this.authCheckList.forEach(item => {
        this.authList.forEach(sub => {
          if (sub.dictDesc === item) {
            this.roleInfo.powerList.push(sub.dictIndex + '')
          }
        })
      })
      this.roleInfo.powerList = this.roleInfo.powerList.join(',')
      try {
        let {data} = await authAPIs.saveRole(this.roleInfo)
        if (data.code === 200) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.getDataList()
        }
      } catch (error) {}
      this.addRole = false
    },
    async editHandler () {
      // 调用编辑接口
      this.roleInfo.powerList = []
      this.authCheckList.forEach(item => {
        this.authList.forEach(sub => {
          if (sub.dictDesc === item) {
            this.roleInfo.powerList.push(sub.dictIndex + '')
          }
        })
      })
      this.roleInfo.powerList = this.roleInfo.powerList.join(',')
      try {
        let {data} = await authAPIs.updateRoleInfo(this.roleInfo)
        if (data.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        } else {
          this.$message(data.data)
        }
        this.getDataList()
        this.roleInfo = {}
      } catch (error) {}
      this.editRole = false
    },
    pageHandler (val) {
      this.pageInfo.pageNum = val
      this.getDataList()
      // 调用接口
    },
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadCrumOption,
        rightButtonOption: this.rightButtonOptions
      })
    },
    async getDataList () {
      try {
        let { data } = await authAPIs.getUserRoleList({token: localStorage.token})
        let operate = [
          {
            label: '编辑'
          },
          {
            label: '删除'
          }
        ]
        let authList = [{
          label: 'look',
          dictIndex: 0
        }, {
          label: 'download',
          dictIndex: 1
        }, {
          label: 'upload',
          dictIndex: 2
        }, {
          label: 'edit',
          dictIndex: 3
        }, {
          label: 'del',
          dictIndex: 4
        }]
        if (data.code === 200) {
          // 换了接口
          // data.data.pageList.forEach(item => {
          //   item.operate = operate
          //   authList.forEach((sub, index) => {
          //     item[sub.label] = item.powerList.split(',').indexOf(index + '') === '-1' ? '×' : '√'
          //   })
          // })
          // this.pageInfo.total = data.data.totalCount
          // this.tableData = data.data.pageList
          data.data.forEach(item => {
            item.operate = operate
            item.powerList = item.powerList.split(',')
            authList.forEach(sub => {
              item[sub.label] = item.powerList.indexOf(sub.dictIndex + '') === -1 ? '×' : '√'
            })
            item.powerList = item.powerList.join(',')
          })
          data.data.sort((pre, next) => {
            return pre.roleId > next.roleId
          })
          this.pageInfo.total = data.data.totalCount
          this.tableData = data.data
        }
      } catch (error) {}
    },
    async getRoleList () {
      try {
        let { data } = await dicAPIs.selectInfoByValues({ type: 'JIAOSELEIXING' })
        if (data.code === 200) {
          this.roleList = data.data
        }
      } catch (error) {}
    },
    async getAuthList () {
      try {
        let { data } = await dicAPIs.selectInfoByValues({ type: 'QUANXIANLEIXING' })
        if (data.code === 200) {
          this.authList = data.data
          this.authList.reverse()
        }
      } catch (error) {}
    },
    async getPositionTypeList () {
      try {
        let { data } = await dicAPIs.selectInfoByValues({ type: 'ZHIWEILEIXING' })
        if (data.code === 200) {
          this.positionTypeList = data.data
        }
      } catch (error) {}
    },
    async getDefault () {
      try {
        this.authList.length === 0 && await this.getAuthList()
        this.positionTypeList.length === 0 && await this.getPositionTypeList()
      } catch (error) {}
    },
    authSelectHandler (val) {
      // val.forEach(item => {
      //   this.authCheckList.forEach(sub => {
      //     if (item === sub.dictDesc) {
      //       arr.push(sub.dictIndex)
      //     }
      //   })
      // })
    },
    positionTypeSelectHandler (val) {
      this.roleInfo.positionTypeName = val
    }
  },
  mounted () {
    this.resetOption()
    this.getRoleList()
    this.getDataList()
    this.getDefault()
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
<style lang="less">
.el-table {
  thead {
    color: white;
    &.is-group{
      th{
        background: #52b3a6 !important;
      }
    }
  }
}
</style>
