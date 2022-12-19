const state = {
    obj:{
        name:'测试'
    },
    cart:JSON.parse(uni.getStorageSync('cart') || '[]')
};
const mutations = {
    addToCart(state,goods){
        // 这里出现了第一个问题,就是一次只能添加一个商品
        // 很明显是不正确的 得写一个循环 可能是1 个或者多个
        // goods.forEach(i=>...内部是底部的逻辑) 这样才是合理的
        const res = state.cart.findIndex(item=>item.goods_id===goods.goods_id);
        res >= 0 ? state.cart[res].goods_count++ : state.cart.push(goods);
        //console.log(state.cart);
        uni.setStorageSync('cart',JSON.stringify(state.cart));
    }
};
const actions = {};
const getters = {
    getObj(){
        return this.obj
    },
    getCartCount(state){
        return state.cart.reduce((p1,p2)=>p1+=p2.goods_count,0)
    }
};
export default {
    namespaced: true,
    state,mutations,actions,getters
}