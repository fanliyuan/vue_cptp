<template>
  <div>
    <BreadCrumb :options="breadCrumbOptions" class="mybreadcrumb" />
    <div class="myinput">
      <div class="box">
        <div class="label">用户名</div>
        <div class="silver username">{{authInfo.userName || '未知用户'}}</div>
      </div>
      <div class="box">
        <div class="label">角色</div>
        <!-- <el-input class="input" v-model="authInfo.role"></el-input> -->
        <el-select v-model="authInfo.role" placeholder="请选择角色" class="input">
          <el-option :key="0" :value="0" :label="'普通用户'"></el-option>
          <el-option :key="1" :value="1" :label="'管理员'"></el-option>
          <el-option :key="2" :value="2" :label="'超级管理员'"></el-option>
        </el-select>
      </div>
      <div class="box">
        <div class="label">职位类型</div>
        <!-- <el-input class="input" v-model="authInfo.positionClass"></el-input>
         -->
        <el-select v-model="authInfo.positionClass" placeholder="请选择职位类型" class="input">
          <el-option :key="0" :value="0" :label="'普通用户'"></el-option>
          <el-option :key="1" :value="1" :label="'项目组成员'"></el-option>
        </el-select>
      </div>
      <div class="box">
        <div class="label">职位</div>
        <!-- <el-input class="input" v-model="authInfo.position"></el-input> -->
        <el-select v-model="authInfo.position" placeholder="请选择职位" class="input">
          <el-option :key="0" :value="0" :label="'UI'"></el-option>
          <el-option :key="1" :value="1" :label="'UE'"></el-option>
        </el-select>
      </div>
      <div class="box">
        <div class="label">权限</div>
        <el-checkbox-group v-model="authInfo.authList" class="input" style="display: inline-block">
          <el-checkbox label="查看"></el-checkbox>
          <el-checkbox label="下载"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <el-button type="primary" class="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from '../../components/breadcrumb/BreadCrumb'
export default {
  components: {
    BreadCrumb
  },
  data () {
    return {
      breadCrumbOptions: {bread: [{label: '权限管理', path: '/auth'}, {label: '编辑权限'}]},
      authInfo: {
        authList: []
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .myinput {
    width: 560px;
    height: 630px;
    background: white;
    box-shadow: 1px 0px 1px 1px #999;
    border-radius: 5px;
    margin-left: 50%;
    position: relative;
    left: -200px;
    margin-top: 50px;
    font-size: 16px;
    box-sizing: border-box;
    padding: 80px 0px;
    .box{
      height: 62px;
    }
    .label {
      width: 170px;
      display: inline-block;
      text-align: right;
    }
    .silver{
      color: silver;
    }
    .username{
      padding: 20px;
      display: inline-block;
    }
    .input{
      width: 310px;
      margin-left: 10px;
    }
    .submit{
      margin-left: 200px;
      margin-top: 20px;
      padding: 10px 78px;
    }
  }
</style>
