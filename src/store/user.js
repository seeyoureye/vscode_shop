const state = {
    address:JSON.parse(uni.getStorageSync('address') || '{}'),
};
const mutations = {
    updateAddress(state,address){
        state.address = address
    }
};
const actions = {};
const getters = {
    getAddress(state){
        return state.address;
    },
    getFullAddress(state){
            if(state.address.provinceName){
                return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
            }
    }
    
};
export default {
    namespaced:true,
    state,mutations,actions,getters
}