<template>
  <div>
    <el-dialog :visible.sync="addPositionClass" class="mydialog" :width="'30%'">
      <div class="dialogbox">
        <span class="label">职位类型</span>
        <el-input v-model="positionClassValue" class="input"></el-input>
      </div>
      <div class="dialogbox">
        <span class="label">对应职位</span>
        <!-- <el-input v-model="editPositionClassInfo.newPosition" class="input"></el-input> -->
        <el-select v-model="editPositionClassInfo.newPosition" class="input" @change="changeHandler">
          <el-option v-for="item in positionList" :label="item.dictDesc" :value="item.id" :key="item.dictDesc + item.dictIndex + item.id"></el-option>
        </el-select>
      </div>
      <el-button type="primary" class="button" @click="addHandler">确定</el-button>
    </el-dialog>
    <Tabel :options="tableOptions" />
    <el-pagination v-if="pageInfo.total > 10" :total="pageInfo.total" :current-page="pageInfo.pageNum" :page-size="pageInfo.pageSize" background layout="prev, pager, next, jumper" class="mypagenation" @current-change="pageHandler"></el-pagination>
    <el-dialog :visible.sync="editPositionClass" class="mydialog" :width="'30%'">
      <div class="dialogbox">
        <span class="label">原职位类型</span>
        <el-input v-model="editPositionClassInfo.parentDesc" class="input" readonly=""></el-input>
      </div>
      <div class="dialogbox">
        <span class="label">新职位类型</span>
        <!-- <el-input v-model="editPositionClassInfo.newPositionClass" class="input"></el-input> -->
        <el-select v-model="editPositionClassInfo.newPositionClass" class="input" @change="positionClassSelectHandler">
          <el-option v-for="item in positionClassList" :label="item.dictDesc" :value="item.id" :key="item.dictDesc + item.dictIndex + item.id"></el-option>
        </el-select>
      </div>
      <div class="dialogbox">
        <span class="label">对应的职位</span>
        <el-input v-model="editPositionClassInfo.dictDesc" class="input" disabled></el-input>
        <!-- <el-select v-model="editPositionClassInfo.newPosition" class="input" @change="changeHandler">
          <el-option v-for="item in positionList" :label="item.dictDesc" :value="item.id" :key="item.dictDesc + item.dictIndex + item.id"></el-option>
        </el-select> -->
      </div>
      <el-button type="primary" class="button" @click="editHandler">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>
