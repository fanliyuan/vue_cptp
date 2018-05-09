<template>
  <el-container id="app" class="containerMain is-vertical">
    <router-view/>
  </el-container>
</template>
<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
  @import "./assets/less/common.less";
   /* 全局样式,目前里面写了面包屑的全局样式 */
  @import "./assets/less/globalcss.css";
  /* 字体图标 */
  @import "/staticm/css/iconfont.css";
  @import "/staticm/css/iconfont2.css";
  .containerMain {
    min-width: 1190px;
  }
  .el-container.is-vertical {
    flex-direction: column;
  }
  html{
    height: 100%;
  }
  body{
    height: 100%;
  }
  #app{
    height: 100%;
  }
</style>
