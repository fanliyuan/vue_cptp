<template>
  <div>
    <BreadCrumb :options="breadCrumbOption" class="mybreadcrumb" />
    <div class="myinput myheight">
      <div class="box">
        <div class="label">项目名称</div>
        <el-input class="input" v-if="projectInfo.oldName" v-model="projectInfo.oldName" readonly></el-input>
        <el-input class="input" v-else v-model="projectInfo.projectName"></el-input>
      </div>
      <div class="box">
        <div class="label">立项部门</div>
        <el-input class="input" v-model="projectInfo.department"></el-input>
      </div>
      <div class="box">
        <div class="label">负责人</div>
        <el-input class="input" v-model="projectInfo.manager"></el-input>
      </div>
      <div class="box auto">
        <div class="label">涉及产品</div>
          <div v-if="projectInfo.products && projectInfo.products instanceof Array" class="inline-block">
            <div class="products" :class="{wrap: index !== 0}" v-if="projectInfo.products" v-for="(item, index) in projectInfo.products" :key="item.productId">
              <span class="product-name" :title="item.productName">{{item.productName}}</span>
              <span class="click" @click="delHandler(item, index)">删除</span>
              <span class="click" v-if="index === 0" @click="addHandler">添加</span>
            </div>
          </div>
          <div v-else class="name">
            <span>暂无产品</span>
            <span @click="addHandler" class="fr">添加</span>
          </div>
          <div class="name select" v-if="showInfo.firstShow">
            <el-input class="input" v-model="classInfo.firstClass"></el-input>
          </div>
          <div class="name select" v-if="showInfo.secondShow">
            <el-input class="input" v-model="classInfo.secondClass"></el-input>
          </div>
          <div class="name select"  v-if="showInfo.thirdShow">
            <el-input class="input" v-model="classInfo.thirdClass"></el-input>
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
import editProjectService from './service/editProjectService'
export default {
  components: {
    BreadCrumb
  },
  data () {
    return {
      breadCrumbOption: {},
      projectInfo: {
        oldName: '111',
        products: [
          {
            productId: 1,
            productName: '产品产品产品产品产品产品产品1111'
          },
          {
            productId: 2,
            productName: '产品2'
          }
        ]
      },
      classInfo: {},
      showInfo: {firstShow: false, secondShow: false, thirdShow: false}
    }
  },
  mounted () {
    if (this.$route.params && this.$route.params.projectId) {
      this.breadCrumbOption = editProjectService().getBreadCrumbOption({projectId: this.$route.params.projectId})
      this.projectInfo = JSON.parse(sessionStorage.getItem('projectInfo'))
    } else {
      this.breadCrumbOption = editProjectService().getBreadCrumbOption()
    }
  },
  watch: {
    $route () {
      if (this.$route.params && this.$route.params.projectId) {
        this.breadCrumbOption = editProjectService().getBreadCrumbOption({projectId: this.$route.params.projectId})
      } else {
        this.breadCrumbOption = editProjectService().getBreadCrumbOption()
      }
    }
  },
  methods: {
    submitHandler () {
      // 这里调用提交接口
      console.log('修改提交')
    },
    delHandler (item, index) {
      // console.log(item)
      this.projectInfo.products.splice(index, 1)
      if (this.projectInfo.products.length === 0) {
        this.projectInfo.products = null
      }
    },
    addHandler () {
      // console.log('添加产品')
      this.showInfo.firstShow = true
      // 接下来需要获取类别
    }
  }
}
</script>
<style lang="less" scoped>
  .myheight{
    height: auto ! important;
    max-height: 630px;
    overflow: auto;
  }
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
      vertical-align: top;
    }
    .silver{
      color: silver;
    }
    .name{
      padding-left: 20px;
      display: inline-block;
      width: 310px;
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
    .products{
      display: inline-block;
      padding-left: 20px;
      margin-bottom: 10px;
    }
    .inline-block{
      display: inline-block;
    }
    .wrap{
      display: block;
    }
    .product-name{
      width: 224px;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .click{
      cursor: pointer;
      color: violet;
    }
    .select{
      margin-left: 156px;
      margin-top: 10px;
    }
    .auto{
      height: auto;
    }
    .fr{
      float: right;
      padding-right: 8px;
    }
  }
</style>
