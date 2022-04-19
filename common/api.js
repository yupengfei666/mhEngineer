import store from '../store'
let BASE_URL = ''
const myHttp = (url, data, method = 'GET') => {
	return new Promise((resolve, reject) => {
		const localUrl = uni.getStorageSync('localUrl')
		BASE_URL = localUrl ? localUrl : store.state.url
		uni.request({
			url: BASE_URL + url,
			header: {
				'content-type': 'application/json',
				'sessionkey': uni.getStorageSync('password')
			},
			data: data,
			method: method,
			dataType: 'json',
			success: (res) => {
				if (res.statusCode === 401) {
					uni.reLaunch({
						url: '../main/login',
					});
				} else {
					resolve(res.data)
				}
			},
			fail: (err) => {
				uni.showToast({
					icon: 'none',
					title: '网络连接失败',
				});
				reject(err)
			}
		})
	})
}
export {myHttp, BASE_URL}