import Vue from 'vue'
import App from './App'
import $tools from './units';
import API from './api';
import store from './store';
Vue.config.productionTip = false
uni.$tools = $tools;
uni.$API = API;
App.mpType = 'app'

const app = new Vue({
  ...App,store
})
app.$mount()
