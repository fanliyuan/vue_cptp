/*
 * @Last Modified by: ChouEric
 * @Last Modified time: 2018-05-18 11:35:28
*/
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://192.168.100.47:8769/api/back"'
})
