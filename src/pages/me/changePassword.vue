/*
 * @Author: ChouEric
 * @Date: 2018-04-23 11:12:58
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-05-03 18:55:24
 */

<template>
  <div>
    <el-form class="myinput" ref="myinput" :model="inputData" :rules="inputRule" status-icon @validate="validateHandler">
      <el-form-item class="box" prop="oldPassword">
        <el-input type="password" class="input" placeholder="请输入原登录密码" v-model="inputData.oldPassword"></el-input>
      </el-form-item>
      <el-form-item class="box" prop="newPassword">
        <el-input type="password" class="input" placeholder="请输入新登录密码(8-16为字符)" v-model="inputData.newPassword"></el-input>
      </el-form-item>
      <el-form-item class="box" prop="confirmPassword">
        <el-input type="password" class="input" placeholder="请再次输入新登录密码" v-model="inputData.confirmPassword"></el-input>
      </el-form-item>
      <el-form-item class="box mt10">
        <el-button type="primary" @click="submitHandler('myinput')" :disabled="disabledFlag">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import meService from './service/meService'
import userAPIs from '../../api/user/userAPIs'
export default {
  data () {
    let checkPassword = (rule, val, cb) => {
      if (val.trim().length < 8 || val.trim().length > 16) {
        cb(new Error('密码长度为8-16个字符'))
      } else {
        if (val !== this.inputData.newPassword) {
          cb(new Error('两次密码输入不一致'))
        } else {
          cb()
        }
      }
    }
    return {
      breadCrumbOption: meService().getBreadCrumbOption({type: 'password'}),
      inputData: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      inputRule: {
        oldPassword: [
          {
            required: true,
            message: '请输入原登录密码',
            trigger: 'blur'
          }
        ],
        newPassword: [
          {
            required: true,
            message: '请输入新登录密码',
            trigger: 'blur'
          },
          {
            min: 8,
            max: 16,
            message: '长度在8-16个字符'
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: '请再次输入刚才输入的密码',
            trigger: 'blur'
          },
          {
            validator: checkPassword,
            trigger: ['change', 'blur']
          }
        ]
      },
      disabledFlag: true,
      oldPassword: false,
      newPassword: false,
      confirmPassword: false
    }
  },
  mounted () {
    this.resetOption()
  },
  methods: {
    submitHandler (formName) {
      this.$refs[formName].validate(async (flag, err) => {
        if (flag) {
          // alert('验证通过,可以提交表单')
          try {
            let { data } = await userAPIs.updatePwd({
              userId: sessionStorage.getItem('userId'),
              userOldPassword: this.inputData.oldPassword,
              userNewPassword: this.inputData.confirmPassword
            })
            if (data.code === 200) {
              this.$message({
                type: 'success',
                message: '修改密码成功'
              })
            } else {
              throw new Error(data.message)
            }
          } catch (error) {
            if (error) {
              this.$message({
                type: 'error',
                message: error.message
              })
            }
          }
        }
      })
    },
    validateHandler (val, item) {
      this[val] = item
      this.disabledFlag = !(this.oldPassword && this.newPassword && this.confirmPassword)
    },
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadCrumbOption,
        rightButtonOption: null
      })
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
      text-align: center
    }
    .el-button{
      padding: 12px 100px;
    }
  }
</style>
