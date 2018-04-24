<template>
  <div>
    <SelectSearch :options="selectSearchOptions"/>
    <div v-if="searchResult" class="mysearch">您搜索的关键词: <span class="red">{{searchResult.keyword}}</span> ,搜索结果<span class="red"> {{searchResult.total}} </span>个</div>
    <Table :options="TableOptions"></Table>
    <el-pagination v-if="pageInfo.total > 10" :total="pageInfo.total" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" background layout="prev, pager, next, jumper" class="mypagenation" @current-change="pageHandler"></el-pagination>
  </div>
</template>
<script>
import Table from '../../components/table/Table'
import userListService from './service/userListService'
import SelectSearch from '../../components/select/SelectSearch'
export default {
  components: {
    Table,
    SelectSearch
  },
  data () {
    let vm = this
    // 展示数据
    let temp = [
      {
        userName: '用户名1',
        account: '账户',
        userId: 1,
        opetate: [
          {
            textProp: '修改'
          },
          {
            textProp: '停用'
          }
        ],
        mobile: 13312341234
      },
      {
        userName: '用户名2',
        account: '账户',
        opetate: [
          {
            textProp: '修改'
          },
          {
            textProp: '停用'
          }
        ],
        mobile: 111111111
      },
      {
        userName: '用户名3',
        account: '账户',
        opetate: [
          {
            textProp: '修改'
          },
          {
            textProp: '停用'
          }
        ]
      },
      {
        userName: '用户名4',
        account: '账户',
        opetate: [
          {
            textProp: '修改'
          },
          {
            textProp: '停用'
          }
        ]
      },
      {
        userName: '用户名5',
        account: '账户',
        opetate: [
          {
            textProp: '修改'
          },
          {
            textProp: '停用'
          }
        ]
      },
      {
        userName: '用户名6',
        account: '账户',
        opetate: [
          {
            textProp: '修改'
          },
          {
            textProp: '停用'
          }
        ]
      },
      {
        userName: '用户名7',
        account: '账户',
        opetate: [
          {
            textProp: '修改'
          },
          {
            textProp: '停用'
          }
        ]
      },
      {
        userName: '用户名8',
        account: '账户',
        opetate: [
          {
            textProp: '修改'
          },
          {
            textProp: '停用'
          }
        ]
      },
      {
        userName: '用户名9',
        account: '账户',
        opetate: [
          {
            textProp: '修改'
          },
          {
            textProp: '停用'
          }
        ]
      },
      {
        userName: '用户名10',
        account: '账户',
        opetate: [
          {
            textProp: '修改'
          },
          {
            textProp: '停用'
          }
        ]
      }
    ]
    // 搜索的假数据
    let selectSearchOptions = {
      select: [
        {
          selectHandler (val) {
            console.log(val)
          },
          value: '2',
          className: 'my-select',
          option: [
            {
              label: '选择一',
              value: '1'
            },
            {
              label: '选择二',
              value: '2'
            }
          ]
        },
        {
          selectHandler (val) {
            console.log(val)
          },
          value: '2',
          option: [
            {
              label: '选择一',
              value: '1'
            },
            {
              label: '选择二',
              value: '2'
            }
          ]
        },
        {
          selectHandler (val) {
            console.log(val)
          },
          value: '2',
          option: [
            {
              label: '选择一',
              value: '1'
            },
            {
              label: '选择二',
              value: '2'
            }
          ]
        }
      ],
      search: {
        searchHandler (val) {
          if (!val) return vm.$router.push(`/user/search/${'all'}`)
          vm.$router.push(`/user/search/${val}`)
        }
      }
    }
    return {
      TableOptions: userListService(temp).getOptions({that: this}).tableOptions,
      rightbuttonOptions: userListService(temp).getOptions({that: this}).rightbuttonOptions,
      breadcrumbOptions: {bread: [{label: '用户列表', path: '/user'}]},
      selectSearchOptions: selectSearchOptions,
      searchResult: null,
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
        this.breadcrumbOptions = {bread: [{label: '用户管理', path: '/user'}, {label: '用户搜索'}]}
        this.resetOption()
        this.searchResult = {
          keyword: this.$route.params.keyword,
          total: 9
        }
      } else {
        this.breadcrumbOptions = {bread: [{label: '用户列表', path: '/user'}]}
        this.searchResult = null
        this.resetOption()
      }
    }
  },
  methods: {
    pageHandler (val) {
      this.pageInfo.pageNum = val
      // 重新调用数据请求接口
    },
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadcrumbOptions,
        rightButtonOption: this.rightbuttonOptions
      })
    }
  },
  mounted () {
    this.resetOption()
  }
}
</script>
