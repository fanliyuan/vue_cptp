/**
* 作者 ：食草狂魔
*
* 日期 ：2017/12/20
*
* 描述 ：产品列表页
*/
<template>
  <div class="container">
    <SelectSearch :options="selectSearchOption" class="select"/>
    <div v-if="searchResult" class="mysearch">您搜索的关键词: <span class="red">{{searchResult.keyword}}</span> ,搜索结果<span class="red"> {{searchResult.total}} </span>个</div>
    <Table :options="tableOption" />
    <el-pagination v-if="pageInfo.total > 10" :total="pageInfo.total" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" background layout="prev, pager, next, jumper" class="mypagenation" @current-change="pageHandler"></el-pagination>
  </div>
</template>
<script>
import SelectSearch from '../../components/select/SelectSearch'
import Table from '../../components/table/Table'
import productListService from './service/productListService'
import dicAPIs from '../../api/dic/dicAPIs'
import productAPIs from '../../api/product/productAPIs'
export default {
  components: {
    SelectSearch,
    Table
  },
  data () {
    // 展示数据components\breadcrumb\breadcrumb.vue
    let vm = this
    let temp = {
      select: [
        {
          selectHandler (val) {
            console.log(val)
          },
          value: '',
          className: 'my-select',
          option: [
          ]
        }
      ],
      search: {
        searchHandler (val) {
          if (!val) val = 'all'
          this.$router.push(`/product/search/${val}`)
        }
      }
    }
    let data = [
      {
        productName: [
          {
            textProp: '产品1'
          }
        ],
        pm: '经理1',
        stateName: '预立项',
        productId: 1,
        operation: [
          {
            textProp: '修改'
          },
          {
            textProp: '冻结'
          }
        ]
      }
    ]
    let forbidFun = (row) => {
      // 调用冻结接口
      console.log(row.productName[0].textProp)
      this.$router.push('/product/productFobidden')
    }
    return {
      selectSearchOption: temp,
      breadCrumbOption: {
        bread: [
          {
            label: '产品列表'
          }
        ]
      },
      rightButtonOption: [
        {
          label: '添加产品',
          fun () {
            vm.$router.push('/product/editProduct')
          }
        }
      ],
      searchResult: null,
      tableOption: productListService(data).getTabelOptions({that: this, forbidFun}),
      pageInfo: {
        total: 11,
        pageSize: 10,
        pageNum: 1
      },
      status: 0
    }
  },
  watch: {
    $route () {
      if (this.$route.params && this.$route.params.keyword) {
        this.breadCrumbOption = {bread: [{label: '产品管理', path: '/product'}, {label: '产品搜索'}]}
        this.searchResult = {
          keyword: this.$route.params.keyword,
          total: 9
        }
      } else {
        this.breadCrumbOption = {bread: [{label: '产品列表', path: '/product'}]}
        this.searchResult = null
      }
      this.resetOption()
    }
  },
  methods: {
    pageHandler (val) {
      this.pageInfo.pageNum = val
      console.log(this.pageInfo)
      // 接口
      this.getProductList()
    },
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadCrumbOption,
        rightButtonOption: this.rightButtonOption
      })
    },
    async getStateList () {
      let { data } = await dicAPIs.selectInfoByValues({ URI: 'CHANPINZHUANGTAI' })
      let option = []
      try {
        let temp = []
        data.data.forEach((item, index) => {
          temp[item.dictIndex] = item
        })
        temp.forEach(item => {
          option.push({
            label: item.dictDesc,
            value: item.dictIndex
          })
        })
        let vm = this
        this.selectSearchOption = {
          select: [
            {
              selectHandler (val) {
                vm.status = val
                vm.getProductList()
              },
              value: '全部状态',
              className: 'my-select',
              option
            }
          ],
          search: {
            searchHandler (val) {
              if (!val) val = 'all'
              this.$router.push(`/product/search/${val}`)
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getProductList () {
      let { data } = await productAPIs.getProductList({
        name: '',
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize,
        pm: '',
        status: this.status
      })
      let operation = [
        {
          textProp: '修改'
        },
        {
          textProp: '冻结'
        }
      ]
      let forbidFun = (row) => {
        // 调用冻结接口
        console.log(row.productName[0].textProp)
        this.$router.push('/product/productFobidden')
      }
      this.pageInfo.total = data.data.totalCount
      data.data.pageList.forEach(item => {
        item.operation = operation
        item.productName = [{textProp: item.productName}]
      })
      this.tableOption = productListService(data.data.pageList).getTabelOptions({that: this, forbidFun})
    }
  },
  mounted () {
    this.resetOption()
    this.getStateList()
    this.getProductList()
  }
}
</script>
<style lang="less" scoped>
  // 引入全局样式文件
  @import '../../assets/less/_settings.less';
  .detailTitle {
    color: @text-color;
  }
  .container{
    width: 100%;
    padding: 20px;
  }
</style>
<style lang="less">
</style>
