/**
* 作者 ：食草狂魔
*
* 日期 ：2017/12/20
*
* 描述 ：产品列表页
*/
<template>
  <div class="container">
    产品列表页
    <SelectSearch :options="optionsData" class="select"/>
  </div>
</template>
<script>
import SelectSearch from '../../components/select/SelectSearch'
export default {
  components: {
    SelectSearch
  },
  data () {
    // 展示数据
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
        },
        {
          selectHandler (val) {
            console.log(val)
          },
          value: '2',
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
        },
        {
          selectHandler (val) {
            console.log(val)
          },
          value: '2',
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
          console.log(val)
        }
      }
    }
    return {
      optionsData: temp
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
