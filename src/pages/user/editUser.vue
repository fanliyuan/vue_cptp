/*
 * @Author: ChouEric
 * @Date: 2018-05-07 16:55:03
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-05-07 18:11:22
*/
<template>
  <div>
    <div class="myinput">
      <div class="box">
        <div class="label">用户名</div>
        <div class="silver username" v-if="userInfo.userName">{{userInfo.userName}}</div>
        <el-input class="input" v-else v-model="userInfo.newName"></el-input>
      </div>
      <div class="box">
        <div class="label">邮箱</div>
        <el-input class="input" v-model="userInfo.userEmail"></el-input>
      </div>
      <div class="box">
        <div class="label">手机号</div>
        <el-input class="input" v-model="userInfo.userPhone"></el-input>
      </div>
      <div class="box">
        <div class="label">部门</div>
        <el-select class="input" v-model="userInfo.deptId" placeholder="请选择" >
          <el-option
            v-for="deptInfo in deptList"
            :key="deptInfo.id"
            :label="deptInfo.dictDesc"
            :value="deptInfo.dictIndex"
          >
          </el-option>
        </el-select>
      </div>
      <div class="box">
        <div class="label">职位类型</div>
          <el-select class="input" v-model="userInfo.positionTypeId" placeholder="请选择" >
            <el-option
              v-for="positionTypeInfo in positionTypeList"
              :key="positionTypeInfo.id"
              :label="positionTypeInfo.dictDesc"
              :value="positionTypeInfo.dictIndex">
            </el-option>
          </el-select>
      </div>
      <div class="box">
        <div class="label">职位</div>
          <el-select class="input" v-model="userInfo.positionId" placeholder="请选择" >
            <el-option
              v-for="positionInfo in positionList"
              :key="positionInfo.id"
              :label="positionInfo.dictDesc"
              :value="positionInfo.dictIndex">
            </el-option>
          </el-select>
      </div>
      <div class="box">
        <div class="label">角色</div>
        <el-select class="input"  v-model="userInfo.roleId" placeholder="请选择" >
            <el-option
              v-for="roleInfo in roleList"
              :key="roleInfo.id"
              :label="roleInfo.dictDesc"
              :value="roleInfo.dictIndex">
            </el-option>
          </el-select>
      </div>
      <div>
        <el-button type="primary" class="submit" @click="submitHandler">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import editUser from './service/editUserService'
