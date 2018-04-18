/**
* 作者 ：zn
*
* 日期 ：2017/12/08
*
* 描述 ：公共左侧菜单递归子组件
*/
<template>
  <el-menu-item v-if="!item.children"
                :index="indexp + '-' + item.value.toString()"
                style="padding-left:80px">
    <router-link :to="{ path:item.frontUrl }">
      <b v-if="item.iconfont" :class="item.iconfont" class="iconfont"></b>&nbsp;
      {{item.label}}
      </router-link>
  </el-menu-item>
  <el-submenu v-else
              :index="indexp + '-' + item.value.toString()">
    <template slot="title">
      <router-link :to="{ path:item.frontUrl}"
                style="padding-left:60px">
        <b v-if="item.iconfont" :class="item.iconfont" class="iconfont"></b>&nbsp;
        {{item.label}}
      </router-link>
    </template>
    <template v-for="itemChild in item.children">
      <items :item="itemChild" :key="itemChild.index" :indexp="indexp + '-' + item.value.toString()" style="padding-left:80px;font-size:14px;"  class="my_leftbar_child"></items>
    </template>
  </el-submenu>
</template>
<script>
export default {
  name: 'items',
  props: ['item', 'indexp']
}
</script>
<style lang="less" scoped>
  .my_leftbar_child{
    a {
      font-size: 14px !important;
    }
  }
  .iconfont{
    font-size: 18px;
    font-weight: 400;
  }
</style>
<style lang="less">
.el-submenu__title{
}
</style>
