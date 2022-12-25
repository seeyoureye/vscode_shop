const state = {
    obj:{
        name:'测试'
    },
    cart:JSON.parse(uni.getStorageSync('cart') || '[]'),
    TotalPrice:0,
    TotalNum:0,
    fullCheckbox:false,
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
    },
    editState(state,goods){// 修改勾选状态
        const res = state.cart.find(item=>item.goods_id===goods.goods_id);
        res.goods_state = !res.goods_state;
        uni.setStorageSync('cart',JSON.stringify(state.cart));
    },
    editNumber(state,goods){// 修改数量
        let {goods_id,goods_count} = goods;
        const res = state.cart.findIndex(item=>item.goods_id===goods_id);
            state.cart[res] = goods;
            setTimeout(() => {
                uni.setStorageSync('cart',JSON.stringify(state.cart));
                state.TotalPrice = state.cart.reduce((p1,p2)=>{
                    return p1+= p2.goods_state ? p2.goods_price * p2.goods_count : 0;
                },0)
                state.TotalNum = state.cart.reduce((p1,p2)=>{
                    return p1+= p2.goods_state ? p2.goods_count : 0;
                },0)
                console.log(state.TotalNum);
            });
    },
    removeGoodsItem(state,{goods_id}){//找到当前商品的 id,然后获取到它的索引,然后删除
        const res = state.cart.findIndex(i=>i.goods_id==goods_id)
        res != -1 ? state.cart.splice(res,1) : uni.$tools.uniMsg();
        uni.setStorageSync('cart',JSON.stringify(state.cart));
    },
    //点击时,做出修改 然后同步修改所有
    editFullState(state){
        state.fullCheckbox = !state.fullCheckbox
        state.cart.forEach(i=>i.goods_state = state.fullCheckbox)
    },//当选中的等于总数,那么就是全选用一个表达式来判断 把结果赋值给全选的值
    bindState(state,temp){
        state.fullCheckbox = temp;
    }
};
const actions = {};
const getters = {
    getCartData(state){//获得购物车数据
        return state.cart
    },
    getCartCount(state){//计数,用于底部栏显示
        state.TotalNum = state.cart.reduce((p1,p2)=>{
            return p1+= p2.goods_state ? p2.goods_count : 0;
        },0)
        return state.TotalNum
    },
    getCartCount_2(state){//计数,用于底部栏显示
        return state.TotalNum
    },
    getTotalPrice(state){//总价,根据是否打钩来统计
        let res = state.cart.reduce((p1,p2)=>{
            return p1+= p2.goods_state ? p2.goods_price * p2.goods_count : 0;
        },0)
        state.TotalPrice = res;
        return res
    },
    checkGoods(state){
        return state.cart.reduce((p1,p2)=>{
            return p1+= p2.goods_state ? 1 : 0;
        },0)
    },
    getPrice(state){
        return state.TotalPrice
    },
    getState(state){
        return state.fullCheckbox
    }
};
export default {
    namespaced: true,
    state,mutations,actions,getters
}