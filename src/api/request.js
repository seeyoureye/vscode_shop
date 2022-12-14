import { $http } from "@escook/request-miniprogram";

const request = $http;
//请求拦截
request.baseUrl = 'https://www.uinav.com';
request.beforeRequest = function(options){
	uni.showLoading({
		title:'数据加载中'
	})
}
//响应拦截
request.afterRequest = function(options){
	uni.hideLoading()
}


export default request;