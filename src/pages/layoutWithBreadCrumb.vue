/*
 * @Author: ChouEric
 * @Date: 2018-04-24 09:30:30
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-05-02 15:33:21
*/

<template>
  <el-container class="layout is-vertical" style="height: auto;">
    <Header/>
    <nav class="clearfix">
      <div class="header_div">
        <i class="iconfont icon-houtai1"></i>
        <span class="header_nav">
          管理员后台
        </span>
      </div>
      <BreadCrumb v-if="options.breadCrumbOption" :options="options.breadCrumbOption" class="bread_crumb"/>
      <RightButton v-if="options.rightButtonOption" :options="options.rightButtonOption" class="right_button"/>
    </nav>
    <el-container style="margin-top:0;margin-bottom:0;height: auto">
      <el-aside style="width:290px">
        <LeftBar :options="leftBarOption"></LeftBar>
      </el-aside>
      <router-view @data="dataFromChild" class="router_view"/>
    </el-container>
  </el-container>
</template>
<script>
import Header from '../components/header/Header'
import BreadCrumb from '../components/breadcrumb/BreadCrumb'
import RightButton from '../components/rightbutton/RightButton'
import LeftBar from '../components/leftbar/LeftBar'
export default {
  components: {
    BreadCrumb,
    RightButton,
    Header,
    LeftBar
  },
  props: ['test'],
  data () {
    return {
      options: {
        breadCrumbOption: {},
        rightButtonOption: []
      },
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
  },
  methods: {
    dataFromChild (data) {
      this.options = data
    }
  }
}
</script>
<style lang="less">
.layout{
  background: #f0f0f0;
  nav{
    padding-left: 80px;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    color: white;
    position: relative;
    background: url('../asets/img/breadcrumb-bg.png') no-repeat;
    .header_div{
      display: inline-block;
      vertical-align: top;
    }
    .icon-houtai1{
      font-size: 20px;
    }
    .header_nav{
      line-height: 60px;
    }
    .bread_crumb{
      margin-left: 145px;
      display: inline-block;
      line-height: 60px;
      padding: 0;
      box-shadow: none;
    }
    .right_button{
      position: absolute;
      right: 35px;
      top: 8px;
    }
  }
  .router_view{
    overflow: auto;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    position: relative;
    box-sizing: border-box;
    width: 100%
  }
}
</style>
