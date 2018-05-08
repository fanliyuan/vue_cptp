<template>
  <div>
    <div class="myinput">
      <div class="box">
        <div class="label">用户名</div>
        <div class="silver username">{{authInfo.userName || '未知用户'}}</div>
      </div>
      <div class="box">
        <div class="label">角色</div>
        <!-- <el-input class="input" v-model="authInfo.role"></el-input> -->
        <el-select v-model="authInfo.roleId" placeholder="请选择角色" class="input" @change="roleSelectHandler">
          <el-option v-for="item in roleList" :value="item.id" :label="item.dictDesc" :key="item.id"></el-option>
        </el-select>
      </div>
      <div class="box">
        <div class="label">职位类型</div>
        <!-- <el-input class="input" v-model="authInfo.positionClass"></el-input>
         -->
        <el-select v-model="authInfo.postionType" placeholder="请选择职位类型" class="input" @change="positionTypeSelectHandler">
          <el-option v-for="item in positionTypeList" :value="item.dictIndex" :label="item.dictDesc" :key="item.id"></el-option>
        </el-select>
      </div>
      <div class="box">
        <div class="label">职位</div>
        <!-- <el-input class="input" v-model="authInfo.position"></el-input> -->
        <el-select v-model="authInfo.postionInfoType" placeholder="请选择职位" class="input" @change="positionSelectHandler">
          <el-option v-for="item in positionList" :value="item.dictIndex" :label="item.dictDesc" :key="item.id"></el-option>
        </el-select>
      </div>
      <div class="box">
        <div class="label" style="vertical-align: top;">权限</div>
        <el-checkbox-group v-model="authCheckList" class="input" style="display: inline-block" @change="authSelectHandler">
          <el-checkbox v-for="item in authList" :label="item.dictDesc"  :key="item.dictDesc"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <el-button type="primary" class="submit" @click="submitHandler">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import dicAPIs from '../../api/dic/dicAPIs'
import authAPIs from '../../api/auth/authAPIs'
export default {
  data () {
    return {
      breadCrumbOptions: {bread: [{label: '权限管理', path: '/auth'}, {label: '编辑权限'}]},
      authInfo: {
      },
      roleList: [],
      positionTypeList: [],
      positionList: [],
      authCheckList: [],
      authList: []
    }
  },
  methods: {
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadCrumbOptions,
        rightButtonOption: null
      })
    },
    async getRolelist () {
      try {
        let { data } = await dicAPIs.selectInfoByValues({ type: 'JIAOSELEIXING' })
        if (data.code === 200) {
          this.roleList = data.data
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
    async getPositionList () {
      try {
        let { data } = await dicAPIs.selectInfoByValues({ type: 'ZHIWEIXINXI' })
        if (data.code === 200) {
          this.positionList = data.data
        }
      } catch (error) {}
    },
    async getAuthList () {
      try {
        let { data } = await dicAPIs.selectInfoByValues({ type: 'QUANXIANLEIXING' })
        if (data.code === 200) {
          this.authList = data.data
        }
      } catch (error) {}
    },
    async updateRole () {
      let params = {
        deptName: this.authInfo.deptName,
        deptType: this.authInfo.deptType,
        id: this.authInfo.id,
        positionInfoName: this.authInfo.postionInfoName,
        positionInfoType: this.authInfo.postionInfoType,
        positionType: this.authInfo.postionType,
        positionTypeName: this.authInfo.postionTypeName,
        powerList: this.authInfo.powerList,
        roleId: this.authInfo.roleId,
        roleName: this.authInfo.roleName,
        userId: this.authInfo.userId
      }
      try {
        let { data } = await authAPIs.updateRole(params)
        if (data.code) {
          this.$message({
            type: 'success',
            message: data.message
          })
        }
        this.$router.push('/auth')
      } catch (error) {
        this.$confirm('操作失败,点击确认将返回列表页').then(_ => {
          this.$router.push('/auth')
        }).catch(_ => {})
      }
    },
    submitHandler () {
      this.updateRole()
    },
    roleSelectHandler (val) {
      this.authInfo.roleId = val
      this.roleList.some(item => {
        if (item.id === val) {
          this.authInfo.roleName = item.dictDesc
        }
      })
      console.log(val)
      console.log(this.authInfo.roleName)
    },
    positionTypeSelectHandler (val) {
      this.authInfo.positionType = val
      this.positionTypeList.some(item => {
        if (item.dictIndex === val) {
          this.authInfo.postionTypeName = item.dictDesc
        }
      })
    },
    positionSelectHandler (val) {
      this.authInfo.positionInfoType = val
      this.positionList.some(item => {
        if (item.dictIndex === val) {
          this.authInfo.postionInfoName = item.dictDesc
        }
      })
    },
    authSelectHandler (val) {
      this.authInfo.powerList = []
      val.forEach(item => {
        this.authList.forEach(sub => {
          if (item === sub.dictDesc) {
            this.authInfo.powerList.push(sub.dictIndex)
          }
        })
      })
      this.authInfo.powerList = this.authInfo.powerList.join(',')
    },
    async getDefault () {
      try {
        await this.getRolelist()
        await this.getPositionList()
        await this.getPositionTypeList()
        await this.getAuthList()
        this.authInfo = JSON.parse(sessionStorage.getItem('authInfo'))
      } catch (error) {}
    }
  },
  mounted () {
    this.resetOption()
    this.getDefault()
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
    .el-checkbox + .el-checkbox {
      margin-left: 0;
    }
    .el-checkbox{
      margin-right: 24px;
      margin-bottom: 8px;
    }
  }
</style>
