/*
 * @Author: ChouEric
 * @Date: 2018-04-23 11:09:39
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-05-08 10:07:10
 */

<template>
  <div>
    <el-form class="myinput" ref="myInput" label-width='85px' :rules="inputRule" :model="inputData" @validate="validateHandler">
      <el-form-item class="box" prop="oldMobile" label="原手机号">
        <el-input class="input" v-model.number="inputData.oldMobile" placeholder="请输入原手机号"></el-input>
      </el-form-item>
      <!-- 这里需要获取验证码 -->
      <!-- <el-form-item class="box" prop="code">
        <el-input class="input short" v-model="inputData.code" placeholder="验证码"></el-input>
        <el-form-item class="input button">获取验证码</el-form-item>
      </el-form-item> -->
      <el-form-item class="box" prop="newMobile" label="新手机号">
        <el-input class="input" v-model.number="inputData.newMobile" placeholder="请输入新手机号"></el-input>
      </el-form-item>
      <el-form-item class="box" prop="confirmMobile" label="确认手机号">
        <el-input class="input" v-model.number="inputData.confirmMobile" placeholder="请再次输入新手机号"></el-input>
      </el-form-item>
      <el-form-item class="box mt10">
        <el-button type="primary" :disabled="disabledFlag" @click="submitHandler">确认</el-button>
        <!--<el-button type="warning" @click="submitHandler">关闭</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import meService from './service/meService'
import userAPIs from '../../api/user/userAPIs'
export default {
  data () {
    let mobileCheck = (rule, val, cb) => {
      // 手机号正则
      let reg = /^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(18[0,5-9])|17[5,9])\d{8}$/
      if (val.toString().length !== 11) {
        cb(new Error('请输入正确的手机号'))
      } else {
        if (reg.test(val)) {
          cb()
        } else {
          // 正则规则打印
          console.log(reg.toString() + '这是手机号正则验证规则')
          cb(new Error('请输入正确的手机号'))
        }
      }
    }
    let mobileConfirm = (rule, val, cb) => {
      if (val !== this.inputData.newMobile) {
        cb(new Error('两次手机号输入不一致'))
      } else {
        cb()
      }
    }
    return {
      breadCrumbOption: meService().getBreadCrumbOption({type: 'mobile'}),
      inputData: {
        oldMobile: '',
        // code: '',
        newMobile: '',
        confirmMobile: ''
      },
      disabledFlag: true,
      inputRule: {
        oldMobile: [
          {
            required: true,
            type: 'number',
            message: '请输入正确的手机号',
            trigger: 'blur'
          },
          {
            validator: mobileCheck,
            trigger: 'blur'
          }
        ],
        // code: [
        //   {
        //     required: true,
        //     message: '请输入验证码'
        //   }
        // ],
        newMobile: [
          {
            required: true,
            type: 'number',
            message: '请输入正确的手机号',
            trigger: 'blur'
          },
          {
            validator: mobileCheck,
            trigger: 'blur'
          }
        ],
        confirmMobile: [
          {
            validator: mobileConfirm,
            trigger: 'change'
          }
        ]
      },
      oldMobile: false,
      // code: false,
      newMobile: false,
      confirmMobile: false
    }
  },
  methods: {
    validateHandler (item, res) {
      this[item] = res
      this.disabledFlag = !(this.oldMobile && this.newMobile && this.confirmMobile)
    },
    submitHandler () {
      this.$refs.myInput.validate().then(async (data) => {
        if (data) {
          // 这里调用接口
          try {
            let {data} = await userAPIs.updatePhone({
              userId: sessionStorage.getItem('userId'),
              userPhone: this.inputData.confirmMobile
            })
            if (data.code === 200) {
              this.$message({
                type: 'success',
                message: '手机号修改成功'
              })
            }
          } catch (error) {
            this.$message({
              type: 'error',
              message: '操作失败'
            })
          }
          this.$router.push('/me')
        } else {
          throw new Error('表单验证未通过')
        }
      }).catch(err => {
        if (err) console.log(err.message)
      })
    },
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadCrumbOption,
        rightButtonOption: null
      })
    }
  },
  mounted () {
    this.resetOption()
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
      padding: 12px 95px;
    }
  }
</style>
