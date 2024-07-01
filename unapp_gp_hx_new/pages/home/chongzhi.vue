<template>
	<view class="chongzhi_body">
		<uni-nav-bar fixed="true" color="#9fa6b5" backgroundColor="#31313F" @clickLeft="back()"
								left-icon="left" :title="$t('home.chongzhi.chongzhizhongxin')" :shadow="false" :border="false">
		</uni-nav-bar>
		<view class="content">
			<view style="display: flex;justify-content: center; flex-direction: column;">
				<view style="display: flex;justify-content: center;">
					<image :src="ustdQrCode" style="width: 150px; height: 150px;" ></image>
				</view>
				<view style="margin-top: 10px;display: flex;justify-content: center;">
					<view style="font-size: 12px; color: #76998b;">
						{{ustdAddress}}
					</view>
					<view @click="copy('1')" style="margin-left: 10px;">
						<text style="color: white; font-size: 15px;text-decoration:underline;cursor: pointer;">copy</text>
					</view>
				</view>
				<view style="margin-top: 10px;display: flex;justify-content: center;">
					<input v-model="amount" class="uni-input" maxlength="10" :placeholder="$t('home.chongzhi.chongzhishuliang')" placeholder-style="font-size:13px;" style="color: white; background-color: #434356;border-radius: 5px; width: 50%;"/>
				</view>
				<view style="margin-top: 10px;display: flex;justify-content: center;">
					<button type="primary" size="mini" style="width: 100px;" @click="toUp()">{{$t('home.chongzhi.chongzhi')}}</button>
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
				ustdQrCode: "",
				ustdAddress:"",
				amount: 0,
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
			getSys("phone", (response)=>{
				this.ustdAddress = response.data.data
			})
			getSys("qrCode", (response)=>{
				this.ustdQrCode = response.data.data
			})
			getUserInfo((user)=>{
				if(user===undefined){
					sessionStorage.removeItem("userToken")
					return
				}
				this.user = user
			})
		},
		methods: {
			toUp(){
				if(this.user.uuid == ""){
					uni.showToast({
						title: 'Plese Login',
						duration: 1500,
						icon: 'error'
					});
					return
				}
				if(this.amount <= 0){
					uni.showToast({
						title: 'Request failed',
						duration: 1500,
						icon: 'error'
					});
					return
				}
				post("/account/topUp",{'uuid':this.user.uuid,'bz':'ustd', 'amount':this.amount},(response)=>{
					if(response.data.code == 200){
						uni.showToast({
							title: 'Recharge success',
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
