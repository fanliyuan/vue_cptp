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
  },
  mounted () {
    this.$emit('data', {
      breadCrumbOption: {
        bread: [
          {
            label: '用户管理',
            path: '/user'
          },
          {
            label: '用户添加'
          }
        ]
      },
      rightButtonOption: [
        {
          label: '点击添加',
          fun () {
            console.log('点击了')
          }
        },
        {
          label: '点击添加',
          fun () {
            console.log('点击了')
          }
        }
      ]
    })
  }
}
</script>

<style scoped lang="less">
</style>
<style lang="less">
</style>