import Tabel from '../../components/table/Table'
import editPositionClassService from './service/editPositionClassService'
import dicAPIs from '../../api/dic/dicAPIs'
export default {
  components: {
    Tabel
  },
  data () {
    let vm = this
    let editFun = (row) => {
      this.editPositionClassInfo = {
        oldValue: row.positionClass
      }
      this.editPositionClass = true
    }
    let delFun = (row) => {
      this.$confirm(`是否删除 ${row.positionClass} 职位类型`).then(data => {
        if (data) {
          // 这里调用删除接口
          console.log('确认删除')
        } else {
          this.$message('取消删除')
        }
      }).catch(err => {
        if (err) {
          this.$message('取消删除')
        }
      })
    }
    return {
      breadCrumbOptions: {
        bread: [
          {
            label: '权限管理',
            path: '/auth'
          },
          {
            label: '职位类型设置'
          }
        ]
      },
      tableOptions: editPositionClassService([]).getTableOption({editFun, delFun}),
      rightButtonOptions: [
        // {
        //   label: '添加职位类型',
        //   fun () {
        //     // vm.addPositionClass = true
        //     // vm.getPositionList()
        //     vm.$router.push('./editPositionType')
        //   }
        // }
      ],
      addPositionClass: false,
      positionClassValue: '',
      editPositionClass: false,
      editPositionClassInfo: {},
      pageInfo: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      positionList: [],
      positionClassList: [],
      positionDictDesc: '',
      positionInfo: {},
      positionClassLength: 0,
      positionParent: 0,
      addFlag: false
    }
  },
  methods: {
    async addHandler () {
      // if (!this.addFlag) {
      //   this.$message({
      //     type: 'error',
      //     message: '职位选择不能为空'
      //   })
      //   return false
      // }
      // let param = {
      //   positionIndex: this.positionInfo.dictIndex,
      //   positionTypeValue: this.positionClassValue,
      //   positionValue: this.positionInfo.dictDesc
      // }
      // try {
      //   // var { data } = await dicAPIs.saveDictValue(param)
      //   // if (data.code === 200) {
      //   //   this.positionInfo.dictParent = data.data.id
      //   // }
      //   // var {data} = await dicAPIs.updateSystemDictValue(this.positionInfo)//  eslint-disable-line
      //   let {data} = await dicAPIs.saveDictPostionInfo(param)
      //   if (data.code === 200) {
      //     this.$message({
      //       type: 'success',
      //       message: '添加成功'
      //     })
      //     this.positionInfo = {}
      //     this.getPositionList()
      //     this.getPositionClassList()
      //     this.addFlag = false
      //   }
      // } catch (error) {}
      // this.addPositionClass = false
      // this.editPositionClassInfo.newPosition = null
    },
    async editHandler () {
      // 这里调用更新接口, 这里原来有同时修改职位类型和职位接口 *************************************************
      // alert(`${this.editPositionClassInfo.oldValue}修改成功`)
      // console.log(this.editPositionClassInfo)
      // this.updateSystemDictValue()
      // let param = {
      //   dictDesc: this.editPositionClassInfo.newPositionClass,
      //   dictType: 'ZHIWEILEIXING',
      //   dictIndex: this.editPositionClassInfo.parentIndex,
      //   dictParent: 0,
      //   id: this.editPositionClassInfo.dictParent,
      //   dictValue: ''
      // }
      // this.positionInfo.dictParent = this.editPositionClassInfo.dictParent
      // try {
      //   let flag1
      //   let flag2
      //   var {data} = await dicAPIs.updateSystemDictValue(param)
      //   if (data.code === 200) {
      //     flag1 = true
      //   }
      //   var {data} = await dicAPIs.updateSystemDictValue(this.positionInfo)//  eslint-disable-line
      //   if (data.code === 200) {
      //     flag2 = true
      //   }
      //   if (flag1 && flag2) {
      //     this.$message({
      //       type: 'success',
      //       message: '修改成功'
      //     })
      //     this.getDataList()
      //     this.positionInfo = {}
      //   }
      // } catch (error) {}
      // this.editPositionClass = false
      // this.editPositionClassInfo.newPosition = null
      // 这里只能修改职位信息的职位类型 ***************************************************************************
      try {
        let { data } = await dicAPIs.updateSystemDictValue({
          dictDesc: this.editPositionClassInfo.dictDesc,
          dictIndex: this.editPositionClassInfo.dictIndex,
          dictParent: this.positionParent,
          dictType: this.editPositionClassInfo.dictType,
          dictValue: this.editPositionClassInfo.dictValue,
          id: this.editPositionClassInfo.id
        })
        if (data.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.getPositionList()
        }
      } catch (error) {}
      this.editPositionClass = false
    },
    pageHandler (val) {
      this.pageInfo.pageNum = val
      // console.log(this.pageInfo)
      // 调用接口
    },
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadCrumbOptions,
        rightButtonOption: this.rightButtonOptions
      })
    },
    // async getDataList () {
    //   try {
    //     var { data } = await dicAPIs.selectInfoByValues({ type: 'ZHIWEILEIXING' })
    //     let arr = []
    //     let operation = [
    //       {
    //         textProp: '修改'
    //       },
    //       {
    //         textProp: '删除'
    //       }
    //     ]
    //     this.positionClassLength = data.data.length
    //     data.data.forEach(async (item) => {
    //       try {
    //         var { data } = await dicAPIs.queryDictValueInfo({ parentId: item.id })
    //         if (data.code === 200) {
    //           data.data.forEach(sub => {
    //             sub.parentDesc = item.dictDesc
    //             sub.parentIndex = item.dictIndex
    //             sub.operation = operation
    //             arr.push(sub)
    //           })
    //         }
    //       } catch (error) {}
    //     })
    //     let editFun = async (row) => {
    //       this.editPositionClassInfo = row
    //       // this.this.positionDictDesc = row.dictDesc
    //       this.editPositionClass = true
    //       // let arr = this.tableOptions.data.filter(item => {
    //       //   return item.dictParent = row.dictParent
    //       // })
    //       // this.positionList = arr
    //       try {
    //         let { data } = await dicAPIs.selectInfoByValues({ type: 'ZHIWEIXINXI' })
    //         if (data.code === 200) {
    //           this.positionList = data.data
    //         }
    //       } catch (error) {}
    //     }
    //     let delFun = async (row) => {
    //       this.$confirm(`是否删除 ${row.parentDesc} 职位类型`).then(async (data) => {
    //         if (data) {
    //           // 这里调用删除接口
    //           // alert('这里暂时不知道删除职位类型还是职位,如果是职位类型,那么删除的有点多吧')
    //           let { data } = await dicAPIs.deleteDictValue({ id: row.id })
    //           if (data.code === 200) {
    //             this.$message({
    //               type: 'success',
    //               message: '删除成功'
    //             })
    //             this.getDataList()
    //           }
    //         } else {
    //           this.$message('取消删除')
    //         }
    //       }).catch(err => {
    //         if (err) {
    //           this.$message('取消删除')
    //         }
    //       })
    //     }
    //     this.tableOptions = editPositionClassService(arr).getTableOption({editFun, delFun})
    //     // var { data } = await dicAPIs.queryDictValueInfo({ parentId:})
    //   } catch (error) {}
    // },
    async changeHandler (val) {
      try {
        let { data } = await dicAPIs.selectSystemDictValueInfo({ id: val })
        if (data.code === 200) {
          this.positionInfo = data.data
          this.addFlag = true
        }
      } catch (error) {}
    },
    async getPositionList () {
      try {
        let { data } = await dicAPIs.selectInfoByValues({ type: 'ZHIWEIXINXI' })
        if (data.code === 200) {
          this.positionList = data.data
          this.getTableOption()
        }
      } catch (error) {}
    },
    async getPositionClassList () {
      try {
        let { data } = await dicAPIs.selectInfoByValues({ type: 'ZHIWEILEIXING' })
        if (data.code === 200) {
          this.positionClassList = data.data
          this.positionClassLength = data.data.length
        }
      } catch (error) {}
    },
    getTableOption () {
      let operation = [
        {
          textProp: '修改'
        },
        {
          textProp: '删除'
        }
      ]
      let arr = []
      this.positionList.forEach(async (item) => {
        try {
          let { data } = await dicAPIs.selectSystemDictValueInfo({ id: item.dictParent })
          if (data.code === 200) {
            item.parentDesc = data.data.dictDesc
            item.operation = operation
            arr.push(item)
          } else {
            item.parentDesc = '暂无'
            item.operation = operation
            arr.push(item)
          }
        } catch (error) {}
      })
      let editFun = async (row) => {
        this.editPositionClassInfo = row
        // this.this.positionDictDesc = row.dictDesc
        this.editPositionClass = true
        // let arr = this.tableOptions.data.filter(item => {
        //   return item.dictParent = row.dictParent
        // })
        // this.positionList = arr
        // try {
        //   let { data } = await dicAPIs.selectInfoByValues({ type: 'ZHIWEIXINXI' })
        //   if (data.code === 200) {
        //     this.positionList = data.data
        //   }
        // } catch (error) {}
      }
      let delFun = async (row) => {
        this.$confirm(`是否删除 ${row.parentDesc} 职位类型`).then(async (flag) => {
          if (flag) {
            // 这里调用删除接口
            let { data } = await dicAPIs.deleteDictValue({ id: row.dictParent })
            if (data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getPositionList()
              this.getPositionClassList()
            } else {
              this.$message({
                type: 'error',
                message: '操作失败'
              })
            }
          } else {
            this.$message('取消删除')
          }
        }).catch(err => {
          if (err) {
            this.$message('取消删除')
          }
        })
      }
      this.tableOptions = editPositionClassService(arr).getTableOption({editFun, delFun})
    },
    positionClassSelectHandler (val) {
      this.positionParent = +val
    }
  },
  mounted () {
    this.resetOption()
    this.getPositionList()
    this.getPositionClassList()
    // this.getDataList()
  }
}
</script>
<style lang="less" scoped>
.mydialog{
  .label{
    margin-left: 10%;
  }
  .input{
    display: inline-block;
    margin-left: 20px;
    width: 60%;
  }
  .dialogbox{
    // width: 500px;
    margin: 0 auto 30px;
    display: block;
  }
  .button{
    display: block;
    margin: 0 auto 20px;
    padding: 10px 100px;
  }
}
</style>
<style lang="less">
.myoperation{
  display: inline-block;
  width: 50%;
  text-align: center;
  box-sizing: border-box;
}
</style>
