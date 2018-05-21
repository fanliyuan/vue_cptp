<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="space-between">
        <el-col :span="2">
          <div class="logo">
          </div>
        </el-col>
        <el-col :span="10" class="head">
          产品图谱
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
        <el-form class="input_body" ref="myInput" :rules="inputRule" :model="inputData" @validate="validateHandler">
          <el-form-item prop="account" class="input_row">
            <el-input placeholder="请输入登录账号" v-model="inputData.account"></el-input>
          </el-form-item>
          <el-form-item prop="code" class="input_row">
            <el-input placeholder="请输入验证码" class="input_code" v-model="inputData.code"></el-input>
            <span class="input_button" @click="getValidateCode" :class="{pointer: !isDisabled, disabled: isDisabled}" :title="tips">获取验证码</span>
            <!-- <el-button class="input_button" @click="getValidateCode">获取验证码</el-button> -->
          </el-form-item>
         <el-form-item prop="newPassword" class="input_row">
            <el-input type="password" placeholder="请输入新密码" v-model="inputData.newPassword"></el-input>
          </el-form-item>
         <el-form-item prop="confirmPassword" class="input_row">
            <el-input type="password" placeholder="请再次输入新密码" v-model="inputData.confirmPassword"></el-input>
          </el-form-item>
          <el-form-item prop="" class="message" :title="message">
            {{message}}
          </el-form-item>
          <el-form-item class="input_row">
            <el-button type="primary" :disabled="disabledFlag" @click="submitHandler">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import userAPIs from '../../api/user/userAPIs.js'
export default {
  data () {
    let checkPassword = (rule, val, cb) => {
      if (val === this.inputData.newPassword) {
        cb()
      } else {
        cb(new Error('两次输入密码不一致'))
      }
    }
    return {
      message: '',
      disabledFlag: true,
      inputData: {
        account: '',
        code: '',
        newPassword: '',
        confirmPassword: ''
      },
      inputRule: {
        account: [
          {
            required: true,
            message: '账号不能为空',
            trigger: 'change'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          }
        ],
        newPassword: [
          {
            required: true,
            min: 8,
            max: 16,
            message: '密码为8-16个字符'
          }
        ],
        confirmPassword: [
          {
            validator: checkPassword,
            trigger: ['blur', 'change']
          }
        ]
      },
      account: false,
      code: false,
      newPassword: false,
      confirmPassword: false,
      isDisabled: true,
      tips: ''
    }
  },
  methods: {
    submitHandler () {
      this.$refs.myInput.validate().then(async flag => {
        if (flag) {
          // 这里调用接口
          try {
            let {data} = await userAPIs.forgetPwd({
              token: '',
              userName: this.inputData.account,
              userPwd: this.inputData.confirmPassword,
              validateCode: this.inputData.code
            })
            if (data.code === 200) {
              this.$message({
                type: 'success',
                message: '密码修改成功'
              })
              this.$router.push('/login')
            } else {
              this.$message({
                type: 'error',
                message: this.data.message ? this.data.message : '操作失败'
              })
            }
          } catch (error) {}
        } else {
          throw new Error('表单验证未通过')
        }
      }).catch(err => {
        if (err) console.log(err.message)
      })
    },
    validateHandler (item, res) {
      this[item] = res
      this.isDisabled = this.inputData.account.trim() === ''
      this.disabledFlag = !(this.account && this.code && this.newPassword && this.confirmPassword)
    },
    async getValidateCode () {
      if (this.isDisabled) {
        return false
      }
      if (!this.inputData.account.trim()) {
        this.$message({
          type: 'error',
          message: '账号不能为空'
        })
        return false
      }
      this.isDisabled = true
      try {
        let {data} = await userAPIs.getValidateCode({token: '', userName: this.inputData.account})
        if (data.code === 200) {
          this.$message({
            type: 'success',
            message: '验证码发送成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: data.message ? data.message : '操作失败'
          })
        }
      } catch (error) {}
      setTimeout(() => {
        this.isDisabled = false
      }, 10000)

      // clearInterval(timer)
      // let time = 0
      // let timer = setInterval(() => {
      //   this.isDisabled = true
      //   if (time < 10) {
      //     this.tips = '请' + (10 - time) + '秒之后再试'
      //     time ++
      //   } else {
      //     this.tips = ''
      //     this.isDisabled = false
      //   }
      // }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
.el-container{
  background: url('/staticm/img/login_bg.jpg');
  height: 100%;
  .logo{
    margin-top: 20px;
    background: url('/staticm/img/login_logo.png');
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
    background-image: url('/staticm/img/login_input.png');
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
      .el-button{
        padding: 12px 150px;
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
  .disabled {
    cursor: no-drop !important;
  }
  .pointer {
    cursor: pointer !important;
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
