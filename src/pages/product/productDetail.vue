/*
 * @Author: ChouEric
 * @Date: 2018-04-26 16:53:45
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-05-22 14:32:35
*/

<template>
  <div class="main">
    <div class="padding border">
      <el-row style="width:100%;height:80px;" class="">
        <el-col :span="2">
          <img :src="downloadUrl+productId+'&token='+ mytoken+'&flagIndex=10'" onerror="this.src='/staticm/img/unload.jpg'" alt="暂无" width="80" height="80">
          <!-- <div style="width:80px;height:80px;background-color:silver"></div> -->
        </el-col>
        <el-col :span="10">
          <span class="fontSize">{{productInfo.productName}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-row >
          <span style="line-height:5;font-size:20px;">产品简介</span>
        </el-row>
        <el-row>
          <span>
            {{productInfo.intro}}
          </span>
          <!-- 上面和下面的只选一个,上面没有格式,下面是有格式的 -->
          <!-- <el-input class="mytextarea" v-model="productInfo.intro" :autosize="true" type="textarea" resize="none" readonly=""></el-input> -->
        </el-row>
      </el-row>
      <el-row>
        <el-col :span="2">
          <span style="line-height:5;font-size:20px;">市场定位</span>
        </el-col>
        <el-col :span="6">
          <span style="line-height:5;font-size:20px;">{{productInfo.productMarketTarget}}</span>
        </el-col>
        <el-col :span="2">
          <span style="line-height:5;font-size:20px;">销售金额</span>
        </el-col>
        <el-col :span="6">
          <!-- <el-input v-model="valueMoney" placeholder="请输入内容" style="margin-top:30px"></el-input> -->
          <span style="line-height:5;font-size:20px;">{{productInfo.salesAmt}}</span>
        </el-col>
        <el-col :span="2">
          <span style="line-height:5;font-size:20px;">产品标签</span>
        </el-col>
        <el-col :span="6">
          <!-- <el-input v-model="valueTags" placeholder="请输入内容" style="margin-top:30px"></el-input> -->
          <span style="line-height:5;font-size:20px;">{{productInfo.productTag}}</span>
        </el-col>
      </el-row>
    </div>
    <div class="padding border">
      <el-row>
        <el-col :span="2">
          <span style="line-height:3;font-size:20px;">产品状态</span>
        </el-col>
        <el-col :span="22" style="padding:16px">
          <!-- <el-radio v-model="productStatus" label="1">预立项</el-radio>
          <el-radio v-model="productStatus" label="2">开发阶段</el-radio>
          <el-radio v-model="productStatus" label="3">可销售</el-radio> -->
          <span style="font-size: 16px;">{{productInfo.stateName}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <span style="line-height:3;font-size:20px;">产品状态</span>
        </el-col>
        <el-col :span="10" style="padding:16px;font-size:16px">
          <el-row :gutter="20">
            <el-col :span="12">
              <span>开始时间：</span>
              <b>{{productInfo.startTime}}</b>
              <!--<el-date-picker  size="mini" format="yyyy-MM-dd" v-model="value1" type="datetime" placeholder="选择开始时间">
              </el-date-picker>-->
            </el-col>
            <el-col :span="12">
              <span>结束时间：</span>
              <b>{{productInfo.endTime}}</b>
              <!--<el-date-picker size="mini" format="yyyy-MM-dd" v-model="value2"  type="datetime" placeholder="选择结束时间">
              </el-date-picker>-->
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12" style="padding:16px">
          <el-row class="">
            <el-col :span="5">现阶段完成情况：</el-col>
            <el-col class="myprogress"  :span="10">
              <el-progress :percentage="productInfo.finishPercent"></el-progress>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="padding border fileclass">
      <el-row>
        <p style="font-size:20px;">产品资料管理</p>
        <div style="margin:20px 150px 0;">
          <!-- <Table :options="productTD"></Table> -->
          <el-row>
            <el-col :span="4" :class="!fileInfo.productDemandFlag? 'classNo' : ''">
              <div style="width:200px;margin:0 auto;">
                <div style="width:80px;height:100px;margin:0 auto 20px" class="marginb20">
                  <img src="/staticm/img/fileIcons/00.png" alt="" v-if="fileInfo.productDemandFlag === 1">
                  <img src="/staticm/img/fileIcons/01.png" v-else>
                  <!-- <img src="/staticm/img/fileIcons/00.png" alt=""> -->
                </div>
                <div style="margin:0 auto;text-aglin:center;text-align:center">
                  <p class="margin10">产品需求分析</p>
                  <p class="margin10">支持格式: doc、docx</p>
                  <a download="file" v-if="fileInfo.productDemandFlag === 1" :href="downloadUrl+productId+'&token='+ mytoken+'&flagIndex=0'" style="display:block;width:100%">下载</a>
                </div>
              </div>
            </el-col>
            <el-col :span="4" :class="!fileInfo.productPptFlag? 'classNo' : ''">
              <div style="width:200px;margin:0 auto;">
                <div style="width:80px;height:100px;margin:0 auto 20px" class="marginb20">
                  <img src="/staticm/img/fileIcons/10.png" alt="" v-if="fileInfo.productPptFlag === 1">
                  <img src="/staticm/img/fileIcons/11.png" v-else>
                </div>
                <div style="margin:0 auto;text-aglin:center;text-align:center">
                  <p class="margin10">PPT</p>
                  <p class="margin10">(文档)</p>
                  <a download="file" v-if="fileInfo.productPptFlag === 1" :href="downloadUrl+productId+'&token='+ mytoken+'&flagIndex=1'" style="display:block;width:100%">下载</a>
                </div>
              </div>
            </el-col>
            <el-col :span="4" :class="!fileInfo.productProtoFlag? 'classNo' : ''">
              <div style="width:200px;margin:0 auto;">
                <div style="width:80px;height:100px;margin:0 auto 20px" class="marginb20">
                  <img src="/staticm/img/fileIcons/20.png" alt="" v-if="fileInfo.productProtoFlag === 1">
                  <img src="/staticm/img/fileIcons/21.png" v-else>
                </div>
                <div style="margin:0 auto;text-aglin:center;text-align:center">
                  <p class="margin10">原型</p>
                  <p class="margin10">(rp文件)</p>
                  <a download="file" v-if="fileInfo.productProtoFlag === 1" :href="downloadUrl+productId+'&token='+ mytoken+'&flagIndex=2'" style="display:block;width:100%">下载</a>
                </div>
              </div>
            </el-col>
            <el-col :span="4" :class="!fileInfo.productPrdFlag? 'classNo' : ''">
              <div style="width:200px;margin:0 auto;">
                <div style="width:80px;height:100px;margin:0 auto 20px" class="marginb20">
                  <img src="/staticm/img/fileIcons/30.png" alt="" v-if="fileInfo.productPrdFlag === 1">
                  <img src="/staticm/img/fileIcons/31.png" v-else>
                </div>
                <div style="margin:0 auto;text-aglin:center;text-align:center">
                  <p class="margin10">PRD</p>
                  <p class="margin10">(word文档)</p>
                  <a download="file" v-if="fileInfo.productPrdFlag === 1" :href="downloadUrl+productId+'&token='+ mytoken+'&flagIndex=3'" style="display:block;width:100%">下载</a>
                </div>
              </div>
            </el-col>
            <el-col :span="4" :class="!fileInfo.productUedFlag? 'classNo' : ''">
              <div style="width:200px;margin:0 auto;">
                <div style="width:80px;height:100px;margin:0 auto 20px" class="marginb20">
                  <img src="/staticm/img/fileIcons/40.png" alt="" v-if="fileInfo.productUedFlag === 1">
                  <img src="/staticm/img/fileIcons/41.png" v-else>
                </div>
                <div style="margin:0 auto;text-aglin:center;text-align:center">
                  <p class="margin10">UED</p>
                  <p class="margin10">(jpg、png)</p>
                  <a download="file" v-if="fileInfo.productUedFlag === 1" :href="downloadUrl+productId+'&token='+ mytoken+'&flagIndex=4'" style="display:block;width:100%">下载</a>
                </div>
              </div>
            </el-col>
          </el-row>
            <el-row style="margin-top:40px">
            <el-col :span="4" :class="!fileInfo.productHelpFlag? 'classNo' : ''">
              <div style="width:200px;margin:0 auto;">
                <div style="width:80px;height:100px;margin:0 auto 20px" class="marginb20">
                  <img src="/staticm/img/fileIcons/50.png" alt="" v-if="fileInfo.productHelpFlag === 1">
                  <img src="/staticm/img/fileIcons/51.png" v-else>
                </div>
                <div style="margin:0 auto;text-aglin:center;text-align:center">
                  <p class="margin10">帮助 Doc</p>
                  <p class="margin10">(word文档)</p>
                  <a download="file" v-if="fileInfo.productHelpFlag === 1" :href="downloadUrl+productId+'&token='+ mytoken+'&flagIndex=5'" style="display:block;width:100%">下载</a>
                </div>
              </div>
            </el-col>
            <el-col :span="4" :class="!fileInfo.productDvFlag? 'classNo' : ''">
              <div style="width:200px;margin:0 auto;">
                <div style="width:80px;height:100px;margin:0 auto 20px" class="marginb20">
                  <img src="/staticm/img/fileIcons/60.png" alt="" v-if="fileInfo.productDvFlag === 1">
                  <img src="/staticm/img/fileIcons/61.png" v-else>
                </div>
                <div style="margin:0 auto;text-aglin:center;text-align:center">
                  <p class="margin10">演示视频</p>
                  <p class="margin10">(MP4文件)</p>
                  <a download="file" v-if="fileInfo.productDvFlag === 1" :href="downloadUrl+productId+'&token='+ mytoken+'&flagIndex=6'" style="display:block;width:100%">下载</a>
                </div>
              </div>
            </el-col>
            <el-col :span="4" :class="!fileInfo.productPvFlag? 'classNo' : ''">
              <div style="width:200px;margin:0 auto;">
                <div style="width:80px;height:100px;margin:0 auto 20px" class="marginb20">
                  <img src="/staticm/img/fileIcons/70.png" alt="" v-if="fileInfo.productPvFlag === 1">
                  <img src="/staticm/img/fileIcons/71.png" v-else>
                </div>
                <div style="margin:0 auto;text-aglin:center;text-align:center">
                  <p class="margin10">宣传视频</p>
                  <p class="margin10">(MP4文件)</p>
                  <a download="file" v-if="fileInfo.productPvFlag === 1" :href="downloadUrl+productId+'&token='+ mytoken+'&flagIndex=7'" style="display:block;width:100%">下载</a>
                </div>
              </div>
            </el-col>
            <el-col :span="4" :class="!fileInfo.productIntroFlag? 'classNo' : ''">
              <div style="width:200px;margin:0 auto;">
                <div style="width:80px;height:100px;margin:0 auto 20px" class="marginb20">
                  <img src="/staticm/img/fileIcons/80.png" alt="" v-if="fileInfo.productIntroFlag === 1">
                  <img src="/staticm/img/fileIcons/81.png" v-else>
                </div>
                <div style="margin:0 auto;text-aglin:center;text-align:center">
                  <p class="margin10">一页纸简介</p>
                  <p class="margin10">(word文档)</p>
                  <a download="file" v-if="fileInfo.productIntroFlag === 1" :href="downloadUrl+productId+'&token='+ mytoken+'&flagIndex=8'" style="display:block;width:100%">下载</a>
                </div>
              </div>
            </el-col>
            <el-col :span="4" :class="!fileInfo.productWbFlag? 'classNo' : ''">
              <div style="width:200px;margin:0 auto;">
                <div style="width:80px;height:100px;margin:0 auto 20px" class="marginb20">
                  <img src="/staticm/img/fileIcons/90.png" alt="" v-if="fileInfo.productWbFlag === 1">
                  <img src="/staticm/img/fileIcons/91.png" v-else>
                </div>
                <div style="margin:0 auto;text-aglin:center;text-align:center">
                  <p class="margin10">产品白皮书</p>
                  <p class="margin10">(word文档、pdf文档)</p>
                  <a download="file" v-if="fileInfo.productWbFlag === 1" :href="downloadUrl+productId+'&token='+ mytoken+'&flagIndex=9'" style="display:block;width:100%">下载</a>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-row>
    </div>
    <div class="padding border">
      <el-row justify="space-between" type="flex">
        <el-col :span="12">
          <span style="line-height:3;font-size:20px;">人员列表</span>
        </el-col>
        <el-col :offset="10" :span="2" style="margin-top:20px;color:#646464">共计 {{totalNum}} 人</el-col>
      </el-row>
      <div style="margin:20px 150px 0;">
        <Table :options="personTD"></Table>
      </div>
    </div>
  </div>
</template>
<script>
import productDetailService from './service/productDetailService'
import Table from '../../components/table/Table'
import productAPIs from '../../api/product/productAPIs'
export default {
  components: {
    Table
  },
  data () {
    let breadcrumbOption = {
      bread: [
        {
          label: '产品管理',
          path: '/product'
        },
        {
          label: '产品详细页'
        }
      ]
    }
    return {
      productInfo: {},
      productId: 1,
      fileInfo: {},
      personTD: productDetailService().getTableOption(),
      totalNum: 0,
      breadcrumbOption,
      mytoken: localStorage.token,
      downloadUrl: this.$store.state.fileServer + '/getFile?productId='
    }
  },
  methods: {
    resetOption () {
      this.$emit('data', {
        breadCrumbOption: this.breadcrumbOption,
        rightButtonOption: null
      })
    },
    async loadAll () {
      let { data } = await productAPIs.getProductById({productId: this.productId})
      try {
        if (data && data.code === 200) {
          this.productInfo = data.data
          this.productInfo.salesAmt = this.productInfo.salesAmt ? this.productInfo.salesAmt : 0
          this.productInfo.salesAmt += '元'
          // this.productInfo.finishPercent = 50
          this.productInfo.startTime = this.timeFormat(this.productInfo.startTime)
          this.productInfo.endTime = this.timeFormat(this.productInfo.endTime)
        }
      } catch (error) {
      }
    },
    async getFileInfo () {
      try {
        let {data} = await productAPIs.getFileInfo({productId: this.productId})
        if (data.code === 200) {
          this.fileInfo = data.data.fileFlag
        }
      } catch (error) {}
    },
    async getProductMember () {
      try {
        let {data} = await productAPIs.getProductMember({productId: this.productId})
        if (data.code === 200) {
          let temp = []
          data.data.listData.forEach(item => {
            temp.push({
              roleName: item.memberPosition,
              userName: item.memberName,
              mobile: item.memberPhone
            })
          })
          this.totalNum = temp.length
          this.personTD = productDetailService().getTableOption(temp)
        } else {
          this.personTD = productDetailService().getTableOption()
        }
      } catch (error) {
        this.personTD = productDetailService().getTableOption()
      }
    },
    timeFormat (time) {
      // let nowYear = new Date().getFullYear()
      // let timeFormat = +this.$moment(time, 'x').format('L').replace(/\//g, '').substr(0, 4)
      // if (nowYear > timeFormat) {
      return this.$moment(time, 'x').format('ll')
      // } else {
      //   let date = +this.$moment(time, 'x').format('L').replace(/\//g, '')
      //   let now = +this.$moment().format('L').replace(/\//g, '')
      //   if (date === now) {
      //     return this.$moment(time, 'x').format('lll').substr(10)
      //   } else if (date + 1 === now) {
      //     return '昨天' + this.$moment(time, 'x').format('lll').substr(10)
      //   } else {
      //     return this.$moment(time, 'x').format('ll').substr(5)
      //   }
      // }
    }
  },
  mounted () {
    this.productId = this.$route.params.productId
    this.resetOption()
    this.loadAll()
    this.getFileInfo()
    this.getProductMember()
  }
}
</script>

<style lang="less" scoped>
	.dass_items{
		border-bottom: 1px solid #cccccc;
		padding: 20px;
		a{
			display: block;
		}
	}
	.main{
    overflow: auto;
		.padding{
			box-sizing: border-box;
			width: 100%;
			padding: 30px 20px;
		}
		.fontSize{
			font-size: 25px;
			line-height: 80px;
		}
		.saveButton{
			line-height: 40px;
			margin-top: 20px;
			background: #666;
			color: white;
			text-align: center;
			border-radius: 5px;
			cursor: pointer;
		}
		.addPerson{
			line-height: 40px;
			background: #666;
			color: white;
			text-align: center;
			border-radius: 5px;
			cursor: pointer;
		}
		.border{
      border-bottom: 10px #eee solid;
      background: white;
		}
		.myheadclass {
			background: red
		}
  }
  .margin10{
    margin-bottom: 10px;
  }
  a{
    color: #409eff
  }
  .fileclass {
    color: black;
  }
  .classNo{
    color: #666;
    a {
      color: #666
    }
  }
</style>
