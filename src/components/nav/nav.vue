/*
 * @Author: ChouEric
 * @Date: 2018-05-28 15:35:34
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-05-29 17:11:38
 * @描述: 此组件用来替代leftbar递归组件的,解决的问题是为了优化导航显示样式的问题,一级标题如果有点击地址,那么也将有激活的样式
*/
<template>
  <el-menu>
    <el-menu-item v-for="item in navData" :index="item.index" :class="{father: !item.children, child: item.children, active: $route.path === item.frontUrl}" :key="item.frontUrl">
      <router-link :to="item.frontUrl">
        <span>
          <i :class="item.iconClass"></i>
          {{item.label}}
        </span>
      </router-link>
      <i class="el-icon-arrow-down"></i>
      <template v-if="item.children">
        <el-menu-item v-for="sub in item.children" :class="{active: $route.path === sub.frontUrl}" :index="sub.index" :key="sub.frontUrl">
          <router-link :to="sub.frontUrl">
            <span>
              <i :class="sub.iconClass"></i>
              {{sub.label}}
            </span>
          </router-link>
        </el-menu-item>
      </template>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  props: {
    navData: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .el-menu{
    height: 100%;
    background: #364863;
    a{
      color: white;
      font-size: 16px;
      background: #364863;
    }
    .iconfont, .iconfont2{
      color: white;
      font-size: 18px;
    }
  }
  span{
    display: block;
  }
  .el-menu-item{
    height: 56px;
    padding: 0 !important;
    overflow: hidden;
    transition: height 0.3s linear;
    position: relative;
    &:hover{
      background-color: transparent !important;
    }
    &.is-active{
      height: 168px;
      .el-menu-item{
        height: 56px;
      }
    }
    &.father{
      height: 56px;
    }
    &.fater .el-icon-arrow-down{
      display: none;
    }
    &.child .el-icon-arrow-down{
      position: absolute;
      right: 20px;
      margin-top: -33px;
      transition: transform .3s;
      font-size: 12px;
    }
    &.child&.is-active .el-icon-arrow-down {
      transform: rotate(180deg)
    }
    &.active{
      >a, >a:hover{
        background: rgb(242, 242, 242);
        color: #364863;
        .iconfont, .iconfont2 {
          color: #364863;
        }
      }
    }
    a{
      text-indent: 80px;
      display: block;
    }
    .el-menu-item a{
      text-indent: 100px;
    }
    a:hover{
      background: rgb(43, 58, 79);
    }
  }
</style>
