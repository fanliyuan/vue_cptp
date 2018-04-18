/**
* 作者 ：食草狂魔
*
* 日期 ：2017/12/20
*
* 描述 ：产品列表页
*/
<template>
  <div class="container">
    <BreadCrumb :options="breadCrumbOption" class="mybreadcrumb" />
    <RightButton :options="rightButtonOption" />
    <SelectSearch :options="selectSearchOption" class="select"/>
    <div v-if="searchResult" class="mysearch">您搜索的关键词: <span class="red">{{searchResult.keyword}}</span> ,搜索结果<span class="red"> {{searchResult.total}} </span>个</div>
    <Table :options="tableOption" />
  </div>
</template>
<script>
import BreadCrumb from '../../components/breadcrumb/BreadCrumb'
import RightButton from '../../components/rightbutton/RightButton'
import SelectSearch from '../../components/select/SelectSearch'
import Table from '../../components/table/Table'
import productListService from './service/productListService'
export default {
  components: {
    SelectSearch,
    BreadCrumb,
    RightButton,
    Table
  },
  data () {
    // 展示数据components\breadcrumb\breadcrumb.vue
    let vm = this
    let temp = {
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
        }
      ],
      search: {
        searchHandler (val) {
          if (!val) val = 'all'
          vm.$router.push(`/product/search/${val}`)
        }
      }
    }
    let data = [
      {
        productName: [
          {
            textProp: '产品1'
          }
        ],
        productManager: '经理1',
        productId: 1,
        operation: [
          {
            textProp: '修改'
          },
          {
            textProp: '冻结'
          }
        ]
      }
    ]
    return {
      selectSearchOption: temp,
      breadCrumbOption: {
        bread: [
          {
            label: '产品列表'
          }
        ]
      },
      rightButtonOption: [
        {
          label: '添加产品',
          fun () {
            vm.$router.push('/product/editProduct')
          }
        }
      ],
      searchResult: null,
      tableOption: productListService(data).getTabelOptions({that: this})
    }
  },
  watch: {
    $route () {
      if (this.$route.params && this.$route.params.keyword) {
        this.breadCrumbOption = {bread: [{label: '产品管理', path: '/product'}, {label: '产品搜索'}]}
        this.searchResult = {
          keyword: this.$route.params.keyword,
          total: 9
        }
      } else {
        this.breadCrumbOption = {bread: [{label: '产品列表', path: '/product'}]}
        this.searchResult = null
      }
    }
  }
}
</script>
<style lang="less" scoped>
  // 引入全局样式文件
  @import '../../assets/less/_settings.less';
  .detailTitle {
    color: @text-color;
  }
  .container{
    width: 100%;
    padding: 20px;
  }
</style>
<style lang="less">
</style>
