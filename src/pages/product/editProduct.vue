<template>
  <div>
    <BreadCrumb :options="breadCrumbOption" class="mybreadcrumb" />
    <div class="myinput">
      <!-- <div class="box">
        <div class="label">角色</div>
        <el-select v-model="authInfo.role" placeholder="请选择角色" class="input">
          <el-option :key="0" :value="0" :label="'普通用户'"></el-option>
          <el-option :key="1" :value="1" :label="'管理员'"></el-option>
          <el-option :key="2" :value="2" :label="'超级管理员'"></el-option>
        </el-select>
      </div> -->
      <div class="box">
        <div style="margin-left:105px;">
          <!-- 这里该用循环,自动生成 -->
          <el-radio v-model="productInfo.dps" label="0">DASS</el-radio>
          <el-radio v-model="productInfo.dps" label="1">PASS</el-radio>
          <el-radio v-model="productInfo.dps" label="2">SASS</el-radio>
        </div>
      </div>
      <div class="box">
        <div class="label">所属类型</div>
        <el-select v-model="productInfo.classNameOne" class="input">
          <!-- 这里该用循环,自动生成 -->
          <el-option label="大类1" value="0"></el-option>
          <el-option label="大类2" value="1"></el-option>
          <el-option label="大类3" value="2"></el-option>
        </el-select>
      </div>
      <div class="box">
        <div class="label"></div>
        <el-select v-model="productInfo.classNameTwo" class="input">
          <el-option label="小类1" value="0"></el-option>
          <el-option label="小类2" value="1"></el-option>
          <el-option label="小类3" value="2"></el-option>
        </el-select>
      </div>
      <div class="box">
        <div class="label">产品名称</div>
        <el-input v-model="productInfo.productName" placeholder="请输入产品名称" class="input"></el-input>
      </div>
      <div class="box">
        <div class="label">产品经理</div>
        <el-autocomplete
          class="input"
          v-model="productInfo.productManager"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
        >
        </el-autocomplete>
      </div>
      <div class="box">
        <div class="label">产品状态</div>
        <div class="input">
          <el-radio v-model="productInfo.state" label="0">预立项</el-radio>
          <el-radio v-model="productInfo.state" label="1">开发阶段</el-radio>
          <el-radio v-model="productInfo.state" label="2">可销售</el-radio>
        </div>
      </div>
      <div>
        <el-button type="primary" class="submit" @click="submitHandler">提交</el-button>
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
      breadCrumbOption: {},
      productInfo: {dps: ''},
      productManagerList: []
    }
  },
  watch: {
    $route () {
      if (this.$route.params && this.$route.params.productId) {
        this.breadCrumbOption = {
          bread: [
            {
              label: '产品管理',
              path: '/product'
            },
            {
              label: '产品修改'
            }
          ]
        }
      } else {
        this.breadCrumbOption = {
          bread: [
            {
              label: '产品管理',
              path: '/product'
            },
            {
              label: '产品添加'
            }
          ]
        }
      }
    }
  },
  mounted () {
    if (this.$route.params && this.$route.params.productId) {
      this.breadCrumbOption = {
        bread: [
          {
            label: '产品管理',
            path: '/product'
          },
          {
            label: '产品修改'
          }
        ]
      }
      this.productInfo = JSON.parse(sessionStorage.getItem('productInfo'))
      this.productInfo.productName = JSON.parse(sessionStorage.getItem('productInfo')).productName[0].textProp
    } else {
      this.breadCrumbOption = {
        bread: [
          {
            label: '产品管理',
            path: '/product'
          },
          {
            label: '产品添加'
          }
        ]
      }
    }
    this.productManagerList = this.loadProductManagerList()
  },
  methods: {
    querySearch (queryString, cb) {
      let productManagerList = this.productManagerList
      let results = queryString ? productManagerList.filter(this.createFilter(queryString)) : productManagerList
      cb(results)
    },
    createFilter (queryString) {
      return (productManagerList) => {
        return (productManagerList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadProductManagerList () {
      // 这里是假数据,需要所有产品经理的数据
      return [
        {
          value: '张三',
          userId: 0
        },
        {
          value: '李四',
          userId: 1
        }
      ]
    },
    submitHandler () {
      // 调用接口,新增编辑接口
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
      display: inline-block;
    }
    .submit{
      margin-left: 200px;
      margin-top: 20px;
      padding: 10px 78px;
    }
  }
</style>
