<template>
  <div>
    <bread-crumb class="mybreadcrumb" :options="breadcrumbOptions"/>
    <RightButton :options="rightbuttonOptions" />
    <SelectSearch :options="selectSearchOptions"/>
    <div v-if="searchResult" class="mysearch">您搜索的关键词: <span class="red">{{searchResult.keyword}}</span> ,搜索结果<span class="red"> {{searchResult.total}} </span>个</div>
    <Table :options="TableOptions"></Table>
  </div>
</template>
<script>
import Table from '../../components/table/Table'
import userListService from './service/userListService'
import BreadCrumb from '../../components/breadcrumb/BreadCrumb'
import RightButton from '../../components/rightbutton/RightButton'
import SelectSearch from '../../components/select/SelectSearch'
export default {
  components: {
    Table,
    BreadCrumb,
    RightButton,
    SelectSearch
  },
  data () {
    let vm = this
    // 展示数据
    let temp = [
      {
        userName: '用户名1',
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
      breadcrumbOptions: {bread: [{label: '用户管理', path: '/user'}]},
      selectSearchOptions: selectSearchOptions,
      searchResult: null
    }
  },
  watch: {
    $route () {
      if (this.$route && this.$route.params) {
        this.breadcrumbOptions = {bread: [{label: '用户管理', path: '/user'}, {label: '用户搜索'}]}
        this.searchResult = {
          keyword: this.$route.params.keyword,
          total: 9
        }
      } else {
        this.breadcrumbOptions = {bread: [{label: '用户管理', path: '/user'}]}
        this.searchResult = null
      }
    }
  }
}
</script>
