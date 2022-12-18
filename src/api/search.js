import request from "./request.js";

export const reqSearchKeyword = (keyword) => request.get(`/api/public/v1/goods/qsearch?query=${keyword}`);