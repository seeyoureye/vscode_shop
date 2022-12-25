import Vue from 'vue';
import Vuex from 'vuex';
import shopCart from './shopCart';
import user from './user';
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        shopCart,user
    }
})