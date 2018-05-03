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
import dicAPIs from '../../api/dic/dicAPIs'
import authAPIs from '../../api/auth/authAPIs'
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
    // 以下代码执行顺序有问题-----------------------------------
    let roleList = []
    let positionTypeList = []
    let positionList = []
    // let getRoleList = async () => {
    //   try {
    //     let { data } = await dicAPIs.selectInfoByValues({type: 'JIAOSELEIXING'})
    //     data.data.forEach(item => {
    //       item.label = item.dictDesc
    //       item.value = item.id + ''
    //     })
    //     roleList = data.data
    //   } catch (error) {}
    // }
    // let getPositionTypeList = async () => {
    //   try {
    //     let { data } = await dicAPIs.selectInfoByValues({type: 'JIAOSELEIXING'})
    //     data.data.forEach(item => {
    //       item.label = item.dictDesc
    //       item.value = item.id + ''
    //     })
    //     positionTypeList = data.data
    //   } catch (error) {}
    // }
    // let getPositionList = async () => {
    //   try {
    //     let { data } = await dicAPIs.selectInfoByValues({type: 'JIAOSELEIXING'})
    //     data.data.forEach(item => {
    //       item.label = item.dictDesc
    //       item.value = item.id + ''
    //     })
    //     positionList = data.data
    //   } catch (error) {}
    // }
    // getRoleList()
    // getPositionTypeList()
    // getPositionList()
    return {
      tableOptions: userAuthListService(temp).getOptions({that: this}),
      selectSearchOptions: userAuthListService().selectSearchOptions({that: this, roleList, positionTypeList, positionList}),
      rightButtonOptions: userAuthListService().rightOptions({that: this}),
      breadcrumbOptions: userAuthListService().breadcrumbOptions(),
      searchResult: null,
      pageInfo: {pageNum: 1, pageSize: 10, total: 0}
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
    },
    async getSelectData () {
      let roleList
      let positionTypeList
      let positionList
      let selectFun1 = async (val) => {
        let { data } = await authAPIs.selectRoleInfoAll({
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize,
          roleId: +val,
          postionInfoId: -1,
          postionTypeId: -1,
          userName: '',
          userAccount: ''
        })
        console.log(data.data)
      }
      let selectFun2 = async (val) => {
        let { data } = await authAPIs.selectRoleInfoAll({
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize,
          roleId: -1,
          postionInfoId: -1,
          postionTypeId: +val,
          userName: '',
          userAccount: ''
        })
        console.log(data.data)
      }
      let selectFun3 = async (val) => {
        let { data } = await authAPIs.selectRoleInfoAll({
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize,
          roleId: -1,
          postionInfoId: +val,
          postionTypeId: -1,
          userName: '',
          userAccount: ''
        })
        console.log(data.data)
      }
      try {
        var {data} = await dicAPIs.selectInfoByValues({type: 'JIAOSELEIXING'})//   eslint-disable-line
        data.data.forEach(item => {
          item.label = item.dictDesc
          item.value = item.dictIndex + ''
        })
        roleList = data.data
        var {data} = await dicAPIs.selectInfoByValues({type: 'ZHIWEILEIXING'})//   eslint-disable-line
        data.data.forEach(item => {
          item.label = item.dictDesc
          item.value = item.dictIndex + ''
        })
        positionTypeList = data.data
        var {data} = await dicAPIs.selectInfoByValues({type: 'ZHIWEIXINXI'})//   eslint-disable-line
        data.data.forEach(item => {
          item.label = item.dictDesc
          item.value = item.dictIndex + ''
        })
        positionList = data.data
        this.selectSearchOptions = userAuthListService().selectSearchOptions({that: this, roleList, positionTypeList, positionList, selectFun1, selectFun2, selectFun3})
      } catch (error) {}
    }
  },
  mounted () {
    this.resetOption()
    this.getSelectData()
  }
}
</script>
