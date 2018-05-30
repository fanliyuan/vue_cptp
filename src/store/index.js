/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2017/10/18
 *
 * 描述 ：全局状态树
 */
import Vue from 'vue'
import Vuex from 'vuex'
import homeStore from './home/homeStore'
import productStore from './product/productStore'
import config from '../config/Development'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    fileServer: config.siteInfo.sites.file_server_url,
    isAdmin: 0,
    router: {}
  },
  modules: {
    homeStore,
    productStore
  }
})

export default store
