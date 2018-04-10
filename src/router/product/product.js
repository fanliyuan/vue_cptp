/**
 * 作者 ：食草狂魔
 *
 * 日期 ：2017/12/08
 *
 * 描述 ：子路由 - 产品模块
 */
// const ProductListPage = () => import('@/pages/product/productList.vue')
import ProductListPage from '../../pages/product/productList.vue'
import ProductDetailPage from '../../pages/product/productDetail.vue'
import EditProductPage from '../../pages/product/editProduct.vue'
import AddProductPage from '../../pages/product/addProduct.vue'
import EditTagPage from '../../pages/product/editTag.vue'
import ProductSearchResultPage from '../../pages/product/productSearchResult.vue'
import MarketPositionPage from '../../pages/product/marketPosition.vue'
import ProductForbiddenPage from '../../pages/product/productForbidden.vue'

export default [
  {
    path: '/product',
    name: 'product-list',
    component: ProductListPage
  },
  {
    path: 'productDetail',
    name: 'product-detail',
    component: ProductDetailPage
  },
  {
    path: 'editProduct',
    name: 'editProduct',
    component: EditProductPage
  },
  {
    path: 'addProduct',
    name: 'addProduct',
    component: AddProductPage
  },
  {
    path: 'editTag',
    name: 'editTag',
    component: EditTagPage
  },
  {
    path: 'search',
    name: 'productSearchResult',
    component: ProductSearchResultPage
  },
  {
    path: 'marketPosition',
    name: 'marketPosition',
    component: MarketPositionPage
  },
  {
    path: 'productFobidden',
    name: 'productForbidden',
    component: ProductForbiddenPage
  }
]
