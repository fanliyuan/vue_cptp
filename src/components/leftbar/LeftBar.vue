/**
* 作者 ：zn
*
* 日期 ：2017/12/08
*
* 描述 ：公共左侧菜单组件
*/
<template>
  <el-menu  class="el-menu-vertical-demo" background-color="#464955" text-color="#fff" active-text-color="#ffd04b" style="border:none;">
    <div v-for="item in options.data" :key="item.index">
      <MItems :item='item' :indexp="item.value"></MItems>
    </div>
  </el-menu>
</template>
<script>

import MItems from './LeftBarChild'

export default {
  name: 'LeftBar',
  props: ['options'],
  components: {
    MItems
  }
}
</script>
<style lang="less">
	.el-aside{
		background: #464955 !important;
		overflow: hidden;
		a{
			color: #fff;
		}
		.el-menu-item.is-active{
			background:#52b3a6 !important;
		}
		.el-menu-item{
			a{
				display: block;
			}
		}
	}
</style>
