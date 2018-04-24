<template>
  <div>
    <div class="myinput">
      <div class="box">
        <div class="label">用户名</div>
        <div class="silver username" v-if="userInfo.oldName">{{userInfo.oldName}}</div>
        <el-input class="input" v-else v-model="userInfo.userName"></el-input>
      </div>
      <div class="box">
        <div class="label">账号</div>
        <el-input class="input" v-model="userInfo.account"></el-input>
      </div>
      <div class="box">
        <div class="label">手机号</div>
        <el-input class="input" v-model="userInfo.mobile"></el-input>
      </div>
      <div class="box">
        <div class="label">部门</div>
        <el-input class="input" v-model="userInfo.department"></el-input>
      </div>
      <div class="box">
        <div class="label">职位</div>
        <el-input class="input" v-model="userInfo.position"></el-input>
      </div>
      <div class="box">
        <div class="label">职位类型</div>
        <el-input class="input" v-model="userInfo.positionClass"></el-input>
      </div>
      <div class="box">
        <div class="label">角色</div>
        <el-input class="input" v-model="userInfo.role"></el-input>
      </div>
      <div>
        <el-button type="primary" class="submit" @click="submitHandler">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import editUser from './service/editUserService'
export default {
  data () {
    return {
      breadCrumbOptions: editUser().getOptions().breadCrumbOptions,
      userInfo: {
        oldName: null,
        userName: null,
        account: null,
        mobile: null,
        deparment: null,
        position: null,
        positionClass: null,
        role: null
      }
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
  },
  methods: {
    submitHandler () {
      // 这里调用修改或者添加接口
      console.log('修改提交')
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
