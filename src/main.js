import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'
import FastClick from 'fastclick'

// 价格保留两位小数全局过滤器
import * as filters from 'common/utils'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// 解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
