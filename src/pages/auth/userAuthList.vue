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
      pageInfo: {pageNum: 1, pageSize: 10, total: 0},
      positionInfoId: null,
      positionTypeId: null,
      roleId: null
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
        this.roleId = -1
        this.postionInfoId = -1
        this.positionTypeId = -1
        this.getDataList(true)
      } else {
        this.breadcrumbOptions = {
          bread: [
            {
              label: '权限列表'
            }
          ]
        }
        this.searchResult = null
        this.getDataList()
      }
      this.resetOption()
    }
  },
  methods: {
    pageHandler (val) {
      this.pageInfo.pageNum = val
      // 调用数据请求接口,带分页参数
      this.getDataList()
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
        this.roleId = +val
        this.positionInfoId = -1
        this.positionTypeId = -1
        this.selectSearchOptions.select[1].value = -1
        this.selectSearchOptions.select[2].value = -1
        this.getDataList()
      }
      let selectFun2 = async (val) => {
        this.roleId = -1
        this.positionTypeId = +val
        this.positionInfoId = -1
        this.selectSearchOptions.select[0].value = -1
        this.selectSearchOptions.select[2].value = -1
        this.getDataList()
      }
      let selectFun3 = async (val) => {
        this.roleId = -1
        this.positionTypeId = -1
        this.positionInfoId = +val
        this.selectSearchOptions.select[1].value = -1
        this.selectSearchOptions.select[0].value = -1
        this.getDataList()
      }
      try {
        var {data} = await dicAPIs.selectInfoByValues({type: 'JIAOSELEIXING'})//   eslint-disable-line
        data.data.forEach(item => {
          item.label = item.dictDesc
          item.value = item.dictIndex + ''
        })
        data.data.unshift({value: -1, label: '全部角色'})
        roleList = data.data
        var {data} = await dicAPIs.selectInfoByValues({type: 'ZHIWEILEIXING'})//   eslint-disable-line
        data.data.forEach(item => {
          item.label = item.dictDesc
          item.value = item.dictIndex + ''
        })
        data.data.unshift({value: -1, label: '全部职位类型'})
        positionTypeList = data.data
        var {data} = await dicAPIs.selectInfoByValues({type: 'ZHIWEIXINXI'})//   eslint-disable-line
        data.data.forEach(item => {
          item.label = item.dictDesc
          item.value = item.dictIndex + ''
        })
        data.data.unshift({value: -1, label: '全部职位'})
        positionList = data.data
        this.selectSearchOptions = userAuthListService().selectSearchOptions({that: this, roleList, positionTypeList, positionList, selectFun1, selectFun2, selectFun3})
        this.selectSearchOptions.select[0].value = -1
        this.selectSearchOptions.select[1].value = -1
        this.selectSearchOptions.select[2].value = -1
      } catch (error) {}
    },
    async getDataList (searchFlag) {
      try {
        let { data } = await authAPIs.selectRoleInfoAll({
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize,
          userAccount: this.userAccount,
          userName: this.userName,
          postionInfoId: this.positionInfoId === null ? -1 : this.positionInfoId,
          postionTypeId: this.positionTypeId === null ? -1 : this.positionTypeId,
          roleId: this.roleId === null ? -1 : this.roleId
        })
        let opetate = [
          {
            textProp: '编辑'
          }
        ]
        let authList = [{
          label: 'look'
        }, {
          label: 'download'
        }, {
          label: 'upload'
        }, {
          label: 'edit'
        }, {
          label: 'del'
        }]
        if (data.code === 200) {
          data.data.pageList.forEach((item, index) => {
            if (item.roleId === 1000) {
              data.data.pageList.splice(index, 1)
            }
          })
          data.data.pageList.forEach(item => {
            item.opetate = opetate
            // item.userName = item.userName ? item.userName : '暂无'
            // item.userAccount = item.userAccount ? item.userAccount : '暂无'
            item.powerList = item.powerList ? item.powerList : ''
            authList.forEach((sub, index) => {
              item[sub.label] = item.powerList.split(',').indexOf(index + '') === -1 ? '×' : '√'
            })
          })
          if (searchFlag) {
            this.searchResult.total = data.data.totalCount
          }
          this.pageInfo.total = data.data.totalCount
          this.tableOptions = userAuthListService(data.data.pageList).getOptions({ that: this })
        } else {
          this.tableOptions = userAuthListService([]).getOptions({ that: this })
          this.pageInfo.total = 0
          this.searchResult = null
        }
      } catch (error) {
        // this.$alert('网络不通,或者服务器错误')
        console.log(error)
      }
    }
  },
  mounted () {
    this.resetOption()
    this.getSelectData()
    this.getDataList()
  },
  computed: {
    userAccount () {
      if (this.searchResult && this.searchResult.keyword && this.searchResult.keyword.indexOf('@') !== -1) {
        return this.searchResult.keyword
      } else {
        return ''
      }
    },
    userName () {
      if (this.searchResult && this.searchResult.keyword && this.searchResult.keyword.indexOf('@') === -1) {
        return this.searchResult.keyword
      } else {
        return ''
      }
    }
  }
}
</script>
