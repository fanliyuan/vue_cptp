/*
 * @Author: ChouEric
 * @Date: 2018-05-09 10:26:48
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-05-23 10:40:44
*/
<template>
  <div>
    <el-row :type="'flex'"  class="header_content" style="align-items:center">
        <el-col :span="20">
          <!-- <el-row :type="'flex'" style="align-items:center;">
            <el-col :span="2" class="words"><span>字典key</span></el-col>
            <el-col :span="4">
              <el-input class="my-input"></el-input>
            </el-col>
            <el-col :span="2" :offset="1" class="words"><span>字典描述</span></el-col>
            <el-col :span="4">
              <el-input class="my-input"></el-input>
            </el-col>
          </el-row> -->
          <div v-if="!searchResult ? searchResult :searchResult.keyword !=null" class="mysearch">您搜索的关键词: <span class="red">{{searchResult.keyword}}</span> ,搜索结果<span class="red"> {{searchResult.total}} </span>个</div>
        </el-col>
        <el-col :span="4">
          <el-input v-model="options.search.value" @keypress.enter.native="searchHandler(options.search.value)">
          <i
            class="el-icon-search el-input__icon"
            slot="suffix"
            @click="searchHandler(options.search.value)">
          </i>
        </el-input>
        </el-col>
    </el-row>

    <Table :options="tableOptions"></Table>
    <el-pagination v-if="pageInfo.total > 10" :total="pageInfo.total" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" background layout="prev, pager, next, jumper" class="mypagenation" @current-change="pageHandler"></el-pagination>
  </div>
</template>
<script>
import Table from '../../components/table/Table'
import valueService from './service/dictKeyListService'
// import SelectSearch from '../../components/select/SelectSearch'
import dicAPIs from '../../api/dic/dicAPIs'
// import dictAPIs from '../../api/dict/dictAPIs'
export default {
  components: {
    Table
  },
  data () {
    return {
      breadCrumbOption: {
        bread: [
          {
            label: '字典类型'
          }
        ]
      },
      rightButtonOption: valueService().getRightButtonOption({that: this}),
      tableOptions: valueService().getTableOption({that: this}),
      searchResult: null,
      options: {
        search: {
          value: ''
        }
      },
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      }
    }
  },
  watch: {
    $route () {
      if (this.$route.params && this.$route.params.keyword) {
        this.searchResult = {keyword: this.$route.params.keyword, total: 0}
        this.breadCrumbOption.bread = [
          {
            label: '字典类型',
            path: '/dict/key'
          },
          {
            label: '字典类型搜索页'
          }
        ]
        this.getDataList()
      } else {
        this.searchResult = null
        this.options.search.value = ''
        this.breadCrumbOption.bread = [
          {
            label: '字典类型'
          }
        ]
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
    searchHandler (val) {
      if (!val) val = 'all'
      this.$router.push(`/dict/key/search/${val}`)
    },
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadCrumbOption,
        rightButtonOption: this.rightButtonOption
      })
    },
    async getDataList () {
      if (this.searchResult && this.searchResult.keyword === 'all') {
        this.searchResult.keyword = null
      // this.searchResult = null
      }
      try {
        let {data} = await dicAPIs.getTypeInfoList({
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize,
          type: this.searchResult ? this.searchResult.keyword : '',
          desc: this.searchResult ? this.searchResult.keyword : ''
        })
        let operate = [
          {
            textProp: '修改'
          },
          {
            textProp: '删除'
          }
        ]
        //  console.log("keys",data)
        if (data.code === 200) {
          if (this.$route.params && this.$route.params.keyword) {
            this.searchResult.total = data.data.totalCount ? data.data.totalCount : 0
          }
          this.pageInfo.total = data.data.totalCount
          data.data.pageList.forEach(item => {
            item.operation = operate
          })
        }
        let delFun = async (row) => {
          let {data} = await dicAPIs.deleteDictType({id: row.id})
          try {
            if (data && data.code === 200) {
              this.$message({
                type: 'success',
                message: '字典类型删除成功'
              })
              this.getDataList()
            } else {
              this.$message({
                type: 'error',
                message: `${data.message}`
              })
            }
          } catch (err) {

          }
        }
        this.tableOptions = valueService(data.data.pageList).getTableOption({that: this, delFun})
      } catch (error) {

      }
    },
    async getSearchList () {
      try {

      } catch (error) {

      }
    }
  },
  mounted () {
    this.resetOption()
    this.getDataList()
  }
}
</script>
<style lang="less" scoped>
  .header_content{
    padding-right:40px;
    margin-bottom:10px;
  }
  .el-icon-search{
    font-size: 24px;
  }
  .el-icon-search{
    cursor: pointer;
  }
  .my-input{
    margin-right:20px;
  }
  .words{
    font-size:14px;
    overflow:hidden;
    span{
      float:right;
      margin-right:10px;
    }
  }
</style>
