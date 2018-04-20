<template>
  <div>
    <BreadCrumb :options="breadCrumbOption" class="mybreadcrumb" />
    <RightButton :options="rightButtonOption" />
    <SelectSearch :options="selectSearchOption" />
    <div v-if="searchResult" class="mysearch">您搜索的关键词: <span class="red">{{searchResult.keyword}}</span> ,搜索结果<span class="red"> {{searchResult.total}} </span>个</div>
    <Table :options="tableOption"/>
  </div>
</template>
<script>
import BreadCrumb from '../../components/breadcrumb/BreadCrumb'
import RightButton from '../../components/rightbutton/RightButton'
import SelectSearch from '../../components/select/SelectSearch'
import Table from '../../components/table/Table'
import projectListService from './service/projectListService'
export default {
  components: {
    BreadCrumb,
    RightButton,
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
      selectSearchOption: projectListService().getSelectSearchOption({that: this}),
      tableOption: projectListService().getTableOption({that: this, delFun}),
      searchResult: null
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
    }
  }
}
</script>