import userAPIs from '../../api/user/userAPIs'
import dicAPIs from '../../api/dic/dicAPIs'
export default {
  data () {
    return {
      breadCrumbOptions: editUser().getOptions().breadCrumbOptions,
      userInfo: {
        token: null,
        userId: null,
        userName: null,
        newName: null,
        userEmail: null,
        userPhone: null,
        deptId: null,
        deptName: null,
        positionId: null,
        positionName: null,
        positionTypeId: null,
        positionTypeName: null,
        roleId: null,
        roleName: null
      },
      positionTypeList: [],
      positionList: [],
      deptList: [],
      roleList: []

    }
  },
  watch: {
    $route () {
      if (this.$route.params && this.$route.params.userId) {
        // 这里调用接口,赋值数据
        this.breadCrumbOptions = {bread: [{label: '用户管理', path: '/user'}, {label: '用户修改'}]}
        this.resetOption()
      } else {
        this.breadCrumbOptions = {bread: [{label: '用户管理', path: '/user'}, {label: '用户添加'}]}
        this.resetOption()
      }
    }
  },
  mounted () {
    if (this.$route.params && this.$route.params.userId) {
      // 这里调用接口,赋值数据
      this.breadCrumbOptions = {bread: [{label: '用户管理', path: '/user'}, {label: '用户修改'}]}
      this.userInfo.oldName = JSON.parse(sessionStorage.getItem('userInfo')).userName
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    } else {
      this.breadCrumbOptions = {bread: [{label: '用户管理', path: '/user'}, {label: '用户添加'}]}
    }
    this.resetOption()
    this.initData()
  },
  methods: {
    initData () {
      let params1 = { type: 'BUMENLEIXING' }
      let params2 = { type: 'ZHIWEILEIXING' }
      let params3 = { type: 'ZHIWEIXINXI' }
      let params4 = { type: 'JIAOSELEIXING' }

      dicAPIs.selectInfoByValues(params1).then(response => {
        if (response.data.code === 200) {
          this.deptList = response.data.data
        } else {
          console.log('错误')
        }
      })

      dicAPIs.selectInfoByValues(params2).then(response => {
        if (response.data.code === 200) {
          this.positionTypeList = response.data.data
        } else {
          console.log('错误')
        }
      })

      dicAPIs.selectInfoByValues(params3).then(response => {
        if (response.data.code === 200) {
          this.positionList = response.data.data
        } else {
          console.log('错误')
        }
      })

      dicAPIs.selectInfoByValues(params4).then(response => {
        if (response.data.code === 200) {
          this.roleList = response.data.data
        } else {
          console.log('错误')
        }
      })
    },
    getDictDesc (dictList, selIndex) {
      for (var index in dictList) {
        if (dictList[index].dictIndex === selIndex) {
          return dictList[index].dictDesc
        }
      }
    },

    async submitHandler () {
      this.userInfo.deptName = this.getDictDesc(this.deptList, this.userInfo.deptId)

      this.userInfo.positionTypeName = this.getDictDesc(this.positionTypeList, this.userInfo.positionTypeId)

      this.userInfo.positionName = this.getDictDesc(this.positionList, this.userInfo.positionId)

      this.userInfo.roleName = this.getDictDesc(this.roleList, this.userInfo.roleId)

      let params = {
        deptId: this.userInfo.deptId,
        deptName: this.userInfo.deptName,
        positionId: this.userInfo.positionId,
        positionName: this.userInfo.positionName,
        positionTypeId: this.userInfo.positionTypeId,
        positionTypeName: this.userInfo.positionTypeName,
        roleId: this.userInfo.roleId,
        roleName: this.userInfo.roleName,
        userEmail: this.userInfo.userEmail,
        userPhone: this.userInfo.userPhone,
        userName: this.userInfo.userName,
        userId: this.userInfo.userId
      }
      try {
        if (this.$route.params && this.$route.params.userId) {
          let { data } = await userAPIs.updateUser(params)
          if (data.code === 200) {
            this.$message({
              type: 'success',
              message: data.message
            })
          } else {
            this.$message({
              type: 'error',
              message: '修改失败'
            })
          }
        } else {
          delete params.userId
          params.userName = this.userInfo.newName
          let { data } = await userAPIs.addUser(params)
          if (data.code === 200) {
            this.$message({
              type: 'success',
              message: data.message
            })
          } else {
            this.$message({
              type: 'error',
              message: '新增失败'
            })
          }
        }
        this.$router.push('/user')
      } catch (error) {
        if (error) {
          this.$confirm('操作失败,点击确认将返回列表页').then(_ => {
            this.$router.push('/user')
          }).catch(_ => {})
        }
      }
    },
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadCrumbOptions,
        rightButtonOption: null
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .myinput {
    width: 560px;
    height: 630px;
    background: white;
    box-shadow: 1px 0px 1px 1px #999;
    border-radius: 5px;
    margin-left: 50%;
    position: relative;
    left: -200px;
    margin-top: 50px;
    font-size: 16px;
    box-sizing: border-box;
    padding: 80px 0px;
    .box{
      height: 62px;
    }
    .label {
      width: 170px;
      display: inline-block;
      text-align: right;
    }
    .silver{
      color: silver;
    }
    .username{
      padding: 20px;
      display: inline-block;
    }
    .input{
      width: 310px;
      margin-left: 10px;
    }
    .submit{
      margin-left: 200px;
      margin-top: 20px;
      padding: 10px 78px;
    }
  }
</style>
