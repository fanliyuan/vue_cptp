<template>
  <div>
    <SelectSearch :options="selectSearchOption" />
    <div v-if="searchResult" class="mysearch">您搜索的关键词: <span class="red">{{searchResult.keyword}}</span> ,搜索结果<span class="red"> {{searchResult.total}} </span>个</div>
    <Table :options="tableOption"/>
    <el-pagination v-if="pageInfo.total > 10" :total="pageInfo.total" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" background layout="prev, pager, next, jumper" class="mypagenation" @current-change="pageHandler"></el-pagination>
  </div>
</template>
<script>
import SelectSearch from '../../components/select/SelectSearch'
import Table from '../../components/table/Table'
import projectListService from './service/projectListService'
import dicAPIs from '../../api/dic/dicAPIs'
import projectAPIs from '../../api/project/projectAPIs'
export default {
  components: {
    SelectSearch,
    Table
  },
  data () {
    let delFun = (row) => {
      console.log(row.projectId)
    }
    return {
      breadCrumbOption: projectListService().getBreadCrumbOption(),
      rightButtonOption: projectListService().getRightButtonOption({that: this}),
      selectSearchOption: projectListService().getSelectSearchOption({that: this, selectList: []}),
      tableOption: projectListService().getTableOption({that: this, delFun}),
      searchResult: null,
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 11
      },
      departmentList: [],
      departmentId: -1,
      managerList: [],
      selectFun1: () => {},
      deptId: -1,
      leaderId: -1
    }
  },
  watch: {
    $route () {
      if (this.$route.params && this.$route.params.keyword) {
        this.searchResult = {keyword: this.$route.params.keyword, total: 9}
        this.breadCrumbOption.bread = [
          {
            label: '项目管理',
            path: '/project'
          },
          {
            label: '项目搜索页'
          }
        ]
      } else {
        this.searchResult = null
        this.breadCrumbOption.bread = [
          {
            label: '项目列表'
          }
        ]
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
    // 级联不能混写
    async getSelectList () {
      try {
        let departmentList = await dicAPIs.selectInfoByValues({type: 'BUMEN'})
        let managerList = await dicAPIs.selectInfoByValues({type: 'FUZEREN'})
        departmentList.data.data.forEach(item => {
          item.value = item.dictIndex + ''
          item.label = item.dictDesc
        })
        managerList.data.data.forEach(item => {
          item.value = item.dictIndex + ''
          item.label = item.dictDesc
        })
        let selectFun = async (deptId, leaderId) => {
          try {
            let {data} = await projectAPIs.filterProductList(
              {
                deptId,
                leaderId,
                pageNum: this.pageInfo.pageNum,
                pageSize: this.pageInfo.pageSize
              }
            )
            console.log(data)
            // 这里项目列表数据
          } catch (error) {}
        }
        this.selectSearchOption = projectListService().getSelectSearchOption({that: this, departmentList: departmentList.data.data, managerList: managerList.data.data, selectFun})
      } catch (error) {}
    },
    async getDepartmenttList () {
      try {
        let { data } = await dicAPIs.selectInfoByValues({ type: 'BUMEN' })
        if (data.code === 200) {
          data.data.forEach(item => {
            item.value = item.dictIndex + ''
            item.label = item.dictDesc
          })
        }
        this.departmentList = data.data
        let selectFun1 = (val) => {
          this.departmentId = +val
          this.getManagerList(+val)
        }
        this.selectFun1 = selectFun1
        this.selectSearchOption = projectListService().getSelectSearchOption({
          that: this,
          departmentList: this.departmentList,
          selectFun1
        })
      } catch (error) {}
    },
    async getManagerList (val) {
      try {
        let { data } = await dicAPIs.queryDictValueInfo({ parentId: val })
        let selectFun2 = (val) => {
          // 这里调用数据更新接口
          // console.log(val, '更新数据')
          this.deptId = -1
          this.pageInfo.pageNum = 1
          this.getDataList()
        }
        if (data.code === 200) {
          data.data.forEach(item => {
            item.value = item.dictIndex + ''
            item.label = item.dictDesc
          })
        }
        this.selectSearchOption = projectListService().getSelectSearchOption({
          that: this,
          departmentList: this.departmentList,
          selectFun1: this.selectFun1,
          managerList: data.data,
          selectFun2
        })
      } catch (error) {}
    },
    async getDataList () {
      try {
        let {data} = await projectAPIs.filterProductList(
          {
            deptId: this.deptId,
            leaderId: this.leaderId,
            pageNum: this.pageInfo.pageNum,
            pageSize: this.pageInfo.pageSize
          }
        )
        console.log(data)
        // 这里项目列表数据
      } catch (error) {}
    }
  },
  mounted () {
    this.resetOption()
    this.getDepartmenttList()
    this.getDataList()
  },
  created () {
    // this.getSelectList()
  }
}
</script>
