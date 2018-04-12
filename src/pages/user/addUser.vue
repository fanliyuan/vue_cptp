<template>
  <div style="width:100%">
    <BreadCrumb :options="breadCrumbOptions" class="mybreadcrumb"></BreadCrumb>
    添加用户
  </div>
</template>
<script>
import BreadCrumb from '../../components/breadcrumb/BreadCrumb'
import addUserService from './service/addUserService'
export default {
  components: {
    BreadCrumb
  },
  data () {
    let options = addUserService({}).getOptions()
    return {
      breadCrumbOptions: options.breadCrumbOptions
    }
  }
}
</script>

<style scoped lang="less">
  .mybreadcrumb{
    position: absolute;
    left: 135px;
    top: -52px;
    font-size: 16px;
    color: white;
    box-shadow:0 0 0 0 #fff;
  }
</style>
<style lang="less">
.breadCrumb .el-breadcrumb__item:last-child .el-breadcrumb__inner{
  color:#ddd !important;
}
.breadCrumb .el-breadcrumb__inner{
  color:white !important;
}
</style>

