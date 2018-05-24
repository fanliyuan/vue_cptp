/**
* 作者 ：食草狂魔
*
* 日期 ：2017/9/20
*
* 描述 ：公共头部组件
*/
<template>
  <el-header style="height: 95px;">
    <el-row>
      <el-col class="logo" style="line-height:95px;width: 315px">
        <router-link :to="{ path: '/' }">
          <img src="../../assets/img/logo.png">
        </router-link>
      </el-col>
      <el-col style="margin-left:-60px; display: inline-block; width: auto">
        <span class="headerText">产品图谱</span>
      </el-col>
      <el-col class="adminInfo" style="margin-right: 30px;float: right; width: auto">
        <p class="head_text">
          <!-- <img src="../../assets/img/avatar.png" alt="默认头像" style=""> -->
          <a href="javascript:;" @click="meHandler">
            <i class="iconfont icon-gerenzhongxin1"></i>
            &nbsp;
            <span class="userName">{{userName}}</span>
          </a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="bold">
          <a href="javascript:;" class="logout" @click="logoutHandler"><b class="iconfont iconfontx icon-tuichu"></b>&nbsp;&nbsp;退出</a>
        </span>
        </p>
      </el-col>
    </el-row>
  </el-header>
</template>
<script>
import userAPIs from '../../api/user/userAPIs'
export default {
  props: ['menuState'],
  name: 'HeaderBar',
  data () {
    return {
      userName: '未知用户'
    }
  },
  mounted: function () {
    this.getUserName()
  },
  methods: {
    logoutHandler () {
      localStorage && localStorage.setItem('isAdmin', 0)
      if (localStorage && localStorage.token) {
        userAPIs.logout().then(data => {
          if (data.data && data.data.code === 200) {
            this.$message({
              type: 'success',
              message: '退出成功'
            })
          }
        }).catch(err => {
          if (err) {
          }
        })
      }
      this.$router.push('/login')
      localStorage && localStorage.removeItem('token')
      localStorage && localStorage.removeItem('userName')
    },
    meHandler () {
      this.$router.push({name: 'me'})
    },
    getUserName () {
      if (localStorage && localStorage.getItem('userName')) {
        this.userName = localStorage.getItem('userName')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .el-header{
    background: none;
  }
  .head_text{
    line-height: 95px;
    color: #283c4d !important;
    font-size: 16px !important;
    /* font-weight: 700 !important; */
  }
  .el-header .adminInfo, .el-header .adminInfo a{
    color: #283c4d;
    font-size: 16px;
  }
  .userName{
    vertical-align: middle;
    font-weight: bold;
  }
  .iconfont{
    font-size: 44px;
    vertical-align: middle;
  }
  .iconfontx{
    font-size: 16px;
  }
  .bold{
    .logout,i {
      font-weight: bold !important;
    }
  }
</style>
<style scoped>
  @import "./header.styl";
</style>
