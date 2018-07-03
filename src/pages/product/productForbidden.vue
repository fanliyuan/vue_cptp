/*
 * @Author: ChouEric
 * @Date: 2018-04-23 18:14:13
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-04-28 14:26:20
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
      search: {
        searchHandler (val) {
          if (!val) val = 'all'
          vm.$router.push(`/product/search/${val}`)
        }
      }
    }
    let data = [
      // {
      //   productName: [
      //     {
      //       textProp: '产品1'
      //     }
      //   ],
      //   pm: '经理1',
      //   productId: 1,
      //   stateName: 111,
      //   operation: [
      //     {
      //       textProp: '已冻结'
      //     }
      //   ]
      // }
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
        total: 0,
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
    },
    async getProductByFrozenStatus () {
      let { data } = await productAPIs.getProductByFrozenStatus({ frozenStatus: '1', pageSize: this.pageInfo.pageSize, pageNum: this.pageInfo.pageNum }
      )
      try {
        let forbidFun = (row) => {
          // 调用冻结接口
          // console.log(row.productName[0].textProp)
          this.$router.push('/product/productFobidden')
        }
        let cancelForbid = async (row) => {
          // 取消冻结接口
//        debugger
          // console.log(row.productName[0].textProp, '取消冻结')
          let { data } = await productAPIs.updateProductFrozenStatus({id: row.productId, status: '0'})
          try {
            console.log(data)
            if (data && data.code === 200) {
              this.$message(
                {
                  type: 'success',
                  message: '取消冻结成功'
                }
              )
              this.getProductByFrozenStatus()
            }
          } catch (error) {
            console.log()
          }
        }
        if (!data.data.pageList) {
          console.log(data)
          this.pageInfo.total = 0
          this.tableOption = productListService([]).getTabelOptions({that: this, forbidFun, cancelForbid})
          return false
        }
        data.data.pageList.forEach(item => {
          item.productName = [
            {
              textProp: item.productName
            }
          ]
          item.operation = [
            {
              textProp: '已冻结'
            }
          ]
        })
        this.pageInfo.total = data.data.totalCount
        this.tableOption = productListService(data.data.pageList).getTabelOptions({that: this, forbidFun, cancelForbid})
      } catch (error) {
        console.log()
      }
    }
  },
  mounted () {
    this.resetOption()
    this.getProductByFrozenStatus()
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
