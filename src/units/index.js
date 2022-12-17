const uniMsg = function(title = '网络异常',icon = 'error',duration = 1000){
	uni.showToast({
		title,
		duration,
		icon
	})
}
export default {
	uniMsg
}