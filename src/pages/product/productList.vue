/*
 * @Author: ChouEric
 * @Date: 2018-04-26 16:53:40
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-05-23 14:15:25
*/

<template>
  <div class="container">
    <SelectSearch :options="selectSearchOption" class="select"/>
    <div v-if="searchResult" class="mysearch">您搜索的关键词: <span class="red">{{searchResult.keyword}}</span> ,搜索结果<span class="red"> {{searchResult.total}} </span>个</div>
    <Table :options="tableOption" />
    <el-pagination v-if="pageInfo.total > 10" :total="pageInfo.total" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" background layout="prev, pager, next, jumper" class="mypagenation" @current-change="pageHandler"></el-pagination>
  </div>
</template>
<script>
import SelectSearch from '../../components/select/SelectSearch'
import Table from '../../components/table/Table'
import productListService from './service/productListService'
import dicAPIs from '../../api/dic/dicAPIs'
import productAPIs from '../../api/product/productAPIs'
export default {
  components: {
    SelectSearch,
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
          value: '',
          className: 'my-select',
          option: [
          ]
        }
      ],
      search: {
        searchHandler (val) {
          if (!val) return false
          vm.$router.push(`/product/search/${val}`)
        }
      }
    }
    let data = []
    let forbidFun = (row) => {
      this.$router.push('/product/productFobidden')
    }
    return {
      selectSearchOption: temp,
      breadCrumbOption: {
        bread: [
          {
            label: '产品列表'
          }
        ]
      },
      rightButtonOption: [],
      searchResult: null,
      tableOption: productListService(data).getTabelOptions({that: this, forbidFun}),
      pageInfo: {
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      status: -1,
      isDisabled: false
    }
  },
  watch: {
    $route () {
      if (this.$route.params && this.$route.params.keyword) {
        this.pageInfo.pageSize = 10
        this.pageInfo.pageNum = 1
        this.breadCrumbOption = {bread: [{label: '产品管理', path: '/product'}, {label: '产品搜索'}]}
        let getSearchResult = async () => {
          let { data } = await productAPIs.getProductList({
            name: this.$route.params.keyword,
            pm: this.$route.params.keyword,
            pageSize: this.pageInfo.pageSize,
            pageNum: this.pageInfo.pageNum,
            status: -1
          })
          try {
            let operation = [
              {
                textProp: '修改'
              },
              {
              	textProp:'删除'
              },
              {
                textProp: '冻结'
              }
            ]
            
            let forbidFun = async (row) => {
              // 调用冻结接口
              // console.log(row.productName[0].textProp)
              // row.frozenStatus = '1'
              let { data } = await productAPIs.updateProductFrozenStatus({id: row.productId, status: 1})
              try {
                if (data && data.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '冻结成功'
                  })
                  this.$router.push('/product/productFobidden')
                }
              } catch (error) {
                console.log()
              }
            }
            
            let deleteFun = async (row) => {
	        	let vm = this;
	        	if(row.frozenStatus === '1'){
	        		vm.$message({
			          message: '只有未冻结状态下的产品才可以删除!',
			          type: 'warning'
			        });
	        	}else{
	    			vm.$confirm('是否删除此产品?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
//			        	let { data } = await productAPIs.deleteProduct({productId: row.productId});
			        	productAPIs.deleteProduct({productId: row.productId}).then(({data}) => {
				        	if(data.code == 200){
				        		vm.$message({
				        		  type: 'success',
				        		  message: '删除成功!'
				        		});
		    					vm.getProductList();
				        	}else{
			        			vm.$message({
						          message: `${data.message}`,
						          type: 'warning'
						        });
			        		}
			        	})
			        }).catch(() => {
			          vm.$message({
			            type: 'info',
			            message: '已取消删除'
			          });          
			        });
	        	}
	        }
            this.pageInfo.total = data.data.totalCount
            if (!data.data.pageList) {
              this.searchResult = {
                keyword: this.$route.params.keyword,
                total: 0
              }
              this.tableOption = productListService([]).getTabelOptions({that: this, forbidFun,deleteFun})
              return false
            }
            data.data.pageList.forEach(item => {
              item.operation = operation
              item.productName = [{textProp: item.productName}]
              if (item.frozenStatus === '1') {
	            item.operation = [
	              {
	                textProp: '修改'
	              },
	              {
	              	textProp:'删除'
	              },
	              {
	                textProp: '已冻结'
	              }
	            ]
	          } else {
	            item.operation = [
	              {
	                textProp: '修改'
	              },
	              {
	              	textProp:'删除'
	              },
	              {
	                textProp: '冻结'
	              }
	            ]
	          }
              
              
            })
            this.tableOption = productListService(data.data.pageList).getTabelOptions({that: this, forbidFun,deleteFun})
            this.pageInfo.total = data.data.totalCount
            this.searchResult = {
              keyword: this.$route.params.keyword,
              total: data.data.totalCount
            }
          } catch (error) {
            console.log()
            return null
          }
        }
        getSearchResult()
      } else {
        this.breadCrumbOption = {bread: [{label: '产品列表', path: '/product'}]}
        this.searchResult = null
      }
      this.resetOption()
    }
  },
  methods: {
    pageHandler (val) {
      this.pageInfo.pageNum = val
      this.getProductList()
    },
    resetOption () {
      this.rightButtonOption = [
        {
          label: '添加产品',
          isDisabled: this.isDisabled,
          fun: () => {
            this.$router.push('/product/editProduct')
          }
        }
      ]
      this.$emit('data', {
        breadCrumbOption: this.breadCrumbOption,
        rightButtonOption: this.rightButtonOption
      })
    },
    async getStateList () {
      try {
        let { data } = await dicAPIs.selectInfoByValues({ type: 'CHANPINZHUANGTAI' })
        let option = []
        data.data.forEach(item => {
          option.push({
            label: item.dictDesc,
            value: item.dictIndex
          })
        })
        option.unshift({
          label: '所有状态',
          value: -1
        })
        let vm = this
        this.selectSearchOption = {
          select: [
            {
              selectHandler (val) {
                vm.$router.push('/product')
                vm.searchResult = null
                vm.status = val
                vm.pageInfo.pageNum = 1
                vm.getProductList()
              },
              value: -1,
              className: 'my-select',
              option
            }
          ],
          search: {
            searchHandler (val) {
              if (!val) {
                vm.searchResult = null
                vm.getProductList()
                return vm.$router.push('/product')
              }
              vm.$router.push(`/product/search/${val}`)
            }
          }
        }
      } catch (error) {
      }
    },
    async getProductList () {
      try {
        let { data } = await productAPIs.getProductList({
          name: this.searchResult ? this.searchResult.keyword : '',
          pageNum: this.pageInfo.pageNum,
          pageSize: this.pageInfo.pageSize,
          pm: this.searchResult ? this.searchResult.keyword : '',
          status: this.status
        })
        // let operation = [
        //   {
        //     textProp: '修改'
        //   },
        //   {
        //     textProp: '冻结'
        //   }
        // ]
        let forbidFun = async (row) => {
          // 调用冻结接口
          // console.log(row.productName[0].textProp)
          // row.frozenStatus = '1'
          let { data } = await productAPIs.updateProductFrozenStatus({id: row.productId, status: 1})
          try {
            if (data && data.code === 200) {
              this.$message({
                type: 'success',
                message: '冻结成功'
              })
              this.$router.push('/product/productFobidden')
            }
          } catch (error) {
            console.log()
          }
        }
        //0--冻结,1--已冻结
        let deleteFun = async (row) => {
        	console.log(row)
        	let vm = this;
        	if(row.frozenStatus === '1'){
        		vm.$message({
		          message: '只有未冻结状态下的产品才可以删除!',
		          type: 'warning'
		        });
        	}else{
    			vm.$confirm('是否删除此产品?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
//		        	let { data } = await productAPIs.deleteProduct({productId: row.productId})
		        	productAPIs.deleteProduct({productId: row.productId}).then(({data}) =>{
			        	if(data.code == 200){
			        		vm.$message({
			        		  type: 'success',
			        		  message: '删除成功!'
			        		});
	    					vm.getProductList();
			        	}else{
		        			vm.$message({
					          message: `${data.message}`,
					          type: 'warning'
					        });
		        		}
		        	})
		        }).catch(() => {
		          vm.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
        	}
        }
        if (!data.data.pageList) {
          this.pageInfo.total = 0
          this.tableOption = productListService([]).getTabelOptions({that: this, forbidFun,deleteFun})
          return false
        }
        this.pageInfo.total = data.data.totalCount
        data.data.pageList.forEach(item => {
          if (item.frozenStatus === '1') {
            item.operation = [
              {
                textProp: '修改'
              },
              {
              	textProp:'删除'
              },
              {
                textProp: '已冻结'
              }
            ]
          } else {
            item.operation = [
              {
                textProp: '修改'
              },
              {
              	textProp:'删除'
              },
              {
                textProp: '冻结'
              }
            ]
          }
          item.productName = [{textProp: item.productName}]
        })
        this.tableOption = productListService(data.data.pageList).getTabelOptions({that: this, forbidFun,deleteFun})
      } catch (error) {
      }
    },
    checkAuth () {
    }
  },
  mounted () {
    if (this.$route.params) {
      this.$router.push('/product')
    }
    this.resetOption()
    this.getStateList()
    this.getProductList()
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
