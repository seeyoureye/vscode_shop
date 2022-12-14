import Vue from 'vue'
import App from './App'
import $tools from './units';
import API from './api';
Vue.config.productionTip = false
uni.$tools = $tools;
uni.$API = API;
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
