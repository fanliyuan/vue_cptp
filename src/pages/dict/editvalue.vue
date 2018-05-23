/*
 * @Author: ChouEric
 * @Date: 2018-05-07 16:55:03
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-05-23 11:05:54
*/
<template>
  <div>
    <div class="myinput">
      <div class="box" v-if="isId && isParent==='0'">
        <div class="label">字典类型</div>
        <el-select class="input" v-model="addType" placeholder="请选择" >
          <el-option
            v-for="keyInfo in oneList"
            :key="keyInfo.id"
            :label="keyInfo.dictType"
            :value="keyInfo.dictType"
          >
          </el-option>
        </el-select>
      </div>
      <div class="box">
        <div class="label">字典值描述</div>
        <el-input class="input" v-model="dictInfo.dictDesc"></el-input>
      </div>
      <div class="box">
        <div class="label">是否父类</div>
          <el-radio label="0" v-model="isParent" style="margin-left:10px;">是</el-radio>
          <el-radio label="1" v-model="isParent">否</el-radio>
      </div>
      <!-- 下拉列表-->
        <div class="name select" v-if="isParent === '1'">
          <el-select class="input" v-model="classInfo.oneClass" @change="dictSelcet('one', classInfo.oneClass)">
            <el-option v-for="(item) in oneList" :key="item.id" :label="item.dictType" :value="item.dictType"></el-option>
          </el-select>
        </div>
        <div class="name select" v-if="twoList.length > 0">
          <el-select class="input" v-model="classInfo.twoClass" @change="dictSelcet('two' ,classInfo.twoClass)">
            <el-option v-for="(item) in twoList" :key="item.id" :label="item.dictDesc" :value="item.id"></el-option>
          </el-select>
        </div>
      <!-- 下拉列表结束-->
      <div>
        <el-button type="primary" class="submit" @click="submitHandler">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import editValue from './service/editValue'
import dicAPIs from '../../api/dic/dicAPIs'
export default {
  data () {
    return {
      valueList: [],
      dictInfo: {

      },
      isId: false,
      isParent: '0',
      classInfo: {oneClass: '', twoClass: ''},
      oneList: [],
      twoList: [],
      addType: ''
    }
  },
  methods: {
    getDictDesc (dictList, selIndex) {
      for (var index in dictList) {
        if (dictList[index].dictIndex === selIndex) {
          return dictList[index].dictDesc
        }
      }
    },
    dictSelcet (flag, val) {
      switch (flag) {
        case 'one':
          this.getTwoList(val)
          break
        case 'two':
          break
        default:
          break
      }
    },
    async getOneList () {
      try {
        let {data} = await dicAPIs.getTypeInfoList({
          pageNum: 1,
          pageSize: 10,
          type: '',
          desc: ''
        })
        if (data.code === 200) {
          this.oneList = data.data.pageList
        }
      } catch (error) {}
    },
    async getTwoList (val) {
      try {
        let {data} = await dicAPIs.selectInfoByValues({
          type: val
        })
        if (data.code === 200) {
          this.twoList = data.data
        }
      } catch (error) {

      }
    },
    async submitHandler () {
      if (sessionStorage.getItem('editValueId')) {
        let params = {
          id: sessionStorage.getItem('editValueId'),
          dictIndex: this.dictInfo.dictIndex,
          dictParent: this.classInfo.twoClass ? this.classInfo.twoClass : 0,
          dictType: this.classInfo.oneClass ? this.classInfo.oneClass : this.dictInfo.dictType,
          dictValue: this.dictInfo.dictValue,
          dictDesc: this.dictInfo.dictDesc
        }
        try {
          if (Object.values(params).indexOf(null) !== -1 || Object.values(params).indexOf(undefined) !== -1) {
            this.$message({
              type: 'error',
              message: '选择不能为空'
            })
            return false
          }
          let {data} = await dicAPIs.updateSystemDictValue(params)
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
        } catch (error) {}
      } else {
        let params = {
          parentId: this.classInfo.twoClass ? this.classInfo.twoClass : 0,
          dictType: this.addType ? this.addType : this.classInfo.oneClass,
          dictDesc: this.dictInfo.dictDesc ? this.dictInfo.dictDesc : ''
        }
        try {
          if (Object.values(params).indexOf(null) !== -1 || Object.values(params).indexOf(undefined) !== -1) {
            this.$message({
              type: 'error',
              message: '选择不能为空'
            })
            return false
          }
          let {data} = await dicAPIs.saveDictValue(params)
          if (data.code === 200) {
            this.$message({
              type: 'success',
              message: data.message
            })
          } else {
            this.$message({
              type: 'error',
              message: '新增失败'
            })
          }
        } catch (error) {}
      }
      this.$router.push('/dict/value')
    },
    initial () {
      if (sessionStorage.getItem('editValueId')) {
        this.breadCrumbOption = editValue().getBreadCrumbOption({id: sessionStorage.getItem('editValueId')})
        this.dictInfo = JSON.parse(sessionStorage.getItem('dictValueInfo'))
        this.isId = false
        this.classInfo.oneClass = this.dictInfo.dictType
        if (this.dictInfo.dictParent) {
          this.isParent = '1'
        } else {
          this.isParent = '0'
        }
        //  this.dictInfo.type= this.getDictDesc1(this.typeList,this.dictInfo.id)
      } else {
        this.breadCrumbOption = editValue().getBreadCrumbOption()
        this.isId = true
        //  this.dictInfo.type=''
      }
    },
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadCrumbOption,
        rightButtonOption: null
      })
    }
  },
  watch : {
    isParent () {
      if (this.isParent) this.twoList = []
    }
  },
  mounted () {
    this.initial()
    this.resetOption()
    this.getOneList()
  }
}
</script>
<style lang="less" scoped>
  .myinput {
    width: 560px;
  //  height: 630px;
    height:auot;
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
    .name{
      padding-left: 20px;
      display: inline-block;
      width: 310px;
    }
    .select{
      margin-left: 156px;
      margin-top: 10px;
    }
  }
</style>
