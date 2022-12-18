import request from "./request.js";
//商品详情
export const reqGetDetail = (id)=>request.get(`/api/public/v1/goods/detail?goods_id=${id}`)
//搜索关键字
export const reqSearchKeyword = (keyword) => request.get(`/api/public/v1/goods/qsearch?query=${keyword}`);
//商品列表
export const reqGoodsList = (data)=>request.get('/api/public/v1/goods/search',data)


