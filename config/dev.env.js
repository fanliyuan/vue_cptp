/*
 * @Last Modified by:   ChouEric
 * @Last Modified time: 2018-05-10 15:37:05
*/
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://192.168.108.5:8769/api/back"'
})
