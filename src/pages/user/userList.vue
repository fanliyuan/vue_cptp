/*
 * @Author: ChouEric
 * @Date: 2018-05-07 16:54:53
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-05-09 17:44:21
*/
<template>
  <div>
    <SelectSearch :options="selectSearchOptions"/>
    <div v-if="searchResult" class="mysearch">您搜索的关键词: <span class="red">{{searchResult.keyword}}</span> ,搜索结果<span class="red"> {{searchResult.total}} </span>个</div>
    <Table :options="tableOptions"></Table>
    <el-pagination v-if="pageInfo.total > 10" :total="pageInfo.total" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" background layout="prev, pager, next, jumper" class="mypagenation" @current-change="pageHandler"></el-pagination>
  </div>
</template>
<script>
import Table from '../../components/table/Table'
import userListService from './service/userListService'
import SelectSearch from '../../components/select/SelectSearch'
import userAPIs from '../../api/user/userAPIs'
import dicAPIs from '../../api/dic/dicAPIs'
export default {
  components: {
    Table,
    SelectSearch
  },
  data () {
    let vm = this
    let selectSearchOptions = {
      select: [
        {
          selectHandler (val) {
            console.log(val)
          },
          value: null
        },
        {
          selectHandler (val) {
            console.log(val)
          },
          value: null
        },
        {
          selectHandler (val) {
            console.log(val)
          },
          value: null
        }
      ],
      search: {
        searchHandler (val) {
          if (!val) return vm.$router.push(`/user/search/${'all'}`)
          vm.$router.push(`/user/search/${val}`)
        }
      }
    }
    let uploadUser = () => {
      // console.log('上传')
      this.$alert('功能延后')
    }
    return {
      tableOptions: {},
      rightbuttonOptions: userListService([]).getOptions({that: vm, uploadUser}).rightbuttonOptions,
      breadcrumbOptions: {bread: [{label: '用户列表', path: '/user'}]},
      selectSearchOptions: selectSearchOptions,
      searchResult: null,
      userList: [],
      roleList: [],
      departmentList: [],
      positionList: [],
      pageInfo: {
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      selectValue: {
        departmentId: -1,
        positionId: -1,
        roleId: -1
      }
    }
  },
  watch: {
    $route () {
      this.selectValue.departmentId = -1
      this.selectValue.positionId = -1
      this.selectValue.roleId = -1
      if (this.$route.params && this.$route.params.keyword) {
        this.breadcrumbOptions = {bread: [{label: '用户管理', path: '/user'}, {label: '用户搜索'}]}
        this.searchResult = {
          keyword: this.$route.params.keyword,
          total: 0
        }
        this.pageInfo.pageNum = 1
        this.getDataList()
      } else {
        this.breadcrumbOptions = {bread: [{label: '用户列表', path: '/user'}]}
        this.searchResult = null
        this.pageInfo.pageNum = 1
        this.getDataList()
      }
      this.resetOption()
    }
  },
  methods: {
    pageHandler (val) {
      this.pageInfo.pageNum = val
      this.getDataList()
    },
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadcrumbOptions,
        rightButtonOption: this.rightbuttonOptions
      })
    },
    async getSelectOption () {
      try {
        var { data } = await dicAPIs.selectInfoByValues({ type: 'JIAOSELEIXING' })//  eslint-disable-line
        this.roleList = data.data
        var { data } = await dicAPIs.selectInfoByValues({ type: 'BUMENLEIXING' })//  eslint-disable-line
        this.departmentList = data.data
        var { data } = await dicAPIs.selectInfoByValues({ type: 'ZHIWEIXINXI' })//  eslint-disable-line
        this.positionList = data.data
        let params3 = this.roleList.map(item => {
          return {
            value: item.dictIndex,
            label: item.dictDesc
          }
        })
        let params1 = this.departmentList.map(item => {
          return {
            value: item.dictIndex,
            label: item.dictDesc
          }
        })
        let params2 = this.positionList.map(item => {
          return {
            value: item.dictIndex,
            label: item.dictDesc
          }
        })
        params1.unshift({value: -1, label: '所有部门'})
        params2.unshift({value: -1, label: '所有职位'})
        params3.unshift({value: -1, label: '所有角色'})
        let vm = this
        let selectSearchOptions = {
          select: [
            {
              selectHandler: (val) => {
                this.selectSearchOptions.select[1].value = -1
                this.selectSearchOptions.select[2].value = -1
                this.selectValue.positionId = -1
                this.selectValue.roleId = -1
                this.selectValue.departmentId = val
                vm.searchResult = null
                this.getDataList()
              },
              value: this.selectValue.departmentId,
              option: params1
            },
            {
              selectHandler (val) {
                vm.selectSearchOptions.select[0].value = -1
                vm.selectSearchOptions.select[2].value = -1
                vm.selectValue.departmentId = -1
                vm.selectValue.roleId = -1
                vm.selectValue.positionId = val
                vm.searchResult = null
                vm.getDataList()
              },
              value: vm.selectValue.positionId,
              option: params2
            },
            {
              selectHandler (val) {
                vm.selectSearchOptions.select[1].value = -1
                vm.selectSearchOptions.select[0].value = -1
                vm.selectValue.departmentId = -1
                vm.selectValue.positionId = -1
                vm.selectValue.roleId = val
                vm.searchResult = null
                vm.getDataList()
              },
              value: this.selectValue.roleId,
              option: params3
            }
          ],
          search: {
            searchHandler (val) {
              if (!val) return vm.$router.push(`/user/`)
              vm.$router.push(`/user/search/${val}`)
            }
          }
        }
        this.selectSearchOptions = selectSearchOptions
      } catch (error) {}
    },
    async getDataList () {
      try {
        let { data } = await userAPIs.filterUserList({
          deptId: this.selectValue.departmentId,
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize,
          userPositionId: this.selectValue.positionId,
          userRoleId: this.selectValue.roleId,
          userEmail: this.searchResult && this.searchResult.keyword.indexOf('@') >= 0 ? this.searchResult.keyword : '',
          userName: this.searchResult && this.searchResult.keyword.indexOf('@') === -1 ? this.searchResult.keyword : ''
        })
        let powerList = [{
          id: 0,
          label: '查看'
        }, {
          id: 1,
          label: '下载'
        }, {
          id: 2,
          label: '上传'
        }, {
          id: 3,
          label: '编辑'
        }, {
          id: 4,
          label: '删除'
        }]
        let disableUser = async (row) => {
          try {
            let {data} = await userAPIs.updataUserIsDisable({
              userId: row.userId,
              isDisable: 1
            })
            if (data && data.code === 200) {
              this.$message({
                type: 'success',
                message: '用户已停用'
              })
              this.getDataList()
            }
          } catch (error) {}
        }
        let enableUser = async (row) => {
          try {
            let {data} = await userAPIs.updataUserIsDisable({
              userId: row.userId,
              isDisable: 0
            })
            if (data && data.code === 200) {
              this.$message({
                type: 'success',
                message: '用户已启用'
              })
              this.getDataList()
            }
          } catch (error) {}
        }
        this.pageInfo.total = data.data.totalCount
        if (this.$route.params && this.$route.params.keyword) {
          this.searchResult.total = data.data.totalCount ? data.data.totalCount : 0
        }
        if (data.code === 200) {
          data.data.pageList.forEach(item => {
            item.operate = [
              {
                textProp: '修改'
              },
              {
                textProp: item.isDisable === 0 ? '停用' : '启用'
              }
            ]
            let powerArr = item.powerList.split(',').sort((a, b) => a > b)
            let privilegeName = []
            // powerList.forEach(sub => {
            //   if (powerArr.indexOf(sub.id) >= -1) {
            //     privilegeName.push(sub.label)
            //   }
            // })
            powerArr.forEach(sub => {
              powerList.forEach(child => {
                if (child.id === +sub) {
                  privilegeName.push(child.label)
                }
              })
            })
            item.privilegeName = privilegeName.join(',')
          })
        }
        this.tableOptions = userListService(data.data.pageList).getOptions({that: this, disableUser, enableUser}).tableOptions
      } catch (error) {}
    },
    async getSearchUserList () {
      try {
        let { data } = await userAPIs.searchUserList({
          keyword: this.searchResult.keyword,
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize
        })
        let disableUser = async (row) => {
          try {
            let {data} = await userAPIs.updataUserIsDisable({
              userId: row.userId,
              isDisable: 1
            })
            if (data && data.code === 200) {
              this.$message({
                type: 'success',
                message: '用户已停用'
              })
              this.getDataList()
            }
          } catch (error) {}
        }
        let enableUser = async (row) => {
          try {
            let {data} = await userAPIs.updataUserIsDisable({
              userId: row.userId,
              isDisable: 0
            })
            if (data && data.code === 200) {
              this.$message({
                type: 'success',
                message: '用户已启用'
              })
              this.getDataList()
            }
          } catch (error) {}
        }
        if (data.code === 200) {
          this.pageInfo.total = data.data.pageInfo.totalNum
          this.searchResult.total = data.data.pageInfo.totalNum
          data.data.listInfo.forEach(item => {
            item.operate = [
              {
                textProp: '修改'
              },
              {
                textProp: item.isDisable === 0 ? '停用' : '启用'
              }
            ]
          })
        }
        this.tableOptions = userListService(data.data.listInfo).getOptions({that: this, disableUser, enableUser}).tableOptions
      } catch (error) {
        this.$message({
          type: 'error',
          message: '网络不通畅或者参数错误'
        })
        this.tableOptions = userListService([]).getOptions({that: this})
      }
    }
  },
  mounted () {
    this.resetOption()
    this.getSelectOption()
    this.getDataList()
  }
}
</script>
