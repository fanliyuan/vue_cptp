/*
 * @Author: ChouEric
 * @Date: 2018-04-26 16:53:31
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-05-28 10:04:39
*/

<template>
  <div>
    <div class="myinput">
      <div class="box">
        <div style="margin-left:105px;">
          <!-- 这里该用循环,自动生成 -->
          <el-radio-group v-model="productInfo.oneLevel" @change="oneLevelChange">
            <el-radio label="0">DAAS</el-radio>
            <el-radio label="1">PAAS</el-radio>
            <el-radio label="2">SAAS</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="box" v-if="twoFlag">
        <div class="label">所属类型</div>
        <el-select v-model="productInfo.twoLevel" class="input" @change="twoLevelChange">
          <!-- 这里该用循环,自动生成 -->
          <el-option v-for="item in twoList" :key="item.subId" :label="item.levelName" :value="item.subId + ''"></el-option>
        </el-select>
      </div>
      <div class="box" v-if="threeFlag">
        <div class="label"></div>
        <el-select v-model="productInfo.threeLevel" class="input" @change="threeLevelChange">
          <el-option v-for="item in threeList" :key="item.levelId" :label="item.levelName" :value="item.subId + ''"></el-option>
        </el-select>
      </div>
      <div class="box">
        <div class="label">产品名称</div>
        <el-input v-model="productInfo.productName" placeholder="请输入产品名称" class="input"></el-input>
      </div>
      <!-- <div class="box">
        <div class="label">板块类型</div>
        <el-select v-model="productInfo.plateType" placeholder="请选择公司名" class="input" @change="plateTypeHandler">
          <el-option v-for="item in plateList" :value="item.dictDesc" :label="item.dictDesc" :key="item.dictDesc"></el-option>
        </el-select>
      </div> -->
      <div class="box">
        <div class="label">板块公司</div>
        <el-select v-model="productInfo.plateCompany" placeholder="请选择公司名" class="input">
          <el-option v-for="item in companyList" :value="item.dictDesc" :label="item.dictDesc" :key="item.dictDesc"></el-option>
        </el-select>
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
      <div class="box box-tag">
        <div class="label label-tag">产品状态</div>
        <div class="input input-tag">
          <el-radio v-model="productInfo.state" v-for="item in stateList" :label="item.dictIndex + ''" :key="item.dictIndex">{{item.dictDesc}}</el-radio>
        </div>
      </div>
      <!-- 动态编辑标签,市场定位 -->
      <div class="box">
        <div class="label label-tag">产品标签</div>
        <div class="input input-tag">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-select
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            size="small"
            ref="tagSelect"
            @change="handleInputConfirm"
            >
            <el-option v-for="item in tagList" :key="item.dictIndex" :label="item.dictDesc" :value="item.dictDesc + ''"></el-option>
          </el-select>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">添加新标签</el-button>
        </div>
      </div>
      <div class="box">
        <div class="label label-tag">市场定位</div>
        <div class="input input-tag">
          <el-tag
            :key="tag"
            v-for="tag in dynamicMarket"
            closable
            :disable-transitions="false"
            @close="handleCloseMarket(tag)">
            {{tag}}
          </el-tag>
          <el-select
            class="input-new-tag"
            v-if="inputVisibleMarket"
            v-model="inputValueMarket"
            size="small"
            ref="tagSelect"
            @change="handleInputConfirmMarket"
            >
            <el-option v-for="item in marketList" :key="item.dictIndex" :label="item.dictDesc" :value="item.dictDesc + ''"></el-option>
          </el-select>
          <el-button v-else class="button-new-tag" size="small" @click="showInputMarket">添加新标签</el-button>
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
import userAPIs from '../../api/user/userAPIs'
import dicAPIs from '../../api/dic/dicAPIs'
export default {
  data () {
    return {
      productInfo: { productName: '', pm: '', plateType: null, plateCompany: null, state: '-1', productId: null, oneLevel: null, twoLevel: '0', threeLevel: '-1', productMarketTarget: null, productTag: null },
      productManagerList: [],
      stateList: [],
      productLevelList: [],
      daasFlag: null,
      twoFlag: false,
      twoList: [],
      threeFlag: false,
      threeList: [],
      dynamicTags: [],
      dynamicMarket: [],
      inputVisible: false,
      inputVisibleMarket: false,
      inputValue: '',
      inputValueMarket: '',
      tagList: [],
      marketList: [],
      companyList: [],
      plateList: []
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
    }
  },
  async beforeMount () {
    await this.loadPlateList()
    await this.loadComponayList()
    await this.loadStateList()
    this.loadProductInfo()
    this.plateList.some(async item => {
      if (item.dictDesc === this.productInfo.plateType) {
        await this.loadComponayList(item.id)
      }
    })
    this.loadProductManagerList()
    this.getTagList()
    this.getMarketList()
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
    async loadProductManagerList () {
      // 所有产品经理
      try {
        let { data } = await userAPIs.getUserByPositionName({positionName: '产品经理'})
        data.data.forEach(item => {
          item.value = item.userName
        })
        this.productManagerList = data.data
      } catch (error) {
        console.log()
      }
    },
    async loadStateList (cb) {
      try {
        let { data } = await dicAPIs.selectInfoByValues({type: 'CHANPINZHUANGTAI'})
        this.stateList = data.data
        cb && cb()
      } catch (error) {
        console.log()
      }
    },
    async loadPlateList () {
      try {
        let {data} = await dicAPIs.selectInfoByValues({type: 'BANKUAILEIXING'})
        if (data.code === 200) {
          this.plateList = data.data ? data.data : []
        }
      } catch (error) {}
    },
    async plateTypeHandler (val) {
      await this.loadComponayList(val)
      this.productInfo.plateCompany = this.plateList[0] ? this.plateList[0].dictDesc : null
    },
    async loadComponayList (parentId) {
      try {
        if (parentId || parentId === 0) {
          let {data} = await dicAPIs.queryDictValueInfo({parentId: parentId})
          if (data.code === 200) {
            this.companyList = data.data ? data.data : []
          } else {
            throw new Error('接口非200')
          }
        } else {
          let {data} = await dicAPIs.selectInfoByValues({type: 'BANKUAIGONGSI'})
          if (data.code === 200) {
            this.companyList = data.data ? data.data : []
          } else {
            throw new Error('接口非200')
          }
        }
      } catch (error) {
        console.log(error)
        this.companyList = []
      }
    },
    loadProductInfo () {
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
        // this.productInfo.productMarketTarget = productInfo.productMarketTarget
        // this.productInfo.productTag = productInfo.productTag
        this.dynamicMarket = productInfo.productMarketTarget ? productInfo.productMarketTarget.split(',') : []
        this.dynamicTags = productInfo.productTag ? productInfo.productTag.split(',') : []
        this.getTwoList(productInfo, this.getThreeList)
        for (let key in productInfo) {
          if (key === 'productName') {
            this.productInfo[key] = productInfo[key][0].textProp
          } else {
            this.productInfo[key] = productInfo[key] + ''
          }
        }
        this.levelDisplay()
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
    submitHandler () {
      this.stateList.some(item => {
        if (item.dictIndex + '' === this.productInfo.state + '') {
          this.productInfo.stateName = item.dictDesc
          return true
        }
      })
      this.productInfo.productName = this.productInfo.productName.replace(/,/g, '')
      if (this.$route.params && this.$route.params.productId) {
        // 这里调用编辑接口
        let params = {
          deptId: +this.productInfo.deptId,
          // finishiPercent: this.productInfo.finishiPercent,
          frozenStatus: this.productInfo.frozenStatus,
          marketTarget: this.productMarketTarget,
          oneLevel: +this.productInfo.oneLevel,
          pm: this.productInfo.pm,
          productId: +this.productInfo.productId,
          productName: this.productInfo.productName,
          productTag: this.productTag,
          projectId: +this.productInfo.projectId,
          rdm: this.productInfo.rdm,
          state: +this.productInfo.state,
          stateName: this.productInfo.stateName,
          threeLevel: +this.productInfo.threeLevel,
          twoLevel: +this.productInfo.twoLevel,
          plateCompany: this.productInfo.plateCompany
          // plateType: this.productInfo.plateType
        }
        this.productManagerList.some(item => {
          if (item.userName === params.pm) {
            params.userId = item.userId
          }
        })
        productAPIs.updateProductInfo(params).then(data => {
          if (data && data.data && data.data.code === 200) {
            this.$message({
              type: 'success',
              message: data.data.message
            })
            this.$router.push('/product')
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
        let params = {
          marketTarget: this.productMarketTarget,
          name: this.productInfo.productName,
          oneLevel: this.productInfo.oneLevel - 0,
          twoLevel: this.productInfo.twoLevel - 0,
          threeLevel: this.productInfo.threeLevel - 0,
          pm: this.productInfo.pm,
          tag: this.productTag,
          status: this.productInfo.state - 0,
          statusName: this.productInfo.stateName,
          plateCompany: this.productInfo.plateCompany || ''
          // plateType: this.productInfo.plateType
        }
        this.productManagerList.some(item => {
          if (item.userName === params.pm) {
            params.userId = item.userId
          }
        })
        productAPIs.addProduct(params).then(data => {
          if (data && data.data && data.data.code === 200) {
            this.$message({
              type: 'success',
              message: data.data.message
            })
            this.$router.push('/product')
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
      }
    },
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadCrumbOption,
        rightButtonOption: this.rightButtonOption
      })
    },
    // 判断类型框是否显示
    levelDisplay () {
      switch (this.productInfo.oneLevel) {
        case '0':
        // DAAS类型级联
          this.twoFlag = false
          this.threeFlag = false
          this.productInfo.twoLevel = '-1'
          this.productInfo.threeLevel = '-1'
          break
        case '1':
        // PAAS类型级联
          this.twoFlag = false
          this.threeFlag = false
          this.productInfo.twoLevel = '-1'
          this.productInfo.threeLevel = '-1'
          break
        case '2':
        // SAAS类型级联
          this.twoFlag = true
          // this.threeFlag = true
          break
      }
    },
    oneLevelChange (val) {
      this.productInfo.oneLevel = val
      this.levelDisplay()
      if (val === '2') {
        this.getTwoList({}, this.getThreeList)
      }
      this.productInfo.twoLevel = null
    },
    twoLevelChange (val) {
      this.productInfo.twoLevel = val
      // 二级改变获取三级级联
      // this.getThreeList()
      this.productInfo.threeLevel = '-1'
    },
    threeLevelChange (val) {
    },
    async getTwoList (productInfo = {}, cb) {
      try {
        if (productInfo.twoLevel !== undefined) {
          let { data } = await projectAPIs.getProdutLevelList({parentId: productInfo.oneLevel - 0})
          try {
            this.twoList = data.data
            // 二级类型选择之后调用获取三级类型的列表
            // cb && cb(productInfo)
          } catch (error) {
          }
        } else {
          let { data } = await projectAPIs.getProdutLevelList({parentId: this.productInfo.oneLevel - 0})
          try {
            this.twoList = data.data
            // 二级类型选择之后调用获取三级类型的列表
            // cb && cb(productInfo)
          } catch (error) {
          }
        }
      } catch (error) {
        console.log()
      }
    },
    async getThreeList (productInfo = {}) {
      try {
        if (productInfo.threeLevel !== undefined) {
          let parentId
          this.twoList.some(item => {
            if (item.subId + '' === productInfo.twoLevel + '') {
              parentId = item.levelId
              return true
            }
          })
          let { data } = await projectAPIs.getProdutLevelList({parentId})
          this.threeList = data.data
          if (data.data.length === 0) {
            this.productInfo.threeLevel = '-1'
            this.threeList = [
              {
                levelName: '暂无',
                subId: '0'
              }
            ]
          }
        } else {
          let parentId
          this.twoList.some(item => {
            if (item.subId + '' === this.productInfo.twoLevel) {
              parentId = item.levelId
              return true
            }
          })
          let { data } = await projectAPIs.getProdutLevelList({parentId})
          this.threeList = data.data
          if (data.data.length === 0) {
            this.productInfo.threeLevel = '-1'
            this.threeList = [
              {
                levelName: '暂无',
                subId: '0'
              }
            ]
          }
        }
      } catch (error) {
        console.log()
      }
    },
    // 动态编辑标签
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    handleCloseMarket (tag) {
      this.dynamicMarket.splice(this.dynamicMarket.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        // console.log(this.$refs.tagSelect.focus())
      })
    },
    showInputMarket () {
      this.inputVisibleMarket = true
      this.$nextTick(_ => {
        // console.log(this.$refs.tagSelect.focus())
      })
    },
    handleInputConfirm (val) {
      let inputValue = this.inputValue
      if (inputValue && this.dynamicTags.indexOf(inputValue) === -1) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
      this.$refs.tagSelect.$refs.input = {}
      this.$refs.tagSelect.$refs.input.focus = () => {}
    },
    handleInputConfirmMarket (val) {
      let inputValue = this.inputValueMarket
      if (inputValue && this.dynamicMarket.indexOf(inputValue) === -1) {
        this.dynamicMarket.push(inputValue)
      }
      this.inputVisibleMarket = false
      this.inputValueMarket = ''
      this.$refs.tagSelect.$refs.input = {}
      this.$refs.tagSelect.$refs.input.focus = () => {}
    },
    async getTagList () {
      try {
        let { data } = await dicAPIs.selectInfoByValues({type: 'CHANPINBIAOQIAN'})
        this.tagList = data.data
      } catch (error) {}
    },
    async getMarketList () {
      try {
        let { data } = await dicAPIs.selectInfoByValues({type: 'SHICHANGDINGWEI'})
        this.marketList = data.data
      } catch (error) {}
    }
  },
  computed: {
    productTag () {
      return this.dynamicTags.join(',')
    },
    productMarketTarget () {
      return this.dynamicMarket.join(',')
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
      min-height: 62px;
      vertical-align: top;
    }
    .box-tag{
      margin-top: -25px;
    }
    .label {
      width: 170px;
      display: inline-block;
      text-align: right;
    }
    .label-tag{
      line-height: 62px;
      vertical-align: top;
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
    .input-tag{
      padding-top: 20px;
    }
    .submit{
      margin-left: 200px;
      margin-top: 20px;
      padding: 10px 78px;
    }
    .el-tag{
    margin-right: 10px;
    margin-bottom: 10px;
    }
    .button-new-tag {
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      vertical-align: bottom;
    }
    .input_hidden{
      position: relative;
      z-index: -999;
    }
    .el-radio{
      margin-right: 30px;
    }
    .el-radio+.el-radio {
      margin-left: 0;
    }
  }
</style>
