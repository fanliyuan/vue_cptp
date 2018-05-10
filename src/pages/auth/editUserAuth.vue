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
          <el-option v-for="item in roleList" :value="item.dictIndex" :label="item.dictDesc" :key="item.id"></el-option>
        </el-select>
      </div>
      <div class="box">
        <div class="label">职位类型</div>
        <!-- <el-input class="input" v-model="authInfo.positionClass"></el-input>
         -->
        <el-select v-model="authInfo.postionType" placeholder="请选择职位类型" class="input" @change="positionTypeSelectHandler">
          <el-option v-for="item in positionTypeList" :value="item.positionType" :label="item.positionTypeName" :key="item.id"></el-option>
        </el-select>
      </div>
      <div class="box">
        <div class="label">职位</div>
        <!-- <el-input class="input" v-model="authInfo.position"></el-input> -->
        <el-select v-model="authInfo.postionName" placeholder="请选择职位" class="input" @change="positionSelectHandler">
          <el-option v-for="item in positionList" :value="item.dictIndex" :label="item.dictDesc" :key="item.id"></el-option>
        </el-select>
      </div>
      <div class="box">
        <div class="label" style="vertical-align: top;">权限</div>
        <el-checkbox-group v-model="authCheckList" class="input" style="display: inline-block" @change="authSelectHandler">
          <el-checkbox v-for="item in powerList" :label="item.label"  :key="item.id" disabled></el-checkbox>
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
      authList: [],
      authCheckList: [],
      powerList: []
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
    async getPositionTypeList (val = 0) {
      try {
        let { data } = await authAPIs.getRoleByRoleId({ id: val })
        if (data.code === 200) {
          this.positionTypeList = data.data
        } else {
          this.positionTypeList = []
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
          this.userInfo.authList = data.data
        }
      } catch (error) {}
    },
    async updateRole () {
      let params = {
        // deptName: this.authInfo.deptName,
        // deptType: this.authInfo.deptType,
        id: this.authInfo.id,
        userId: this.authInfo.userId,
        positionId: this.authInfo.postionId,
        positionName: this.authInfo.postionName,
        positionType: this.authInfo.postionType,
        positionTypeName: this.authInfo.postionTypeName,
        powerList: this.authInfo.powerList,
        roleId: this.authInfo.roleId,
        roleName: this.authInfo.roleName
        // userId: this.authInfo.userId
      }
      this.positionTypeList.some(item => {
        if (item.positionType === this.authInfo.postionType) {
          params.positionTypeName = item.positionTypeName
          return true
        }
      })
      if (Object.values(params).indexOf(null) !== -1) {
        this.$message({
          type: 'error',
          message: '选择不能为空'
        })
        return false
      }
      // console.log(params)
      // return false
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
    async roleSelectHandler (val) {
      this.authInfo.roleId = val
      this.roleList.some(item => {
        if (item.dictIndex === val) {
          this.authInfo.roleName = item.dictDesc
        }
      })
      this.authInfo.postionType = null
      this.powerList = []
      this.authCheckList = []
      this.getPositionTypeList(val)
    },
    async positionTypeSelectHandler (val) {
      let authList = [{
        id: 0,
        label: '查看'
      }, {
        id: 1,
        label: '下载'
      }, {
        id: 2,
        label: '上传'
      }, {
        id: 3,
        label: '编辑'
      }, {
        id: 4,
        label: '删除'
      }]
      let authCheckList = []
      let list = []
      this.authInfo.positionType = val
      this.positionTypeList.some(item => {
        if (item.positionType === val) {
          this.authInfo.postionTypeName = item.positionTypeName
          this.authInfo.powerList = item.powerList
          return true
        }
      })
      authList.forEach(item => {
        if (this.authInfo.powerList.split(',').indexOf(item.id + '') !== -1) {
          list.push(item)
          authCheckList.push(item.label)
        }
      })
      this.powerList = list
      this.authCheckList = authCheckList
    },
    positionSelectHandler (val) {
      this.authInfo.positionInfoType = val
      this.positionList.some(item => {
        if (item.dictIndex === val) {
          this.authInfo.postionName = item.dictDesc
        }
      })
    },
    authSelectHandler (val) {
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
      let authList = [
        {
          id: 0,
          label: '查看'
        }, {
          id: 1,
          label: '下载'
        }, {
          id: 2,
          label: '上传'
        }, {
          id: 3,
          label: '编辑'
        }, {
          id: 4,
          label: '删除'
        }
      ]
      try {
        this.authInfo = JSON.parse(sessionStorage.getItem('authInfo'))
        await this.getRolelist()
        await this.getPositionList()
        await this.getPositionTypeList(this.authInfo.roleId)
        await this.getAuthList()
        this.authInfo.postionType = this.authInfo.postionType
        let authCheckList = []
        let list = []
        authList.forEach(item => {
          if (this.authInfo.powerList.split(',').indexOf(item.id + '') !== -1) {
            list.push(item)
            authCheckList.push(item.label)
          }
        })
        this.powerList = list
        this.authCheckList = authCheckList
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
