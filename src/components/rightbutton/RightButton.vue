<template>
  <div class="myrightbutton">
    <el-button  v-for="(item, index) in options" :key="index" :type="type[index]" class="mybutton" @click="buttonHandler(item)" :disabled="item.isDisabled">
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
      item.fun && item.fun(item)
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
    &.el-button--success {
      color: #fff;
      background-color: #fea43a;
      border-color: #fea43a;
      &:hover{
        background-color: #85ce61;
        border-color: #85ce61;
      }
    }
    &.el-button--primary {
      color: #fff;
      background-color: #00c0ff;
      border-color: #00c0ff;
      &:hover{
        background-color: #66b1ff;
        border-color: #66b1ff;
      }
    }
    &.el-button--warning {
      color: #fff;
      background-color: #3cc96a;
      border-color: #3cc96a;
      &:hover{
        background-color: #ebb563;
        border-color: #ebb563;
      }
    }
  }
}
</style>
