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
      <el-col :span="4" class="logo" style="line-height:95px">
        <router-link :to="{ path: '/' }">
          <img src="/static/img/logo.png">
        </router-link>
      </el-col>
      <el-col :span="16" style="margin-left:-60px">
        <span class="headerText">产品资源全景浏览器</span>
      </el-col>
      <el-col class="adminInfo" :span="3" :offset="1">
        <p class="head_text"><img src="/static/img/avatar.png" alt="默认头像" style="">
        &nbsp;&nbsp;
        <span class="userName">{{userName}}</span>
        <i>&nbsp;&nbsp;</i>
        <a href="javascript:;" class="logout">退出</a>
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
  methods: {}
}
</script>

<style scoped>
  @import "./header.styl";
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
</style>
