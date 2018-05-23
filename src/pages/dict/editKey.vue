/*
 * @Author: ChouEric
 * @Date: 2018-05-07 16:55:03
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-05-23 11:41:18
*/
<template>
  <div>
    <div class="myinput">
      <!-- <div class="box">
        <div class="label">字典类型</div>
        <el-select class="input" v-model="dictInfo.dictType" placeholder="请选择" >
          <el-option
            v-for="typeInfo in typeList"
            :key="typeInfo.id"
            :label="typeInfo.dictType"
            :value="typeInfo.id"
          >
          </el-option>
        </el-select>
      </div> -->
      <div class="box">
        <div class="label">字典值描述</div>
        <el-input class="input" v-model="dictInfo.dictDesc"></el-input>
      </div>
      <div>
        <el-button type="primary" class="submit" @click="submitHandler">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import editKey from './service/editKey'
// import userAPIs from '../../api/user/userAPIs'
import dicAPIs from '../../api/dic/dicAPIs'
export default {
  data () {
    return {
      dictInfo: {
      },
      typeList: [],
      breadCrumbOption: []
    }
  },
  watch: {
    $route () {
      if (this.$route.params && this.$route.params.id) {
        this.breadCrumbOption = editKey().getBreadCrumbOption({id: this.$route.params.id})
        let dictInfo = JSON.parse(sessionStorage.getItem('dictInfo'))
        this.dictInfo.type = this.getDictDesc(this.typeList, dictInfo.id)
      } else {
        this.breadCrumbOption = editKey().getBreadCrumbOption()
      }
      console.log(this.breadCrumbOption)
      this.resetOption()
    }
  },
  methods: {
    getDictDesc (dictList, selIndex) {
      for (var index in dictList) {
        if (dictList[index].dictType === selIndex) {
          return dictList[index].id
        }
      }
    },
    //  getDictDesc1 (dictList, selIndex) {
    //   for (var index in dictList) {
    //     if (dictList[index].id === selIndex) {
    //       return dictList[index].dictType
    //     }
    //   }
    // },
    // initail (){
    //   this.dictInfo={

    //   }
    //   this.typeList=[]
    // },
    getTypeList () {
      try {
        this.typeList = ''
        if (sessionStorage.getItem('editId')) {
          this.dictInfo = JSON.parse(sessionStorage.getItem('dictInfo'))
          this.breadCrumbOption = editKey().getBreadCrumbOption({id: sessionStorage.getItem('editId')})
        } else {
          this.breadCrumbOption = editKey().getBreadCrumbOption()
        }
        this.resetOption()
      } catch (error) {
      }
    },
    async submitHandler () {
      //  console.log("bshgs",this.dictInfo.dictType,this.typeList)
      let params = {
        id: sessionStorage.getItem('editId'),
        dictDesc: this.dictInfo.dictDesc
      }
      try {
        if (sessionStorage.getItem('editId')) {
          if (Object.values(params).indexOf(null) !== -1 || Object.values(params).indexOf(undefined) !== -1) {
            this.$message({
              type: 'error',
              message: '选择不能为空'
            })
            return false
          }
          let {data} = await dicAPIs.updateSystemDictType(params)
          if (data.code === 200) {
            this.$message({
              type: 'success',
              message: data.message
            })
          } else {
            this.$message({
              type: 'error',
              message: '修改失败'
            })
          }
        } else {
          let params = {
            desc: this.dictInfo.dictDesc
          }
          if (Object.values(params).indexOf(null) !== -1) {
            this.$message({
              type: 'error',
              message: '选择不能为空'
            })
            return false
          }
          let {data} = await dicAPIs.saveDictType(params)
          if (data.code === 200) {
            this.$message({
              type: 'success',
              message: data.message
            })
          } else {
            this.$message({
              type: 'error',
              message: '添加失败'
            })
          }
        }
        this.$router.push('/dict/key')
      } catch (error) {

      }
    },
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadCrumbOption,
        rightButtonOption: null
      })
    }
  },
  mounted () {
    this.resetOption()
    this.getTypeList()
  }
}

</script>
<style lang="less" scoped>
  .myinput {
    width: 560px;
  //  height: 630px;
    height:auto;
    background: white;
    box-shadow: 0px 1px 0px 2px #d9d9d9;
    border-radius: 5px;
    // margin-left: 50%;//注释的内容为块元素居中方法
    position: relative;
    // left: -280px;//注释的内容为块元素居中方法
    // transform: translateX(-50%);//注释的内容为块元素居中方法
    margin: 50px auto 0px;
    font-size: 16px;
    box-sizing: border-box;
    padding: 80px 0px;
    .box{
      height: 62px;
    }
    .label {
      width: 170px;
      display: inline-block;
      text-align: right;
    }
    .silver{
      color: silver;
    }
    .username{
      padding: 20px;
      display: inline-block;
    }
    .input{
      width: 310px;
      margin-left: 10px;
    }
    .submit{
      margin-left: 200px;
      margin-top: 20px;
      padding: 10px 78px;
    }
  }
</style>
