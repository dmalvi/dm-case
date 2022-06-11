import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import store from './store/store.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
