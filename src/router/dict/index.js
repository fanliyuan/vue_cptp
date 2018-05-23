/*
 * @Author: ChouEric
 * @Date: 2018-05-09 10:26:54
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-05-23 10:05:58
*/

import KeyPage from '../../pages/dict/key.vue'
import ValuePage from '../../pages/dict/value.vue'
import editValue from '../../pages/dict/editValue.vue'
import editKey from '../../pages/dict/editKey.vue'

export default [
  {
    path: 'key',
    component: KeyPage,
    children: [
      {
        name: 'key-search',
        path: 'search/:keyword'
      }
    ]
  },
  {
    path: 'value',
    component: ValuePage,
    children: [
      {
        name: 'value-search',
        path: 'search/:keyword'
      }
    ]
  },
  {
    path: 'editValue',
    component: editValue,
    name: 'editValue',
    children: [
      {
        path: ':type',
        name: 'value-edit'
      }
    ]
  },
  {
    path: 'editKey',
    component: editKey,
    name: 'editKey',
    children: [
      {
        path: ':type',
        name: 'key-edit'
      }
    ]
  }
]
