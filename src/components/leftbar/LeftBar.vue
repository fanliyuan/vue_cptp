/**
* 作者 ：zn
*
* 日期 ：2017/12/08
*
* 描述 ：公共左侧菜单组件
*/
<template>
  <el-menu  class="el-menu-vertical-demo" background-color="#364863" text-color="#fff" active-text-color="#364863" style="border:none;">
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
		background: #364863 !important;
		overflow: hidden;
		a{
			color: #fff;
			font-size: 16px;
		}
		.el-menu-item.is-active{
			background:#f2f2f2 !important;
			a{
				color: #364863 !important;
			}
		}
		.el-menu-item{
			a{
				display: block;
			}
		}
	}
</style>
