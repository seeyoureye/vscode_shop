import Vue from 'vue';
import Vuex from 'vuex';
import shopCart from './shopCart';
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        shopCart
    }
})