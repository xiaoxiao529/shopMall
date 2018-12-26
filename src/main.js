// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import reset from './assets/css/reset.css'
import nav from './assets/css/header.css'
import goodsList from './assets/css/goodsList.css'
import item from './assets/css/item.css'
import store from './store'

/*import Utils from './lib/utils.js'

Vue.use(Utils)
*/
Vue.config.productionTip = true

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
