/**
* 作者 ：食草狂魔
*
* 日期 ：2017/11/14
*
* 描述 ：首页
*/
<template>
  <el-container class="is-vertical">
    <HeaderBar :menuState="menuState"></HeaderBar>
    </div>
    <!-- <BreadCrumb :options="breadOptions" class="breadcreamb"></BreadCrumb> -->
    <el-main>
      <p>welcome!!</p>
    </el-main>
    <router-view/>
  </el-container>
</template>
<script>
import HeaderBar from '@/components/header/Header.vue'
import BreadCrumb from '@/components/breadcrumb/BreadCrumb.vue'
export default {
  name: 'index',
  components: {
    HeaderBar,
    BreadCrumb
  },
  data () {
    return {
      menuState: 'home',
      breadOptions: {
        bread: [
          {
            label: '一级',
            path: '/'
          }, {
            label: '二级',
            path: '/'
          }, {
            label: '三级',
            path: '/'
          }, {
            label: '四级',
            path: '/'
          }
        ]
      }
    }
  },
  mounted () {
    // layui-layer
    // layer.alert('hello world!')
    // 直接alert
    // alert('hello mytemplate')
    // lodash
    // let arr = _.chunk(['a', 'b', 'c', 'd'], 3)
    // let arr = this.$lodash.chunk(['a', 'b', 'c'], 3)
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  @import "home.less";
  .breadcreamb{
    box-shadow: 1px 1px 1px 1px #999;
  }
</style>
