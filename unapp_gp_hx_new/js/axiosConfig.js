// axiosConfig.js
// const baseURL = 'http://127.0.0.1:8081';
// const baseURL = 'http://192.168.1.7:8081'; 
const baseURL = 'https://xnbmmtop.com/api';

// GET 方法
export const get = (url, params = {}, success, fail) => {
	url = baseURL + "/" + url
	return uni.request({
		url: url,
		method: "GET",
		timeout: 60000,
		header: {
			'X-Token': sessionStorage.getItem('userToken')
		},
		data: params,
		success: (response) => {
			success(response)
		},
		fail: (fail) => {
			success(fail)
		}
	})
};

// POST 方法
export const post = (url, data = {}, success, fail) => {
	url = baseURL + "/" + url
	return uni.request({
		url: url,
		method: "POST",
		timeout: 60000,
		header: {
			'X-Token': sessionStorage.getItem('userToken')
		},
		data: data,
		success: (response) => {
			success(response)
		},
		fail: (fail) => {
			success(fail)
		}
	})
};