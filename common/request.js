import {FuckUBitch} from "@/common/func.js"

// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
    // 初始化请求配置
    uni.$u.http.setConfig((config) => {
        /* config 为默认全局配置*/
        config.baseURL = 'http://127.0.0.1:8888/api'; /* 根域名 */
		config.dataType = "json"
		config.responseType = "json"
		
        return config
    })
	
	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
	    config.data = config.data || {}
		
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		if(config.custom.auth) {
			// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
			config.header.Authorization = uni.getStorageSync('token')
			if (config.header.Authorization == "") {
				uni.$u.toast("未登录，请先登录")
				return Promise.reject(config)
			}
		}
		
		
		//参数签名
		var signParams = FuckUBitch(config)
		config.header.Rand = signParams.rand
		config.header.Unix = signParams.unix
		config.header.Sign = signParams.sign
		
		
	    return config 
	}, config => { // 可使用async await 做异步操作
	    return Promise.reject(config)
	})
	
	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data
		if (data.code !== 0) { 
			uni.$u.toast(data.msg)
			
			//token失效跳转到登录界面
			if (data.code == 1) {
				setTimeout(() => {
					uni.$u.route({
						url: '/pages/login/login'
					})
				}, 1000)
			}
			
			return Promise.reject(data)
		}
		return data.data === undefined ? {} : data.data
	}, (response) => { 
		uni.$u.toast("服务器出错")
		// 对响应错误做点什么 （statusCode !== 200）
		return Promise.reject(response)
	})
}