import Vue from 'vue'
import infiniteScroll from 'vue-infinite-scroll'
import VueLazyload from 'vue-lazyload'

import App from './App.vue'
import router from './router'
import store from './store'
import element from './util/useEle'

Vue.use(infiniteScroll)
Vue.use(element)

// 图片懒加载
const loadImage = require('./assets/images/loading.gif')
const errorImage = require('./assets/images/error.png')
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorImage,
  loading: loadImage
})
// Vue.use(VueLazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
