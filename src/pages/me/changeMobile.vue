<template>
  <div>
    <BreadCrumb :options="breadCrumbOption" class="mybreadcrumb" />
    <div class="myinput">
      <div class="box">
        <el-input class="input" placeholder="请输入原手机号"></el-input>
      </div>
      <div class="box">
        <el-input class="input short" placeholder="验证码"></el-input>
        <div class="input button">获取验证码</div>
      </div>
      <div class="box">
        <el-input class="input" placeholder="请输入新手机号"></el-input>
      </div>
      <div class="box">
        <el-input class="input" placeholder="请再次输入新手机号"></el-input>
      </div>
      <div class="box mt10">
        <span class="submit">确认</span>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from '../../components/breadcrumb/BreadCrumb'
import meService from './service/meService'
export default {
  components: {
    BreadCrumb
  },
  data () {
    return {
      breadCrumbOption: meService().getBreadCrumbOption({type: 'mobile'})
    }
  }
}
</script>
<style lang="less" scoped>
 .myinput {
    width: 560px;
    height: auto;
    background: white;
    box-shadow: 1px 0px 1px 1px #999;
    border-radius: 5px;
    margin-left: 50%;
    position: relative;
    left: -200px;
    margin-top: 50px;
    font-size: 16px;
    box-sizing: border-box;
    padding: 80px 0px 40px;
    .box{
      height: 62px;
      width: 300px;
      margin: 0 auto;
      .input{
        display: inline-block;
      }
      .short{
        width: 180px;
        margin-left: 0px;
        margin-right: 20px;
      }
      .button{
        color: violet;
        cursor: pointer;
      }
    }
    .submit{
      color: white;
      background: violet;
      padding: 10px 80px;
      border-radius: 5px;
      cursor: pointer;
      display: block;
      box-sizing: border-box;
      width: 200px;
      margin: 0 auto;
    }
    .mt10{
      margin-top: 20px;
    }
  }
</style>
