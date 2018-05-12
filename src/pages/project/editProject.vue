<template>
  <div>
    <div class="myinput myheight">
      <div class="box">
        <div class="label">项目名称</div>
        <el-input class="input" v-if="projectInfo.projectName" v-model="projectInfo.projectName" readonly></el-input>
        <el-input class="input" v-else v-model="projectInfo.newName"></el-input>
      </div>
      <!-- <div class="box">
        <div class="label">立项部门</div>
        <el-input class="input" v-model="projectInfo.deptName"></el-input>
      </div> -->
      <div class="box">
        <div class="label">立项部门</div>
        <el-select class="input" v-model="projectInfo.deptId" placeholder="请选择" >
          <el-option
            v-for="deptInfo in deptList"
            :key="deptInfo.id"
            :label="deptInfo.dictDesc"
            :value="deptInfo.dictIndex"
          >
          </el-option>
        </el-select>
      </div>
      <!-- <div class="box">
        <div class="label">负责人</div>
        <el-input class="input" v-model="projectInfo.projectLeader"></el-input>
      </div> -->
       <div class="box">
        <div class="label">负责人</div>
        <el-select class="input" v-model="projectInfo.leaderId" placeholder="请选择" >
          <el-option
            v-for="deptInfo in leaderList"
            :key="deptInfo.id"
            :label="deptInfo.dictDesc"
            :value="deptInfo.dictIndex"
          >
          </el-option>
        </el-select>
      </div>
      <div class="box auto">
        <div class="label">涉及产品</div>
          <div v-if="projectInfo.products && projectInfo.products.length" class="inline-block">
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
                <el-option v-for="(item, index) in oneList" :key="item.levelId" :label="item.levelName" :value="index + '-' + item.levelId"></el-option>
              </el-select>
            </div>
            <div class="name select" v-if="twoList.length > 0">
              <el-select class="input" v-model="classInfo.twoClass" @change="productSelcet('two' ,classInfo.twoClass)">
                <el-option v-for="(item, index) in twoList" :key="item.levelId" :label="item.levelName" :value="index + '-' + item.levelId"></el-option>
              </el-select>
            </div>
            <div class="name select"  v-if="threeList.length > 0">
              <el-select class="input" v-model="classInfo.threeClass" @change="productSelcet('three',classInfo.threeClass)">
                <el-option v-for="(item, index) in threeList" :key="item.levelId" :label="item.levelName" :value="index + '-' + item.levelId"></el-option>
              </el-select>
            </div>
            <div class="name select"  v-if="fourList.length > 0">
              <el-select class="input" v-model="classInfo.fourClass" @change="productSelcet('four', classInfo.fourClass)">
                <el-option v-for="(item, index) in fourList" :key="item.productId" :label="item.productName" :value="index + '-' + item.productId"></el-option>
              </el-select>
              <div style="margin-top:10px;margin-left:20px;">
                <el-button @click="sureSubmit" size="medium" type="warning">确定</el-button><el-button @click="cancelSubmit" size="medium" type="text">取消</el-button>
              </div>
            </div>
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
      deptList: [],
      ids: '',
      leaderList: [],
      projectInfo: {
        newName: '',
        projectName: '',
        deptId: null,
        deptName: '',
        productIds: '',
        products: [
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
      let zancun = []
      if (this.projectInfo.products) {
        this.projectInfo.products.forEach(item => {
          zancun.push(item.productId)
        })
        // this.ids=''+this.projectInfo.productIds
        this.ids = zancun.join(',')
      } else {
        this.ids = ''
      }
      console.log(this.ids)
      // console.log("aaabbb",this.projectInfo)
    } else {
      this.breadCrumbOption = editProjectService().getBreadCrumbOption()
    }
    this.resetOption()
    this.getDeptList()
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
    getDictDesc (dictList, selIndex) {
      for (var index in dictList) {
        if (dictList[index].dictIndex === selIndex) {
          return dictList[index].dictDesc
        }
      }
    },
    sureSubmit () {
      this.showInfo.oneShow = false
      this.twoList = []
      this.threeList = []
      this.fourList = []
    },
    cancelSubmit () {
      if (this.projectInfo.products instanceof Array && this.projectInfo.products.length > 0) { this.projectInfo.products.splice(this.projectInfo.products - 1, 1) }
      this.showInfo.oneShow = false
      this.twoList = []
      this.threeList = []
      this.fourList = []
    },
    async submitHandler () {
      // 这里调用提交接口
      console.log('修改提交')
      //  console.log(this.$route.params)
      try {
        if (this.$route.params && this.$route.params.projectId) {
          let params = {
            deptId: this.projectInfo.deptId,
            deptName: this.getDictDesc(this.deptList, this.projectInfo.deptId),
            productIds: this.ids,
            projectId: this.projectInfo.projectId,
            projectLeader: this.getDictDesc(this.leaderList, this.projectInfo.leaderId),
            projectName: this.projectInfo.projectName,
            leaderId: this.projectInfo.leaderId
          }
          let { data } = await projectAPIs.updateProject(params)
          if (data.code === 200) {
            this.$message({
              type: 'success',
              message: data.message
            })
          } else {
            this.$message({
              type: 'error',
              message: '修改失败'
            })
          }
        } else {
          //  console.log(this.projectInfo.productIds)
          let paramss = {
            deptId: this.projectInfo.deptId,
            deptName: this.getDictDesc(this.deptList, this.projectInfo.deptId),
            productIds: this.ids,
            projectLeader: this.getDictDesc(this.leaderList, this.projectInfo.leaderId),
            projectName: this.projectInfo.newName,
            leaderId: this.projectInfo.leaderId
          }
          //    delete params.projectId
          //   params.projectName = this.projectInfo.newName
          let { data } = await projectAPIs.addProject(paramss)
          if (data.code === 200) {
            this.$message({
              type: 'success',
              message: data.message
            })
          } else {
            this.$message({
              type: 'error',
              message: '新增失败'
            })
          }
        }
        this.$router.push('/project')
      } catch (error) {
        if (error) {
          this.$confirm('操作失败,点击确认将返回列表页').then(_ => {
            this.$router.push('/project')
          }).catch(_ => {})
        }
      }
    },
    delHandler (item, index) {
      // console.log(item)
      let zancun = this.ids.split(',')
      zancun.splice(index, 1)
      // console.log(this.ids)
      // console.log(zancun)
      this.ids = zancun.join(',')
      // console.log(this.ids)
      this.projectInfo.products.splice(index, 1)
      if (this.projectInfo.products.length === 0) {
        this.projectInfo.products = null
      }
    },
    addHandler () {
      this.showInfo.oneShow = true
      //  console.log(dicAPIs)
      // 接下来需要获取类别
      this.classInfo = {oneClass: '', twoClass: '', fourClass: ''}
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
          //   console.log("111"+val)
          console.log('ceshi' + val.split('-')[1])
          if (val.split('-')[1] === '0') {
            this.twoList = []
            this.threeList = []
            this.params.oneLevel = 0
            this.params.twoLevel = 0
            this.getProductList()
          } else if (val.split('-')[1] === 1) {
            this.twoList = []
            this.threeList = []
            this.params.oneLevel = 1
            this.params.twoLevel = 0
            this.getProductList()
          } else {
            this.fourList = []
            this.params.oneLevel = +val.split('-')[0]
            this.getProdutLevelList(val.split('-')[1])
          }
          break
        case 'two':
          // 执行函数二
          // this.params.twoLevel = +val.split('-')[0]
          if (this.params.oneLevel === 2) {
            this.params.twoLevel = val.split('-')[0]
            this.getProductList()
            this.params.twoLevel = this.twoList[val.split('-')[0]].levelId
          } else {
            // this.getProdutLevelList(val.split('-')[1])
          }
          break
        case 'three':
          // 执行函数三
          // this.params.threeLevel = +val.split('-')[1]
          this.getProductList()
          break
        case 'four':
          // 这里是选择产品
          this.params.threeLevel = +val.split('-')[0]
          console.log(this.params.threeLevel)
          if (this.projectInfo.products instanceof Array) {

          } else {
            this.projectInfo.products = []
          }
          // console.log(this.projectInfo.products)
          //  this.projectInfo.products.push(this.fourList[this.params.threeLevel])
          let arrs = {}
          arrs.productId = this.fourList[this.params.threeLevel].productId
          arrs.productName = this.fourList[this.params.threeLevel].productName
          if (this.projectInfo.products.length === 0) {
            this.projectInfo.products.push(arrs)
          } else {
            this.projectInfo.products.some(item => {
              if (item.productId === arrs.productId) {
              } else {
                this.projectInfo.products.push(arrs)
                return true
              }
            })
          }
          if (this.ids === '') {
            this.ids = this.ids + arrs.productId
          } else {
            this.ids = this.ids + ',' + arrs.productId
          }
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
          this.classInfo.twoClass = null
          this.twoList = data.data
        //  console.log(data.data)
        } else {
          this.classInfo.threeClass = null
          if (data.data.length === 0) {
          //  this.params.threeLevel = 0
            this.threeList = []
            this.getProductList()
          } else {
            this.threeList = data.data
          }
        }
      } catch (error) {}
    },
    async getProductList () {
      try {
        let {oneLevel, twoLevel} = this.params
        let {data} = await projectAPIs.getProductList({oneLevel, twoLevel})
        // console.log(data.data)
        this.fourList = data.data
        // this.projectInfo.products.concat(data.data)
      } catch (error) {}
    },
    async getDeptList () {
      try {
        let departmentList = await dicAPIs.selectInfoByValues({type: 'BUMENLEIXING'})
        let managerList = await dicAPIs.selectInfoByValues({type: 'FUZEREN'})
        // console.log(departmentList.data.data)
        this.deptList = departmentList.data.data
        this.leaderList = managerList.data.data
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
