/*
 * @Author: ChouEric
 * @Date: 2018-04-24 09:30:30
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-05-29 15:48:15
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
        <!-- <LeftBar :options="leftBarOption"></LeftBar> -->
        <Nav :navData="navOption"></Nav>
      </el-aside>
      <router-view @data="dataFromChild" class="router_view"/>
    </el-container>
  </el-container>
</template>
<script>
import Header from '../components/header/Header'
import BreadCrumb from '../components/breadcrumb/BreadCrumb'
import RightButton from '../components/rightbutton/RightButton'
// import LeftBar from '../components/leftbar/LeftBar'
import Nav from '../components/nav/nav'
import userAPIs from '../api/user/userAPIs'
export default {
  components: {
    BreadCrumb,
    RightButton,
    Header,
    // LeftBar,
    Nav
  },
  props: ['test'],
  data () {
    return {
      options: {
        breadCrumbOption: {},
        rightButtonOption: []
      },
      leftBarOption: {},
      navOption: []
    }
  },
  methods: {
    dataFromChild (data) {
      this.options = data
    },
    async getLeftBarOption () {
      let { data } = await userAPIs.getUserInfoById({ userId: localStorage.userId })
      if (this.$store.state.isAdmin === 3 || data.data.isAdmin === 3) {
        this.leftBarOption = {
          title: '左侧菜单数据配置',
          data: [
            {
              'value': 1,
              'label': '用户管理',
              'icon': '图片路径',
              'iconfont': 'icon-yonghuguanli iconfont',
              'frontUrl': '/user',
              'parentId': 0
            },
            {
              'value': 2,
              'label': '权限管理',
              'icon': '图片路径',
              'iconfont': 'icon-quanxianshezhi iconfont',
              'frontUrl': '/auth',
              'parentId': 0
            },
            {
              'value': 3,
              'label': '产品管理',
              'icon': '图片路径',
              'iconfont': 'icon-chanpin iconfont',
              'frontUrl': '/product',
              'parentId': 0,
              'children': [
                {
                  'value': 4,
                  'label': '标签管理',
                  'icon': '图片路径',
                  'iconfont': 'icon-biaoqian iconfontx iconfont',
                  'frontUrl': '/product/editTag',
                  'parentId': 3
                },
                {
                  'value': 5,
                  'label': '市场定位',
                  'icon': '图片路径',
                  'iconfont': 'icon-shichangfenxi iconfontx iconfont',
                  'frontUrl': '/product/marketPosition',
                  'parentId': 3
                }
              ]
            },
            {
              'value': 6,
              'label': '项目管理',
              'icon': '图片路径',
              'iconfont': 'icon-xiangmu iconfont',
              'frontUrl': '/project',
              'parentId': 0
            },
            // 这里是字典配置,菜单
            {
              'value': 7,
              'label': '字典配置',
              'iconfont': 'icon-zidianpeizhi iconfont2',
              'frontUrl': '/dict',
              'parentId': 0,
              children: [{
                'value': 9,
                'label': '字典类型',
                'iconfont': 'icon-zidianleixingguanli iconfontx iconfont2',
                'frontUrl': '/dict/key',
                'parentId': 7
              }, {
                'value': 10,
                'label': '字典类型值',
                'iconfont': 'icon-icon-test  iconfontx iconfont2',
                'frontUrl': '/dict/value',
                'parentId': 7
              }]
            },
            {
              'value': 8,
              'label': '个人中心',
              'icon': '图片路径',
              'iconfont': 'icon-gerenzhongxin iconfont',
              'frontUrl': '/me',
              'parentId': 0
            }
          ]
        }
      } else {
        this.leftBarOption = {
          title: '左侧菜单数据配置',
          data: [
            {
              'value': 3,
              'label': '产品管理',
              'icon': '图片路径',
              'iconfont': 'icon-chanpin iconfont',
              'frontUrl': '/product',
              'parentId': 0,
              'children': [
                {
                  'value': 4,
                  'label': '标签管理',
                  'icon': '图片路径',
                  'iconfont': 'icon-biaoqian iconfontx iconfont',
                  'frontUrl': '/product/editTag',
                  'parentId': 3
                },
                {
                  'value': 5,
                  'label': '市场定位',
                  'icon': '图片路径',
                  'iconfont': 'icon-shichangfenxi iconfontx iconfont',
                  'frontUrl': '/product/marketPosition',
                  'parentId': 3
                }
              ]
            },
            {
              'value': 8,
              'label': '个人中心',
              'icon': '图片路径',
              'iconfont': 'icon-gerenzhongxin iconfont',
              'frontUrl': '/me',
              'parentId': 0
            }
          ]
        }
      }
    },
    async getNavOption () {
      if (this.$store.state.isAdmin === 3) {
        this.navOption = [
          {
            iconClass: 'icon-yonghuguanli iconfont',
            index: '1',
            label: '用户管理',
            frontUrl: '/user'
          },
          {
            iconClass: 'icon-quanxianshezhi iconfont',
            index: '2',
            label: '权限管理',
            frontUrl: '/auth'
          },
          {
            iconClass: 'icon-chanpin iconfont',
            index: '3',
            label: '产品管理',
            frontUrl: '/product',
            children: [
              {
                iconClass: 'icon-biaoqian iconfontx iconfont',
                index: '1',
                label: '标签管理',
                frontUrl: '/product/editTag'
              },
              {
                iconClass: 'icon-shichangfenxi iconfontx iconfont',
                index: '2',
                label: '市场定位',
                frontUrl: '/product/marketPosition'
              }
            ]
          },
          {
            iconClass: 'icon-xiangmu iconfont',
            index: '4',
            label: '项目管理',
            frontUrl: '/project'
          },
          {
            iconClass: 'icon-zidianpeizhi iconfont2',
            index: '5',
            label: '字典配置',
            frontUrl: '/dict',
            children: [
              {
                iconClass: 'icon-zidianleixingguanli iconfontx iconfont2',
                index: '1',
                label: '字典类型',
                frontUrl: '/dict/key'
              },
              {
                iconClass: 'icon-icon-test  iconfontx iconfont2',
                index: '2',
                label: '字典类型值',
                frontUrl: '/dict/value'
              }
            ]
          },
          {
            iconClass: 'icon-gerenzhongxin iconfont',
            index: '6',
            label: '个人中心',
            frontUrl: '/me'
          }
        ]
      } else {
        try {
          let {data} = await userAPIs.getUserInfoById({ userId: localStorage.userId })
          if (data.data.isAdmin === 3) {
            this.navOption = [
              {
                iconClass: 'icon-yonghuguanli iconfont',
                index: '1',
                label: '用户管理',
                frontUrl: '/user'
              },
              {
                iconClass: 'icon-quanxianshezhi iconfont',
                index: '2',
                label: '权限管理',
                frontUrl: '/auth'
              },
              {
                iconClass: 'icon-chanpin iconfont',
                index: '3',
                label: '产品管理',
                frontUrl: '/product',
                children: [
                  {
                    iconClass: 'icon-biaoqian iconfontx iconfont',
                    index: '1',
                    label: '标签管理',
                    frontUrl: '/product/editTag'
                  },
                  {
                    iconClass: 'icon-shichangfenxi iconfontx iconfont',
                    index: '2',
                    label: '市场定位',
                    frontUrl: '/product/marketPosition'
                  }
                ]
              },
              {
                iconClass: 'icon-xiangmu iconfont',
                index: '4',
                label: '项目管理',
                frontUrl: '/project'
              },
              {
                iconClass: 'icon-zidianpeizhi iconfont2',
                index: '5',
                label: '字典配置',
                frontUrl: '/dict',
                children: [
                  {
                    iconClass: 'icon-zidianleixingguanli iconfontx iconfont2',
                    index: '1',
                    label: '字典类型',
                    frontUrl: '/dict/key'
                  },
                  {
                    iconClass: 'icon-icon-test  iconfontx iconfont2',
                    index: '2',
                    label: '字典类型值',
                    frontUrl: '/dict/value'
                  }
                ]
              },
              {
                iconClass: 'icon-gerenzhongxin iconfont',
                index: '6',
                label: '个人中心',
                frontUrl: '/me'
              }
            ]
          } else {
            this.navOption = [
              {
                iconClass: 'icon-chanpin iconfont',
                index: '3',
                label: '产品管理',
                frontUrl: '/product',
                children: [
                  {
                    iconClass: 'icon-biaoqian iconfontx iconfont',
                    index: '1',
                    label: '标签管理',
                    frontUrl: '/product/editTag'
                  },
                  {
                    iconClass: 'icon-shichangfenxi iconfontx iconfont',
                    index: '2',
                    label: '市场定位',
                    frontUrl: '/product/marketPosition'
                  }
                ]
              },
              {
                iconClass: 'icon-gerenzhongxin iconfont',
                index: '6',
                label: '个人中心',
                frontUrl: '/me'
              }
            ]
          }
        } catch (error) {
          this.navOption = [
            {
              iconClass: 'icon-chanpin iconfont',
              index: '3',
              label: '产品管理',
              frontUrl: '/product',
              children: [
                {
                  iconClass: 'icon-biaoqian iconfontx iconfont',
                  index: '1',
                  label: '标签管理',
                  frontUrl: '/product/editTag'
                },
                {
                  iconClass: 'icon-shichangfenxi iconfontx iconfont',
                  index: '2',
                  label: '市场定位',
                  frontUrl: '/product/marketPosition'
                }
              ]
            },
            {
              iconClass: 'icon-gerenzhongxin iconfont',
              index: '6',
              label: '个人中心',
              frontUrl: '/me'
            }
          ]
        }
      }
    }
  },
  mounted () {
    // this.getLeftBarOption()
    this.getNavOption()
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
    background: url('/staticm/img/breadcrumb-bg.png') no-repeat;
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
