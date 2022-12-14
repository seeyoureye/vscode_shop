import request from "./request.js";
//请求轮播图
export const reqSwiper = () => request.get('/api/public/v1/home/swiperdata');
//请求 4 个 icon 的分类栏
export const reqNav = ()=>request.get('/api/public/v1/home/catitems');
//请求 楼层信息
export const reqFloor = ()=>request.get('/api/public/v1/home/floordata')
