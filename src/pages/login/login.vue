/*
 * @Author: ChouEric
 * @Date: 2018-04-23 11:14:45
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-05-02 15:34:52
 */
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
      <el-form class="input mylogininput" ref="myInput" :model="inputData" :rules="inputRule" @validate="validateHandler">
        <div class="input_header">
          管理员登录
        </div>
        <el-form-item class="input_body">
          <el-form-item class="input_row" prop="userName">
            <el-input v-model="inputData.userName" placeholder="请输入登录账号"></el-input>
          </el-form-item>
          <el-form-item class="input_row" prop="password">
            <el-input type="password" v-model="inputData.password" placeholder="请输入登录密码"></el-input>
          </el-form-item>
          <el-form-item class="input_row code" prop="code">
            <el-input v-model="inputData.code" placeholder="请输入验证码" class="input_code" @keypress.enter.native="submitHandler"></el-input>
            <img class="input_image" :src="codeImage" alt="无法登录">
            <span class="input_refresh" @click="getCodeImage"></span>
          </el-form-item>
          <el-form-item class="input_row">
            <el-checkbox v-model="rememberFlag">记住账号</el-checkbox>
            <router-link :to="'/forget'" class="forget">忘记密码?</router-link>
          </el-form-item>
          <el-form-item class="message" :title="message">
            {{message}}
          </el-form-item>
          <el-form-item class="input_row">
            <el-button type="primary" :disabled="disabledFlag" @click="submitHandler">立即登录</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
import userAPIs from '../../api/user/userAPIs'
export default {
  data () {
    let codeCheck = (rule, val, cb) => {
      // 这里验证后台的验证码,用来比对
      if (val !== this.codeValue || val === '') {
        cb(new Error('验证码不正确'))
      } else {
        cb()
      }
    }
    return {
      message: '',
      inputData: {
        userName: '',
        password: '',
        email: '',
        code: ''
      },
      disabledFlag: true,
      inputRule: {
        userName: [
          {
            required: true,
            message: '账号不能为空'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空'
          }
        ],
        code: [
          {
            validator: codeCheck,
            trigger: ['change', 'blur']
          }
        ]
      },
      userName: false,
      password: false,
      code: false,
      rememberFlag: false,
      codeValue: '',
      codeImage: ''
    }
  },
  methods: {
    validateHandler (item, res) {
      this[item] = res
      this.disabledFlag = !(this.userName && this.password && this.code)
    },
    async submitHandler () {
      this.$refs.myInput.validate().then(data => {
        if (data) {
          // 是否记住账号
          if (this.rememberFlag) {
            localStorage.setItem('rememberName', this.inputData.userName)
          } else {
            localStorage.removeItem('rememberName')
          }
          // 这里调用接口
          // let { data } = await userAPIs.login({userName: this.inputData.userName, userPassword: this.inputData.password})
          // console.log(data)
          localStorage.removeItem('token')
          if (this.inputData.userName.indexOf('@') === -1) {
            this.inputData.email = ''
          } else {
            this.inputData.email = this.inputData.userName
            this.inputData.userName = ''
          }
          userAPIs.login({userName: this.inputData.userName, userPassword: this.inputData.password, email: this.inputData.email})
            .then(data => {
              if (data.data && data.data.code === 200) {
                this.message = null
                localStorage.setItem('token', data.data.data.userToken)
                localStorage.setItem('userName', data.data.data.userName)
                this.$router.push('/')
              } else {
                this.getCodeImage()
                this.codeValue = ''
                // this.message = data.data.message
                if (data.data.message !== '登录成功') {
                  this.message = '用户名或密码错误'
                }
              }
            })
        } else {
          throw new Error('表单验证未通过')
        }
      }).catch(err => {
        this.message = err.message
      })
    },
    async getCodeImage () {
      try {
        let { data } = await userAPIs.getCodeImage({token: ''})
        this.codeImage = 'data:image/jpeg;base64,' + data.data.img
        this.codeValue = data.data.code
      } catch (error) {
      }
    }
  },
  watch: {
    rememberFlag () {
      if (this.rememberFlag) {
        localStorage.setItem('rememberName', this.inputData.userName)
      } else {
        localStorage.removeItem('rememberName')
      }
    }
  },
  mounted () {
    if (localStorage && localStorage.rememberName) {
      this.inputData.userName = localStorage.rememberName
      this.rememberFlag = true
    } else {
      this.rememberFlag = false
    }
    this.getCodeImage()
  }
}
</script>
<style lang="less" scoped>
.el-container{
  background: url('../../asets/img/login_bg.jpg') no-repeat;
  height: 100%;
  .logo{
    margin-top: 20px;
    background: url('../../asets/img/login_logo.png');
    width: 181px;
    height: 53px;
  }
  .el-header{
    background: none;
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
    background-image: url('../../asets/img/login_input.png');
    position: relative;
    margin: 183px auto 0;
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
        margin-bottom: 25px;
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
        width: 55%;
        padding-right: 20px;
      }
      .input_image{
        width: 82px;
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
      .input_refresh{
        display: inline-block;
        margin-left: 10px;
        width: 16px;
        height: 18px;
        vertical-align: middle;
        cursor: pointer;
        background: url('../../asets/img/login_refresh.png')
      }
      .forget{
        display: inline-block;
        width: 49%;
        color: rgb(96, 98, 102);
        cursor: pointer;
        font-size: 14px;
      }
      .el-button{
        padding: 12px 136px !important;
      }
      .message{
        color: tomato;
        font-size: 14px;
        height: 40px;
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
