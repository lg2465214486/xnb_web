<template>
	<view class="chongzhi_body">
		<uni-nav-bar fixed="true" color="#9fa6b5" backgroundColor="#31313F" @clickLeft="back()"
								left-icon="left" :title="$t('home.kefu')" :shadow="false" :border="false">
		</uni-nav-bar>
		<view class="content">
			<view style="display: flex;justify-content: center; flex-direction: column;">
				<view style="display: flex;justify-content: center;">
					<image :src="url" style="width: 150px; height: 150px;" ></image>
				</view>
				<view style="margin-top: 20px;display: flex;justify-content: center;">
					<uni-link :href="link" :text="link" color="#007BFF"></uni-link>
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
				url: "",
				link:""
			}
		},
		onLoad() {
			getSys("helpPhone", (response)=>{
				this.link = response.data.data
			})
			getSys("helpQrCode", (response)=>{
				this.url = response.data.data
			})
		},
		methods: {
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
