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
</style>
<style lang="less">
</style>
