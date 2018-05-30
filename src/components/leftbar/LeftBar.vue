/**
* 作者 ：zn
*
* 日期 ：2017/12/08
*
* 描述 ：公共左侧菜单组件
*/
<template>
  <el-menu  class="el-menu-vertical-demo" background-color="#364863" text-color="#fff" active-text-color="#364863" style="border:none;" @open="selectHandler">
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
  },
  methods: {
    selectHandler (index, path) {
    }
  }
}
</script>
<style lang="less">
</style>
