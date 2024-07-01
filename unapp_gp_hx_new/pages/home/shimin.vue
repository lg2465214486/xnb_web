<template>
	<view class="chongzhi_body">
		<uni-nav-bar fixed="true" color="#9fa6b5" backgroundColor="#31313F" @clickLeft="back()"
								left-icon="left" :title="$t('home.shiming')" :shadow="false" :border="false">
		</uni-nav-bar>
		<view class="content">
			<view style="display: flex;justify-content: center; flex-direction: column;">
				<view style="margin-top: 10px;display: flex;justify-content: center;">
					<input v-model="real.firstName" class="uni-input" maxlength="10" :placeholder="$t('home.shiming.ming')" placeholder-style="font-size:13px;" style="height: 30px;color: white; background-color: #434356;border-radius: 5px; width: 60%;"/>
				</view>
				<view style="margin-top: 10px;display: flex;justify-content: center;">
					<input v-model="real.lastName" class="uni-input" maxlength="10" :placeholder="$t('home.shiming.xing')" placeholder-style="font-size:13px;" style="height: 30px;color: white; background-color: #434356;border-radius: 5px; width: 60%;"/>
				</view>
				<view style="margin-top: 10px;display: flex;justify-content: center;">
					<view style="width: 60%;">
						<text style="font-size:13px;color: #6e6e8d; ">{{$t('home.shiming.xingbie')}}</text>
						<uni-data-checkbox style="width: 60%;" v-model="real.sex" :localdata="sexs" />
					</view>
				</view>
				<view style="margin-top: 10px;display: flex;justify-content: center;">
					<input v-model="real.address" class="uni-input" maxlength="10" :placeholder="$t('home.shiming.zhuzhi')" placeholder-style="font-size:13px;" style="height: 30px;color: white; background-color: #434356;border-radius: 5px; width: 60%;"/>
				</view>
				<view style="margin-top: 10px;display: flex;justify-content: center;">
					<input v-model="real.phone" class="uni-input" maxlength="10" :placeholder="$t('home.shiming.dianhua')" placeholder-style="font-size:13px;" style="height: 30px;color: white; background-color: #434356;border-radius: 5px; width: 60%;"/>
				</view>
				<view style="margin-top: 10px;display: flex;justify-content: center;">
					<input v-model="real.email" class="uni-input" maxlength="10" :placeholder="$t('home.shiming.youxiang')" placeholder-style="font-size:13px;" style="height: 30px;color: white; background-color: #434356;border-radius: 5px; width: 60%;"/>
				</view>
				<view style="margin-top: 10px;display: flex;justify-content: center;">
					<button type="primary" size="mini" style="width: 100px;" @click="realAdd()">{{$t('home.shiming.tijiao')}}</button>
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
				ustdAddress:"dashioasoiadjsklkjljs",
				real:{
					firstName: "",
					lastName: "",
					sex: 1,
					address: "",
					phone: "",
					email: ""
				},
				sexs: [{
									text: this.$t('home.shiming.nan'),
									value: 0
								}, {
									text: this.$t('home.shiming.nv'),
									value: 1
								}]
			}
		},
		onLoad() {
			getUserInfo((user)=>{})
		},
		methods: {
			back(){
				uni.navigateBack()
			},
			realAdd(){
				if (isEmpty(sessionStorage.getItem("userToken"))){
					uni.showToast({
						title: "Please login.",
						duration: 1500,
						icon: 'error'
					});
					return
				}
				if(this.real.firstName == "" || this.real.lastName == "" || this.real.phone == ""){
					uni.showToast({
						title: "Please fill in the complete.",
						duration: 1500,
						icon: 'error'
					});
					return
				}
				
				post("/real/add",this.real,(response)=>{
					if(response.data.code == 200){
						uni.showToast({
							title: 'success',
							duration: 1500,
							icon: 'success'
						})
						setTimeout(() => {
							uni.reLaunch({
								url:"/pages/home/home"
							})
						}, 1500);
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
			}
		}
	}
</script>

<style>

</style>
