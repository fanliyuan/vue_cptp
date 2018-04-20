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
          <img src="/static/img/logo.png">
        </router-link>
      </el-col>
      <el-col style="margin-left:-60px; display: inline-block; width: auto">
        <span class="headerText">产品资源全景浏览器</span>
      </el-col>
      <el-col class="adminInfo" style="margin-right: 30px;float: right; width: auto">
        <p class="head_text">
          <!-- <img src="/static/img/avatar.png" alt="默认头像" style=""> -->
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
export default {
  props: ['menuState'],
  name: 'HeaderBar',
  data () {
    return {
      userName: '未知用户'
    }
  },
  mounted: function () {
  },
  methods: {
    logoutHandler () {
      this.$message({
        type: 'success',
        message: '退出'
      })
    },
    meHandler () {
      // this.$router.push({name: 'me'})
    }
  }
}
</script>

<style lang="less" scoped>
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
    .iconfontx{
      font-size: 16px;
    }
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
