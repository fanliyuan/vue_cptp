<template>
  <div class="myrightbutton">
    <el-button  v-for="(item, index) in options" :key="index" :type="type[index]" class="mybutton" @click="buttonHandler(item)">
      {{item.label}}
    </el-button>
  </div>
</template>
<script>
export default {
  props: ['options'],
  data () {
    return {
      type: ['success', 'primary', 'warning']
    }
  },
  methods: {
    buttonHandler (item) {
      item.fun && item.fun()
    }
  }
}
</script>
<style lang="less" scoped>
.myrightbutton{
  position: absolute;
  right: 35px;
  top: -52px;
 .mybutton{
  float: right;
  margin-left: 40px;
  }
}
</style>
