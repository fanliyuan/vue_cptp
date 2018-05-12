<template>
  <div>
    <SelectSearch :options="selectSearchOption" />
    <div v-if="!searchResult ? searchResult :searchResult.keyword !=null" class="mysearch">您搜索的关键词: <span class="red">{{searchResult.keyword}}</span> ,搜索结果<span class="red"> {{searchResult.total}} </span>个</div>
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
      console.log('aaaaa' + row.projectId)
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
        total: 0
      },
      departmentList: [],
      departmentId: -1,
      managerList: [],
      selectFun1: () => {},
      deptId: -1,
      leaderId: -1,
      selectValue: {
        deptId: -1,
        leaderId: -1,
        projectName: '',
        projectLeader: ''
      }
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
        console.log('keyword' + this.searchResult.keyword)
        this.getDataList()
        //  let delFun = async (row) =>{
        //   let { data } = await projectAPIs.deleteProject({id: row.projectId})
        //   console.log("shsk"+data)
        //   try {
        //       if(data && data.code === 200){
        //         this.$message({
        //           type:'success',
        //           message:'项目删除成功'
        //         })
        //       }
        //   } catch (err){

        //   }
        //  }
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
      //   console.log(this.pageInfo)
      // 接口
      this.getDataList()
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
        let departmentList = await dicAPIs.selectInfoByValues({type: 'BUMENLEIXING'})
        let managerList = await dicAPIs.selectInfoByValues({type: 'FUZEREN'})
        // console.dir(departmentList.data.data)
        // console.dir(managerList.data.data)
        departmentList.data.data.forEach(item => {
          item.value = item.dictIndex + ''
          item.label = item.dictDesc
        })
        departmentList.data.data.unshift({
          value: '-1',
          label: '所有部门'
        })
        managerList.data.data.forEach(item => {
          item.value = item.dictIndex + ''
          item.label = item.dictDesc
        })
        managerList.data.data.unshift({
          value: '-1',
          label: '所有负责人'
        })
        //  this.pageInfo.total = data.data.pageInfo.totalNum
        //  this.searchResult.total = data.data.pageInfo.totalNum
        let selectFun1 = (val) => {
          // console.log(val+"aaaaaabbbbb")
        //  this.departmentId = +val
          this.selectValue.deptId = +val
          this.selectValue.leaderId = -1
          this.pageInfo.pageNum = 1
          this.getDataList()
          //   this.getManagerList(+val)
          this.selectSearchOption.select[1].value = '-1'
        }
        let selectFun2 = (val) => {
          // 这里调用数据更新接口
          // console.log(val, '更新数据')
          this.selectValue.deptId = -1
          this.selectValue.leaderId = +val
          this.pageInfo.pageNum = 1
          this.getDataList()
          this.selectSearchOption.select[0].value = '-1'
        }
        // let selectFun = async (deptId, leaderId) => {
        //   try {
        //     let {data} = await projectAPIs.filterProductList(
        //       {
        //         deptId,
        //         leaderId,
        //         pageNum: this.pageInfo.pageNum,
        //         pageSize: this.pageInfo.pageSize
        //       }
        //     )
        //     console.log(data+"1111111111111")
        //     // 这里项目列表数据
        //   } catch (error) {}
        // }
        this.selectSearchOption = projectListService().getSelectSearchOption({that: this, departmentList: departmentList.data.data, managerList: managerList.data.data, selectFun1, selectFun2})
      } catch (error) {}
    },
    async getDepartmenttList () {
      try {
        let { data } = await dicAPIs.selectInfoByValues({ type: 'BUMEN' })
        if (data.code === 200) {
          // console.dir(data.data)
          data.data.forEach(item => {
            item.value = item.dictIndex + ''
            item.label = item.dictDesc
          })
        }
        this.departmentList = data.data
        let selectFun1 = (val) => {
        //  console.log(val+"aaaaaabbbbb")
        //  this.departmentId = +val
          this.deptId = +val
          this.leaderId = -1
          this.pageInfo.pageNum = 1
          this.getDataList()
          //   this.getManagerList(+val)
          this.selectSearchOption.select[1].value = null
        }
        this.selectFun1 = selectFun1
        this.selectSearchOption = projectListService().getSelectSearchOption({
          that: this,
          departmentList: this.departmentList,
          managerList: this.managerList,
          selectFun1
        })
      } catch (error) {}
    },
    async getDataList () {
      if (this.searchResult && this.searchResult.keyword === 'all') {
        this.searchResult.keyword = null
      }
      try {
        let {data} = await projectAPIs.filterProductList(
          {
          //  deptId: this.deptId,
            // leaderId: this.leaderId,
            deptId: this.selectValue.deptId,
            leaderId: this.selectValue.leaderId,
            projectName: this.searchResult ? this.searchResult.keyword : '',
            projectLeader: this.searchResult ? this.searchResult.keyword : '',
            pageNum: this.pageInfo.pageNum,
            pageSize: this.pageInfo.pageSize
          }
        )
        let delFun = async (row) => {
          let { data } = await projectAPIs.deleteProject({projectId: row.projectId})
          console.log(data.data)
          try {
            if (data && data.code === 200) {
              this.$message({
                type: 'success',
                message: '项目删除成功'
              })
              this.getDataList()
            }
          } catch (err) {

          }
        }
        // console.log(data.data)
        let opetate = [
          {
            textProp: '修改'
          },
          {
            textProp: '删除'
          }
        ]
        // let product=[
        //   {
        //     textProp: '产品1',
        //     productId: 1
        //   },
        //   {
        //     textProp: '产品2',
        //     productId: 2
        //   }
        // ]
        let zancun = []
        let products = []
        if (this.$route.params && this.$route.params.keyword) {
          this.searchResult.total = data.data.totalCount ? data.data.totalCount : 0
        }
        if (data.code === 200) {
          this.pageInfo.total = data.data.totalCount
          data.data.pageList.forEach(item => {
            //  item.projectInfo.products=item.productList
            products = item.productList
            item.projectInfo.products = products
            item.projectInfo.operation = opetate
            zancun.push(item.projectInfo)
          })
          // console.log(zancun)
          this.tableOption = projectListService(zancun).getTableOption({ that: this, delFun })
        }
        // 这里项目列表数据
      } catch (error) {
        console.log(error)
      }
    },
    async getSearchList () {
      try {
        let {data} = await projectAPIs.searchProjectList({
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize,
          keyword: this.searchResult && this.searchResult.keyword.indexOf('@') === -1 ? this.searchResult.keyword : ''
        })
        this.pageHandler = val => {
          this.pageInfo.pageNum = val
          console.log(this.pageInfo)
          // 接口
          this.getSearchList()
        }
        if (data.code === 200) {
          this.pageInfo.total = data.data.pageInfo.totalNum
          this.searchResult.total = data.data.pageInfo.totalNum
          console.log(data.data)
          let opetate = [
            {
              textProp: '修改'
            },
            {
              textProp: '删除'
            }
          ]
          let delFun = async (row) => {
            let { data } = await projectAPIs.deleteProject({projectId: row.projectId})
            try {
              if (data && data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '项目删除成功'
                })
                this.getDataList()
              }
            } catch (err) {}
          }
          let zancun = []
          let products = []

          data.data.listInfo.forEach(item => {
            //  item.projectInfo.products=item.productList
            products = item.productList
            item.projectInfo.products = products
            item.projectInfo.operation = opetate
            zancun.push(item.projectInfo)
          })
          //  console.log(zancun)
          this.tableOption = projectListService(zancun).getTableOption({ that: this, delFun })
        }
        console.log(data)
      } catch (err) {
      }
    }
  },
  mounted () {
    this.resetOption()
    //  this.getDepartmenttList()
    //  this.getManagerList()
    this.getSelectList()
    this.getDataList()
  },
  created () {
    // this.getSelectList()
  }
}
</script>
