import request from "./request.js";

export const reqGoodsList = (data)=>request.get('/api/public/v1/goods/search',data)