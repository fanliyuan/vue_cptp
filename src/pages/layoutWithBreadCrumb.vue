/*
*  @Author: ChouEric 
*  @Date: 2018-04-23 16:28:23 
*  @Last Modified by:   ChouEric 
*  @Last Modified time: 2018-04-23 16:28:23 
*/
<template>
  <div>
    <BreadCrumb :options="options.breadCrumbOption"/>
    <RightButton options="options.rightButtonOption"/>
  </div>
</template>
<script>
import BreadCrumb from '../components/breadcrumb/BreadCrumb'
import RightButton from '../components/rightbutton/RightButton'
export default {
  components: {
    BreadCrumb,
    RightButton
  },
  props: ['options']
}
</script>
