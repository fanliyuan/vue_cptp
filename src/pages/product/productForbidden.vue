/*
 * @Author: ChouEric
 * @Date: 2018-04-23 18:14:13
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-04-24 14:08:27
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
export default {
  components: {
    SelectSearch,
    Table
  },
  data () {
    // 展示数据components\breadcrumb\breadcrumb.vue
    let vm = this
    let temp = {
      search: {
        searchHandler (val) {
          if (!val) val = 'all'
          vm.$router.push(`/product/search/${val}`)
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
        productManager: '经理1',
        productId: 1,
        operation: [
          {
            textProp: '已冻结'
          }
        ]
      }
    ]
    let forbidFun = (row) => {
      // 调用冻结接口
      console.log(row.productName[0].textProp)
      this.$router.push('/product/productFobidden')
    }
    let cancelForbid = (row) => {
      // 取消冻结接口
      console.log(row.productName[0].textProp, '取消冻结')
    }
    return {
      selectSearchOption: temp,
      breadCrumbOption: {
        bread: [
          {
            label: '产品列表',
            path: '/product'
          },
          {
            label: '冻结产品'
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
      tableOption: productListService(data).getTabelOptions({that: this, forbidFun, cancelForbid}),
      pageInfo: {
        total: 11,
        pageSize: 10,
        pageNum: 1
      }
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
    },
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadCrumbOption,
        rightButtonOption: this.rightButtonOption
      })
    }
  },
  mounted () {
    this.resetOption()
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
