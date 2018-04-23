<template>
  <div class="myselectsearch">
    <el-row :type="'flex'" :justify="'space-between'" class="my_component">
      <el-col :span="20">
        <el-select v-if="options.select" v-for="select in options.select"   :key="select.index" v-model="select.value" @change="select.selectHandler" :class="select.className" class="my_select">
          <el-option v-for="item in select.option" :key="item.index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-input v-model="options.search.vaule" @keypress.enter.native="searchHandler(options.search.vaule)">
          <i
            class="el-icon-search el-input__icon"
            slot="suffix"
            @click="searchHandler(options.search.vaule)">
          </i>
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ['options'],
  methods: {
    searchHandler (val) {
      this.options.search.searchHandler && this.options.search.searchHandler(val)
    }
  }
}
</script>
<style lang="less" scoped>
  .my_select{
    margin-right: 20px;
  }
  .my_component{
    padding-right: 20px;
  }
  .myselectsearch{
    margin-bottom: 10px;
    padding-right: 20px;
  }
  .el-icon-search{
    font-size: 24px;
  }
</style>
