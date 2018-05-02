<template>
  <div>
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
            <span @click="addHandler" class="fr click">添加</span>
          </div>
          <!--
            <div class="box" v-if="twoFlag">
              <div class="label">所属类型</div>
              <el-select v-model="productInfo.twoLevel" class="input" @change="twoLevelChange">
                <el-option v-for="item in twoList" :key="item.subId" :label="item.levelName" :value="item.subId + ''"></el-option>
              </el-select>
            </div>
           -->
          <div class="name select" v-if="showInfo.oneShow">
            <el-select class="input" v-model="classInfo.oneClass" @change="productSelcet('one', classInfo.oneClass)">
              <el-option v-for="item in oneList" :key="item.levelId" :label="item.levelName" :value="item.levelId + ''"></el-option>
            </el-select>
          </div>
          <div class="name select" v-if="twoList.length > 0">
            <el-select class="input" v-model="classInfo.twoClass" @change="productSelcet('two' ,classInfo.twoClass)">
              <el-option v-for="item in twoList" :key="item.levelId" :label="item.levelName" :value="item.levelId + ''"></el-option>
            </el-select>
          </div>
          <!-- <div class="name select"  v-if="threeList.length > 0">
            <el-select class="input" v-model="classInfo.threeClass" @change="productSelcet('three',classInfo.threeClass)">
              <el-option v-for="item in threeList" :key="item.levelId" :label="item.levelName" :value="item.levelId + ''"></el-option>
            </el-select>
          </div>
          <div class="name select"  v-if="fourList.length > 0">
            <el-select class="input" v-model="classInfo.fourClass" @change="productSelcet('four', classInfo.fourClass)">
              <el-option v-for="item in fourList" :key="item.productId" :label="item.productName" :value="item.productId + ''"></el-option>
            </el-select>
          </div> -->
      </div>
      <div>
        <el-button type="primary" class="submit" @click="submitHandler">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import editProjectService from './service/editProjectService'
import dicAPIs from '../../api/dic/dicAPIs'
import projectAPIs from '../../api/project/projectAPIs'
export default {
  data () {
    return {
      breadCrumbOption: {},
      projectInfo: {
        oldName: '',
        projectName: '',
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
      classInfo: {oneClass: '', twoClass: '', threeClass: '', fourClass: ''},
      showInfo: {oneShow: false, twoShow: false, threeShow: false, fourShow: false},
      oneList: [
        {
          levelName: 'DAAS',
          levelId: '0'
        },
        {
          levelName: 'PAAS',
          levelId: '1'
        },
        {
          levelName: 'SAAS',
          levelId: '2'
        }
      ],
      twoList: [],
      threeList: [],
      fourList: [],
      params: {
        oneLevel: 0,
        twoLevel: 0,
        threeLevel: 0
      }
    }
  },
  mounted () {
    if (this.$route.params && this.$route.params.projectId) {
      this.breadCrumbOption = editProjectService().getBreadCrumbOption({projectId: this.$route.params.projectId})
      this.projectInfo = JSON.parse(sessionStorage.getItem('projectInfo'))
    } else {
      this.breadCrumbOption = editProjectService().getBreadCrumbOption()
    }
    this.resetOption()
  },
  watch: {
    $route () {
      if (this.$route.params && this.$route.params.projectId) {
        this.breadCrumbOption = editProjectService().getBreadCrumbOption({projectId: this.$route.params.projectId})
      } else {
        this.breadCrumbOption = editProjectService().getBreadCrumbOption()
      }
      this.resetOption()
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
      this.showInfo.oneShow = true
      console.log(dicAPIs)
      // 接下来需要获取类别
    },
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadCrumbOption,
        rightButtonOption: this.rightButtonOption
      })
    },
    productSelcet (flag, val) {
      switch (flag) {
        case 'one':
          // 执行第一类
          if (val === '0') {
            this.twoList = []
            this.threeList = []
            this.getProductList()
          } else {
            this.fourList = []
            this.getProdutLevelList(val)
          }
          break
        case 'two':
          // 执行函数二
          this.getProdutLevelList(val)
          break
        case 'three':
          // 执行函数三
          break
        case 'four':
          // 执行函数四
          break
        default:
          // 执行默认函数
          break
      }
    },
    async getProdutLevelList (val) {
      try {
        let { data } = await projectAPIs.getProdutLevelList({parentId: +val})
        if (val === '1' || val === '2') {
          this.twoList = data.data
        } else {
          this.threeList = data.data
        }
      } catch (error) {}
    },
    async getProductList () {
      try {
        let {oneLevel, twoLevel, threeLevel} = this.params
        let {data} = await projectAPIs.getProductList({oneLevel, twoLevel, threeLevel})
        // console.log(data)
        this.fourList = data.data
      } catch (error) {}
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
