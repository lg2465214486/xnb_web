<template>
	<view class="chongzhi_body">
		<uni-nav-bar fixed="true" color="#9fa6b5" backgroundColor="#31313F" @clickLeft="back()"
								left-icon="left" :title="$t('home.tixian.tixian')" :shadow="false" :border="false">
		</uni-nav-bar>
		<view class="content">
			<view style="display: flex;justify-content: center; flex-direction: column;">
				<view style="display: flex;justify-content: center;">
					<image src="/static/navbar/homeqiquanicon.png" style="width: 150px; height: 150px;" ></image>
				</view>
				<view style="margin-top: 10px;display: flex;justify-content: center;">
					<input v-model="amount" class="uni-input" maxlength="10" :placeholder="$t('home.tixian.tixianshuliang')" placeholder-style="font-size:13px;" style="color: white; background-color: #434356;border-radius: 5px; width: 50%;"/>
				</view>
				<view style="margin-top: 10px;display: flex;justify-content: center;">
					<input v-model="ustdAddress" class="uni-input" maxlength="32" :placeholder="$t('home.tixian.trc20')" placeholder-style="font-size:13px;" style="color: white; background-color: #434356;border-radius: 5px; width: 50%;"/>
				</view>
				<view style="margin-top: 10px;display: flex;justify-content: center;">
					<button type="primary" size="mini" style="width: 100px;" @click="tixian()">{{$t('home.tixian.tixian')}}</button>
				</view>
			</view>	
		</view>
	</view>
</template>

<script>
import {get,post} from "@/js/axiosConfig.js";
import {getUserInfo, getSys} from "@/js/Api.js"
import {isEmpty} from "@/js/common.js"		
	export default {
		data() {
			return {
				amount: 0,
				ustdAddress:"",
				user: {
					userName: "",
					vipName: "VIP0",
					ustd: '0.00',
					btc: '0.00',
					eth: '0.00',
					uuid: ''
				}
			}
		},
		onLoad() {
			getUserInfo((user)=>{
				if(user===undefined){
					sessionStorage.removeItem("userToken")
					return
				}
				this.user = user
			})
		},
		methods: {
			tixian(){
				if(this.user.uuid == ""){
					uni.showToast({
						title: 'Plese Login',
						duration: 1500,
						icon: 'error'
					});
					return
				}
				if(!isNaN(this.amount) && this.amount <= 0){
				    uni.showToast({
				    	title: 'Request failed',
				    	duration: 1500,
				    	icon: 'error'
				    });
				    return
				}
				if(this.ustdAddress == ""){
					uni.showToast({
						title: 'Trc20 Address failed',
						duration: 1500,
						icon: 'error'
					});
					return
				}
				post("account/withdraw",{"uuid":this.user.uuid,"trc20":this.ustdAddress,"amount":this.amount},(response)=>{
					if(response.data.code == 200){
						uni.showToast({
							title: 'Withdrawal success',
							duration: 1500,
							icon: 'success'
						})
						setTimeout(() => {
							uni.reLaunch({
								url:"/pages/home/home"
							})
						}, 1000);
					}else{
						uni.showToast({
							title: response.data.message,
							duration: 1500,
							icon: 'error'
						});
					}
				},(error)=>{
					uni.showToast({
						title: 'Request failed',
						duration: 1500,
						icon: 'error'
					});
				})
			},
			back(){
				uni.navigateBack()
			},
			copy(value) {
					uni.setClipboardData({
						data: this.ustdAddress+'', //	这里是个坑接受字符串类型 value转化为字符串
						success: () => {
							uni.showToast({
							title: 'Copy success',
							duration: 1000,
							icon: 'success'
								});
							}
					});
			}

		}
	}
</script>

<style>

</style>
