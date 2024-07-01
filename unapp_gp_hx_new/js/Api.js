import {
	get,
	post
} from "../js/axiosConfig.js";

/**
 * 获取用户
 */
export const getUserInfo = (getUser) => {
	get('/user/info', {}, (response) => {
		if(response.data.code ==200){
			if(response.data.data == null){
				sessionStorage.removeItem("userToken")
				localStorage.removeItem("wxStatus")
			}
			getUser(response.data.data)
		}else{
			sessionStorage.removeItem("userToken")
			localStorage.removeItem("wxStatus")
		}
	},(error) => {
		uni.showToast({
			title: 'Request failed',
			duration: 1500,
			icon: 'error'
		});
	})
}

/**
 * 获取用户
 */
export const getSys = (param, hook) => {
	get('/pub/getValue', { name: param }, (response) => {
		hook(response)
	},(error) => {
		uni.showToast({
			title: 'Request failed',
			duration: 1500,
			icon: 'error'
		});
	})
}

export const regist = (userName, pwd, pwd2) => {
	if (userName.length < 6) {
		uni.showToast({
			title: 'Username length less than 6!',
			duration: 1500,
			icon: 'error'
		});
	}
	let register = {
		"userName": userName,
		"pwd": pwd,
		"pwd2": pwd2,
		"phone": "",
		"userEmail": "",
	}
	post('/qwertyuiop/user/add', register, (response) => {
		if (response.data.code == 200) {
			uni.showToast({
				title: 'register success',
				duration: 1500,
				icon: 'success'
			});
		} else {
			uni.showToast({
				title: response.data.message,
				duration: 1500,
				icon: 'error'
			});
		}
	}, (error) => {
		uni.showToast({
			title: 'Request failed',
			duration: 1500,
			icon: 'error'
		});
	})
}