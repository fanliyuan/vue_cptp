<template>
  <div>
    <div class="myinput">
      <div class="box">
        <div style="margin-left:105px;">
          <!-- 这里该用循环,自动生成 -->
          <el-radio-group v-model="productInfo.oneLevel" @change="dpsChange">
            <el-radio label="0">DAAS</el-radio>
            <el-radio label="1">PAAS</el-radio>
            <el-radio label="2">SAAS</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="box" v-if="twoFlag">
        <div class="label">所属类型</div>
        <el-select v-model="productInfo.twoLevel" class="input">
          <!-- 这里该用循环,自动生成 -->
          <el-option v-for="item in twoList" :key="item.subId" :label="item.levelName" value="0"></el-option>
        </el-select>
      </div>
      <div class="box" v-if="threeFlag">
        <div class="label"></div>
        <el-select v-model="productInfo.threeLevel" class="input">
          <el-option v-for="item in threeList" :key="item.subId" :label="item.levelName" value="0"></el-option>
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
          v-model="productInfo.pm"
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
import productAPIs from '../../api/product/productAPIs'
import projectAPIs from '../../api/project/projectAPIs'
export default {
  data () {
    return {
      productInfo: { productName: '', pm: '', state: 0, productId: null, oneLevel: null, twoLevel: null, threeLevel: null },
      productManagerList: [],
      productLevelList: [],
      daasFlag: null,
      twoFlag: false,
      twoList: null,
      threeFlag: false,
      threeList: null
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
      this.resetOption()
    },
    productInfo () {
      this.levelDisplay()
      console.log(this.productInfo)
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
      // 这里是编辑需要初始值
      let productInfo = JSON.parse(sessionStorage.getItem('productInfo'))
      for (let key in productInfo) {
        if (key === 'productName') {
          this.productInfo[key] = productInfo[key][0].textProp
        } else {
          this.productInfo[key] = productInfo[key] + ''
        }
      }
      this.getProdutLevelInfo()
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
    this.resetOption()
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
      if (this.$route.params && this.$route.params.productId) {
        // 这里调用编辑接口
        let params = {
          deptId: this.productInfo.deptId,
          finishiPercent: this.productInfo.finishiPercent,
          frozenStatus: this.productInfo.frozenStatus,
          intro: this.productInfo.intro,
          marketTarget: this.productInfo.produtcMarketTarget,
          oneLevel: this.productInfo.oneLevel,
          pm: this.productInfo.pm,
          productId: this.productInfo.productId,
          productName: this.productInfo.productName,
          productTag: this.productInfo.productTag,
          projectId: this.productInfo.projectId,
          rdm: this.productInfo.rdm,
          state: this.productInfo.state,
          stateName: this.productInfo.stateName,
          threeLevel: this.productInfo.threeLevel,
          twoLevel: this.productInfo.twoLevel
        }
        productAPIs.updateProductInfo(params).then(data => {
          if (data && data.data && data.data.code === 200) {
            this.$message({
              type: 'success',
              message: data.data.message
            })
          } else {
            throw new Error(data.data.message)
          }
        }).catch(err => {
          if (err) {
            this.$message({
              type: 'error',
              message: err.message
            })
          }
        })
      } else {
        // 这里调用新增接口
      }
    },
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadCrumbOption,
        rightButtonOption: this.rightButtonOption
      })
    },
    async getProdutLevelInfo () {
      let { data } = await projectAPIs.getProdutLevelList({parentId: this.productInfo.oneLevel})
      try {
        if (this.productInfo.oneLevel === '1') {
          this.twoList = data.data
        } else if (this.productInfo.oneLevel === '2') {
          let twoList = []
          let threeList = []
          data.data.forEach(item => {
            if (!item.children) {
              twoList.push(item)
            } else {
              threeList = item.children
            }
          })
          this.twoList = twoList
          this.threeList = threeList
        } else {
          console.log(data, 1111)
        }
      } catch (error) {
        console.log(error)
      }
    },
    levelDisplay () {
      switch (this.productInfo.oneLevel) {
        case '0':
          this.twoFlag = false
          this.threeFlag = false
          break
        case '1':
          this.twoFlag = true
          this.threeFlag = false
          break
        case '2':
          this.twoFlag = true
          this.threeFlag = true
          break
      }
    },
    dpsChange (val) {
      this.productInfo.oneLevel = val
      this.levelDisplay()
      this.getProdutLevelInfo()
    }
  }
}
</script>
<style lang="less" scoped>
  .myinput {
    width: 560px;
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
