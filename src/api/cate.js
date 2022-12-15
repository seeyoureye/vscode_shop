import request from "./request.js";

export const reqCateList = () => request.get('/api/public/v1/categories');