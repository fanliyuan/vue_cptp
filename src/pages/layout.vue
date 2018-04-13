/**
* 作者 ：食草狂魔
*
* 日期 ：2017/12/08
*
* 描述 ：子路由布局页
*/
<template>
  <el-container class="is-vertical" style="height:auto;background: #f0f0f0">
    <HeaderBar :menuState="menuState"></HeaderBar>
    <div class="breadcrumb">
      <span class="manager_background"><i class="iconfont icon-houtai1" style="font-size:20px">&nbsp;</i>管理员后台</span>
    </div>
    <el-container style="height:100%;">
      <el-aside style="width:290px">
        <LeftBar :options="leftBarOption"></LeftBar>
      </el-aside>
      <router-view style="width: 100%;padding-left: 20px;padding-right: 20px; padding-top: 10px;position:relative;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-ms-box-sizing:border-box;"/>
      </el-container>
  </el-container>
</template>
<script>
import HeaderBar from '@/components/header/Header.vue'
import LeftBar from '@/components/leftbar/LeftBar.vue'

export default {
  name: 'layout',
  components: {
    HeaderBar,
    LeftBar
  },
  data () {
    return {
      menuState: 'home',
      leftBarOption: {
        title: '左侧菜单数据配置',
        data: [
          {
            'value': 1,
            'label': '用户管理',
            'icon': '图片路径',
            'iconfont': 'icon-yonghuguanli',
            'frontUrl': '/user',
            'parentId': 0
          },
          {
            'value': 2,
            'label': '权限管理',
            'icon': '图片路径',
            'iconfont': 'icon-quanxianshezhi',
            'frontUrl': '/auth',
            'parentId': 0
          },
          {
            'value': 3,
            'label': '产品管理',
            'icon': '图片路径',
            'iconfont': 'icon-chanpin',
            'frontUrl': '/product',
            'parentId': 0,
            'children': [
              {
                'value': 4,
                'label': '标签管理',
                'icon': '图片路径',
                'iconfont': 'icon-biaoqian iconfontx',
                'frontUrl': '/product/editTag',
                'parentId': 3
              },
              {
                'value': 5,
                'label': '市场定位',
                'icon': '图片路径',
                'iconfont': 'icon-shichangfenxi iconfontx',
                'frontUrl': '/product/marketPosition',
                'parentId': 3
              }
            ]
          },
          {
            'value': 6,
            'label': '项目管理',
            'icon': '图片路径',
            'iconfont': 'icon-xiangmu',
            'frontUrl': '/project',
            'parentId': 0
          },
          {
            'value': 8,
            'label': '个人中心',
            'icon': '图片路径',
            'iconfont': 'icon-gerenzhongxin',
            'frontUrl': '/me',
            'parentId': 0
          }
        ]
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .breadcrumb{
    height: 60px;
    background: url('/static/img/breadcrumb-bg.png') no-repeat;
    .manager_background{
      font-size: 20px;
      line-height: 60px;
      color: white;
      margin-left: 80px;
    }
  }
</style>
<style lang="less">
  .iconfont.iconfontx{
    font-size: 14px !important;
  }
</style>
