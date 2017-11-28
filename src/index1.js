import index from '../less/index'
import lodash from 'lodash'
import * as jquery from 'expose-loader?$!jquery'
import hoge from './hoge.html'
import style, { abc } from './nyan.css'

import _element from 'element-theme-chalk'

console.log(style, abc)

new Vue({
  el: '#app',
  template: `<div>${hoge}</div>`
})