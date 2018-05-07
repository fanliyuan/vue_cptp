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
import userAPIs from '../../api/user/userAPIs'
export default {
  components: {
    Table,
    SelectSearch
  },
  data () {
    let vm = this

    let uploadUser = () => {
        console.log('上传')
        localStorage.removeItem('token')
        userAPIs.login({userName: 'aad', userPassword: '123youe'})
      }

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

      TableOptions: {},
      rightbuttonOptions: userListService([]).getOptions({that: vm, uploadUser}).rightbuttonOptions,
      breadcrumbOptions: {bread: [{label: '用户列表', path: '/user'}]},
      selectSearchOptions: selectSearchOptions,
      filterUserDTO: {
        deptId: -1,
        pageNum: 1,
        pageSize: 10,
        token: '3984dcf753c3ad',
        userPositionId: -1,
        userRoleId: -1

      },
      userList: [],
      userDisplayList: [],
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
        this.searchResult = {
          keyword: this.$route.params.keyword,
          total: 9
        }
      } else {
        this.breadcrumbOptions = {bread: [{label: '用户列表', path: '/user'}]}
        this.searchResult = null
      }
      this.resetOption()
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
    },
    initData () {

      console.log("test test test")

      console.log(this.rightbuttonOptions )

      console.log("test test test")
      

      userAPIs.filterUserList(this.filterUserDTO).then(response => {
        this.userList = response.data.data.listInfo

        for (var index in this.userList) {
          var userDisplayInfo = {

            userName: this.userList[index].userName,
            userEmail: this.userList[index].userEmail,
            userPhone: this.userList[index].userPhone,
            deptName: this.userList[index].deptName,
            positionName: this.userList[index].positionName,
            positionTypeName: this.userList[index].positionTypeName,
            roleName: this.userList[index].roleName,
            privilegeName: this.userList[index].privilegeName,
            opetate: [
              {
                textProp: '修改'
              },
              {
                textProp: this.userList[index].isDisable === 0 ? '停用' : '启用'

              }
            ]
          }

          this.userDisplayList.push(userDisplayInfo)
        };

        this.TableOptions = userListService(this.userDisplayList).getOptions({that: this}).tableOptions

      })
    }
  },
  mounted () {
    this.resetOption()
    this.initData()
  }
}
</script>
