<template>
  <div>
    <div class="myinput">
      <div class="box">
        <div class="label">邮箱</div>
        <div class="silver username" v-if="userInfo.userEmail">{{userInfo.userEmail}}</div>
        <router-link to="/me/changePassword" class="button">修改密码</router-link>
      </div>
      <div class="box">
        <div class="label">姓名</div>
        <div class="silver username" v-if="userInfo.userName">{{userInfo.userName}}</div>
      </div>
      <div class="box">
        <div class="label">角色</div>
        <div class="silver username" v-if="userInfo.roleName">{{userInfo.roleName}}</div>
      </div>
      <div class="box">
        <div class="label">手机号</div>
        <div class="silver username" v-if="userInfo.userPhone">{{userInfo.userPhone}}</div>
        <!-- 这里需要验证码接口 -->
        <router-link to="/me/changeMobile" class="button">修改手机号</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import meService from './service/meService'
import userAPIs from '../../api/user/userAPIs'
// import dicAPIs from '../../api/dic/dicAPIs'
export default {
  data () {
    return {
      breadCrumbOption: meService().getBreadCrumbOption(),
      userInfo: {
        userEmail: '数据不存在',
        userName: '数据不存在',
        roleName: '数据不存在',
        userPhone: '数据不存在'
      }
    }
  },
  methods: {
    async getUserInfo () {
      try {
        let { data } = await userAPIs.getUserInfoById({ userId: localStorage.userId })
        if (data.code === 200) {
          this.userInfo = data.data
        } else {
          throw new Error('数据不存在')
        }
      } catch (error) {
        this.userInfo = {
          userEmail: '数据不存在',
          userName: '数据不存在',
          roleName: '数据不存在',
          userPhone: '数据不存在'
        }
      }
    },
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadCrumbOption,
        rightButtonOption: null
      })
    }
  },
  mounted () {
    this.getUserInfo()
    this.resetOption()
  }
}
</script>
<style lang="less" scoped>
  .myinput {
    width: 560px;
    height: auto;
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
      width: 130px;
      display: inline-block;
      text-align: right;
    }
    .silver{
      color: silver;
    }
    .username{
      padding: 20px;
      display: inline-block;
      width: 250px;
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
    .button{
      display: inline-block;
      color: violet;
      cursor: pointer;
    }
  }
</style>
