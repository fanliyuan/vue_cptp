<template>
  <div>
    <SelectSearch :options="selectSearchOptions" />
    <div v-if="searchResult" class="mysearch">您搜索的关键词: <span class="red">{{searchResult.keyword}}</span> ,搜索结果<span class="red"> {{searchResult.total}} </span>个</div>
    <Table :options="tableOptions"></Table>
    <el-pagination v-if="pageInfo.total > 10" :total="pageInfo.total" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" background layout="prev, pager, next, jumper" class="mypagenation" @current-change="pageHandler"></el-pagination>
  </div>
</template>
<script>
import Table from '../../components/table/Table'
import userAuthListService from './service/userAuthListService'
import SelectSearch from '../../components/select/SelectSearch'
export default {
  components: {
    Table,
    SelectSearch
  },
  data () {
    // 展示数据
    let temp = [
      {
        userName: '用户名1',
        account: '账户',
        look: '√',
        edit: '×',
        opetate: [
          {
            textProp: '编辑'
          }
        ]
      }
    ]
    // let userAuthListOptions = userAuthListService(temp).getOptions()
    return {
      tableOptions: userAuthListService(temp).getOptions({that: this}),
      selectSearchOptions: userAuthListService().selectSearchOptions({that: this}),
      rightButtonOptions: userAuthListService().rightOptions({that: this}),
      breadcrumbOptions: userAuthListService().breadcrumbOptions(),
      searchResult: null,
      pageInfo: {pageNum: 1, pageSize: 10, total: 11}
    }
  },
  watch: {
    $route () {
      if (this.$route.params && this.$route.params.keyword) {
        this.breadcrumbOptions = {
          bread: [
            {
              label: '权限管理',
              path: '/auth'
            },
            {
              label: '权限搜索页'
            }
          ]
        }
        this.searchResult = {
          keyword: this.$route.params.keyword,
          total: 9
        }
      } else {
        this.breadcrumbOptions = {
          bread: [
            {
              label: '权限列表'
            }
          ]
        }
        this.searchResult = null
      }
      this.resetOption()
    }
  },
  methods: {
    pageHandler (val) {
      this.pageInfo.pageNum = val
      // 调用数据请求接口,带分页参数
    },
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadcrumbOptions,
        rightButtonOption: this.rightButtonOptions
      })
    }
  },
  mounted () {
    this.resetOption()
  }
}
</script>
