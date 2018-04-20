<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="space-between">
        <el-col :span="2">
          <div class="logo">
          </div>
        </el-col>
        <el-col :span="10" class="head">
          产品资源全景浏览器
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="input mylogininput">
        <div class="input_header">
          找回密码
        </div>
        <router-link :to="'/login'" class="login">
          返回登录
        </router-link>
        <div class="input_body">
          <div class="input_row">
            <el-input placeholder="请输入登录账号"></el-input>
          </div>
          <div class="input_row">
            <el-input placeholder="请输入验证码" class="input_code"></el-input>
            <span class="input_button">获取验证码</span>
          </div>
         <div class="input_row">
            <el-input placeholder="请输入新密码"></el-input>
          </div>
         <div class="input_row">
            <el-input placeholder="请再次输入新密码"></el-input>
          </div>
          <div class="message" :title="message">
            {{message}}
          </div>
          <div class="input_row">
            <el-button class="button">立即登录</el-button>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      message: ''
    }
  }
}
</script>
<style lang="less" scoped>
.el-container{
  background: url('/static/img/login_bg.jpg');
  height: 100%;
  .logo{
    margin-top: 20px;
    background: url('/static/img/login_logo.png');
    width: 181px;
    height: 53px;
  }
  .head{
    text-align: right;
    font-size: 36px;
    color: white;
    line-height: 73px;
  }
  .input{
    width: 942px;
    height: 551px;
    background-image: url('/static/img/login_input.png');
    position: relative;
    margin: 183px auto 0;
    .login{
      position: absolute;
      right: 72px;
      top: 118px;
      color: #113d61;
      cursor: pointer;
      font-size: 14px;
    }
    .input_header{
      text-align: center;
      color: #113d61;
      font-size: 24px;
      height: 80px;
      line-height: 80px;
    }
    .input_body{
      margin-top: 64px;
      float: right;
      margin-right: 72px;
      width: 329px;
      .input_row{
        margin-bottom: 15px;
      }
      .el-input {
        .el-input__inner{
          background: #e2e2e2;
        }
      }
      .el-checkbox{
        display: inline-block;
        width: 49%;
      }
      .input_code{
        width: 65%;
        padding-right: 20px;
      }
      .input_button{
        font-size: 14px;
        color: #409efb;
        cursor: pointer;
      }
      .button{
        height: 40px;
        line-height: 40px;
        width: 329px;
        color: white;
        background: #409efb;
        padding: 0;
      }
      .message{
        margin-bottom: 30px;
        color: tomato;
        font-size: 14px;
        height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
<style lang="less">
  .mylogininput{
    .el-input__inner{
      background: #e2e2e2;
    }
  }
</style>
